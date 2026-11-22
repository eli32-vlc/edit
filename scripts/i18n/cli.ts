import type { Segment } from './documents'
import type { LlmConfig, ReasoningEffort, Usage } from './llm'
import type { InlineParser } from './mask'
import type { Glossary, Store } from './store'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parseArgs } from 'node:util'
import { createMarkdownRenderer } from 'vitepress'
import { defs } from '../../docs/.vitepress/markdown/emoji'
import { renderMarkdown, segmentsOf } from './documents'
import { chatJson, REVIEW_PROMPT, TRANSLATE_PROMPT } from './llm'
import { unmask, validate } from './mask'
import { DOCS, GENERATED, loadPages, loadStrings, LOCALE_DIR } from './sources'
import {
  CONFIG_PATH,
  GLOSSARY_PATH,
  glossaryMatcher,
  OVERRIDES_PATH,
  readJson,
  sortStore,
  TM_PATH,
  writeJson
} from './store'

interface Config {
  baseUrl: string
  model: string
  concurrency: number
  batchItems: number
  batchChars: number
  timeoutMs: number
  translateReasoning?: ReasoningEffort
  reviewReasoning?: ReasoningEffort
}

const { positionals, values: flags } = parseArgs({
  allowPositionals: true,
  options: {
    only: { type: 'string' },
    limit: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
    'no-review': { type: 'boolean', default: false }
  }
})
const command = positionals[0] ?? 'status'
const FAILURES_PATH = '.cache/i18n-failures.json'

const config = readJson<Config>(CONFIG_PATH, {} as Config)
const glossary = readJson<Glossary>(GLOSSARY_PATH, { terms: {}, keep: [] })
const matchGlossary = glossaryMatcher(glossary)
const tm = readJson<Store>(TM_PATH, {})
const overrides = readJson<Store>(OVERRIDES_PATH, {})

interface Item {
  seg: Segment
  page: string
  g?: string
}

async function collect() {
  const pages = await loadPages()
  const strings = loadStrings()
  const items = new Map<string, Item>()
  const add = (seg: Segment, page: string) => {
    if (!items.has(seg.key))
      items.set(seg.key, { seg, page, g: matchGlossary(seg).key })
  }
  for (const s of strings) add(s.seg, 'site interface')
  for (const p of pages) for (const seg of segmentsOf(p.doc)) add(seg, p.id)
  return { pages, strings, items }
}

function lookup(item: Item | undefined, seg: Segment) {
  const override = overrides[seg.key]
  if (override) return override.t
  const entry = tm[seg.key]
  if (entry && entry.g === item?.g) return entry.t
  return undefined
}

async function inlineParser(): Promise<InlineParser> {
  const md = await createMarkdownRenderer(DOCS, { emoji: { defs } }, '/')
  const structural = (
    tokens: { type: string; children: unknown[] | null }[]
  ): string[] =>
    tokens.flatMap((t) => [
      ...(['text', 'softbreak', 'text_special'].includes(t.type)
        ? []
        : [t.type]),
      ...(t.children ? structural(t.children as typeof tokens) : [])
    ])
  return (text) => structural(md.parseInline(text, {}))
}

function batches(items: Item[]) {
  const out: Item[][] = []
  let current: Item[] = []
  let chars = 0
  for (const item of items) {
    const size = item.seg.masked.text.length
    if (
      current.length &&
      (current.length >= config.batchItems ||
        chars + size > config.batchChars ||
        current[0].page !== item.page)
    ) {
      out.push(current)
      current = []
      chars = 0
    }
    current.push(item)
    chars += size
  }
  if (current.length) out.push(current)
  return out
}

function glossaryFor(batch: Item[]) {
  const terms: Record<string, string> = {}
  const keep = new Set<string>()
  for (const item of batch) {
    const m = matchGlossary(item.seg)
    Object.assign(terms, m.terms)
    m.keep.forEach((k) => keep.add(k))
  }
  return { glossary: terms, keep: [...keep] }
}

interface Failure {
  key: string
  page: string
  source: string
  reason: string
  output?: string
}

async function sync() {
  const { items } = await collect()
  const pending = [...items.values()].filter(
    (item) => lookup(item, item.seg) === undefined
  )
  let todo = pending
  if (flags.only) todo = todo.filter((item) => item.page.includes(flags.only!))
  if (flags.limit) todo = todo.slice(0, Number(flags.limit))

  const chars = todo.reduce((n, item) => n + item.seg.masked.text.length, 0)
  console.log(
    `${items.size} segments, ${items.size - pending.length} translated, ${todo.length} to translate now (${chars} chars)`
  )
  if (flags['dry-run'] || !todo.length) return

  const apiKey = process.env.I18N_API_KEY ?? process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('Set I18N_API_KEY or OPENAI_API_KEY')
  const llm: LlmConfig = { ...config, apiKey }
  const parseInline = await inlineParser()
  const usage: Usage = { prompt: 0, completion: 0 }
  const failures: Failure[] = []
  const queue = batches(todo)
  const total = queue.length
  let done = 0
  let accepted = 0
  let revised = 0

  const runBatch = async (batch: Item[]) => {
    const { glossary: terms, keep } = glossaryFor(batch)
    const context = {
      page: batch[0].seg.context.split(' › ')[0],
      glossary: terms,
      keep
    }
    const byId = new Map(batch.map((item, i) => [String(i + 1), item]))
    const fail = (item: Item, reason: string, output?: string) =>
      failures.push({
        key: item.seg.key,
        page: item.page,
        source: item.seg.masked.text,
        reason,
        output
      })

    let drafts: Record<string, unknown>
    try {
      drafts = await chatJson(
        llm,
        TRANSLATE_PROMPT,
        {
          ...context,
          items: [...byId].map(([id, item]) => ({
            id,
            section: item.seg.context,
            text: item.seg.masked.text
          }))
        },
        usage,
        config.translateReasoning
      )
    } catch (error) {
      for (const item of batch)
        fail(item, `translate request: ${(error as Error).message}`)
      done++
      return
    }

    const good = new Map<string, string>()
    for (const [id, item] of byId) {
      const draft = drafts[id]
      if (typeof draft !== 'string') {
        fail(item, 'missing from response')
        continue
      }
      const problem = validate(item.seg.masked, draft.trim(), parseInline)
      if (problem) fail(item, problem, draft)
      else good.set(id, draft.trim())
    }

    if (!flags['no-review'] && good.size) {
      try {
        const fixes = await chatJson(
          llm,
          REVIEW_PROMPT,
          {
            ...context,
            items: [...good].map(([id, draft]) => ({
              id,
              section: byId.get(id)!.seg.context,
              source: byId.get(id)!.seg.masked.text,
              draft
            }))
          },
          usage,
          config.reviewReasoning
        )
        for (const [id, fix] of Object.entries(fixes)) {
          if (
            !good.has(id) ||
            typeof fix !== 'string' ||
            fix.trim() === good.get(id)
          )
            continue
          const item = byId.get(id)!
          const problem = validate(item.seg.masked, fix.trim(), parseInline)
          if (problem) {
            fail(item, `review rejected: ${problem}`, fix)
            good.delete(id)
          } else {
            good.set(id, fix.trim())
            revised++
          }
        }
      } catch (error) {
        for (const id of good.keys())
          fail(byId.get(id)!, `review request: ${(error as Error).message}`)
        good.clear()
      }
    }

    for (const [id, t] of good) {
      const item = byId.get(id)!
      tm[item.seg.key] = {
        s: item.seg.masked.text,
        t,
        ...(item.g ? { g: item.g } : {})
      }
      accepted++
    }
    done++
    if (done % 10 === 0 || done === total) {
      writeJson(TM_PATH, sortStore(tm))
      writeJson(FAILURES_PATH, failures)
      console.log(
        `${done}/${total} batches, ${accepted} accepted, ${revised} revised by review, ${failures.length} failed, tokens ${usage.prompt}+${usage.completion}`
      )
    }
  }

  const workers = Array.from(
    { length: Math.min(config.concurrency, queue.length) },
    async () => {
      for (let batch = queue.shift(); batch; batch = queue.shift())
        await runBatch(batch)
    }
  )
  await Promise.all(workers)
  writeJson(TM_PATH, sortStore(tm))
  writeJson(FAILURES_PATH, failures)
  if (failures.length) {
    console.log(`${failures.length} segments failed, see ${FAILURES_PATH}`)
    process.exitCode = 1
  }
}

async function prune() {
  const { items } = await collect()
  let removed = 0
  for (const key of Object.keys(tm)) {
    if (!items.has(key)) {
      delete tm[key]
      removed++
    }
  }
  writeJson(TM_PATH, sortStore(tm))
  console.log(`removed ${removed} unused translations`)
}

async function render() {
  const { pages, strings, items } = await collect()
  const dict: Record<string, string> = {}
  for (const s of strings) {
    const t = lookup(items.get(s.seg.key), s.seg)
    if (t !== undefined) dict[s.en] = unmask(t, s.seg.masked.tokens)
  }
  const label = (en: string) => dict[en] ?? en

  rmSync(LOCALE_DIR, { recursive: true, force: true })
  rmSync(GENERATED, { recursive: true, force: true })
  let missing = strings.length - Object.keys(dict).length
  for (const page of pages) {
    const result = renderMarkdown(
      page.doc,
      (seg) => lookup(items.get(seg.key), seg),
      label
    )
    missing += result.missing
    mkdirSync(dirname(page.out), { recursive: true })
    // Locale pages sit one directory deeper than their sources.
    const text = page.out.startsWith(LOCALE_DIR)
      ? result.text
          .replace(/(\bfrom\s+['"])(\.{1,2}\/)/g, '$1../$2')
          // Bare frontmatter image paths resolve against the page URL.
          .replace(
            /^(\s+src:\s+)([\w-]+\.(?:png|jpe?g|svg|webp|gif))$/gm,
            '$1/$2'
          )
      : result.text
    writeFileSync(page.out, text)
  }
  writeJson(join(GENERATED, 'strings.json'), dict)
  console.log(
    `rendered ${pages.length} pages, ${missing} segments still in English`
  )
}

async function status() {
  const { items } = await collect()
  const pending = [...items.values()].filter(
    (item) => lookup(item, item.seg) === undefined
  )
  const byPage = new Map<string, number>()
  for (const item of pending)
    byPage.set(item.page, (byPage.get(item.page) ?? 0) + 1)
  const orphaned = Object.entries(overrides).filter(([key]) => !items.has(key))
  const unused = Object.keys(tm).filter((key) => !items.has(key)).length
  console.log(`${items.size} segments, ${pending.length} untranslated or stale`)
  for (const [page, n] of [...byPage].sort((a, b) => b[1] - a[1]).slice(0, 20))
    console.log(`  ${page}: ${n}`)
  console.log(`${unused} unused translations (run prune)`)
  if (orphaned.length) {
    console.log(`${orphaned.length} overrides whose English source changed:`)
    for (const [key, entry] of orphaned) console.log(`  ${key}: ${entry.s}`)
  }
}

const commands: Record<string, () => Promise<void>> = {
  sync,
  render,
  status,
  prune
}
if (!commands[command]) throw new Error(`Unknown command ${command}`)
await commands[command]()
