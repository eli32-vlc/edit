import type { Segment } from './documents'
import type { LlmConfig, ReasoningEffort, Usage } from './llm'
import type { InlineParser } from './mask'
import type { Glossary, Store } from './store'
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { dirname, join } from 'node:path'
import { parseArgs } from 'node:util'
import { createMarkdownRenderer } from 'vitepress'
import { defs } from '../../docs/.vitepress/markdown/emoji'
import { renderMarkdown, segmentsOf } from './documents'
import { chatJson, REVIEW_PROMPT, TRANSLATE_PROMPT } from './llm'
import { checkGlossary, normalize, unmask, validate } from './mask'
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
  terms: Record<string, string>
  enforced: Record<string, string>
  keep: string[]
}

async function collect() {
  const pages = await loadPages()
  const strings = loadStrings()
  const items = new Map<string, Item>()
  const add = (seg: Segment, page: string) => {
    if (items.has(seg.key)) return
    const m = matchGlossary(seg, page)
    items.set(seg.key, {
      seg,
      page,
      g: m.key,
      terms: m.terms,
      enforced: m.enforced,
      keep: m.keep
    })
  }
  for (const s of strings) add(s.seg, 'site interface')
  for (const p of pages) for (const seg of segmentsOf(p.doc)) add(seg, p.id)
  return { pages, strings, items }
}

// Rendering falls back to an outdated translation until sync replaces it.
function lookup(item: Item | undefined, seg: Segment, stale = false) {
  const override = overrides[seg.key]
  if (override) return override.t
  const entry = tm[seg.key]
  if (entry && (stale || entry.g === item?.g)) return entry.t
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
    Object.assign(terms, item.terms)
    item.keep.forEach((k) => keep.add(k))
  }
  return { glossary: terms, keep: [...keep] }
}

// What the placeholders that hide site names link to, so the model can
// tell e.g. the Homebrew package manager from console homebrew.
function refsOf(seg: Segment) {
  const refs: Record<string, string> = {}
  seg.masked.tokens.forEach((token, i) => {
    const link = token.match(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)/)
    if (!link) return
    let host = ''
    try {
      host = new URL(link[2]).hostname.replace(/^www\./, '')
    } catch {}
    refs[`\u27E6${i + 1}\u27E7`] = `${link[1].replace(/\*/g, '')} (${host})`
  })
  return Object.keys(refs).length ? refs : undefined
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

    const check = (item: Item, text: string) =>
      validate(item.seg.masked, text, parseInline) ??
      checkGlossary(text, item.enforced)
    const describe = (id: string, item: Item) => ({
      id,
      section: item.seg.context,
      refs: refsOf(item.seg),
      text: item.seg.masked.text
    })

    const good = new Map<string, string>()
    let rejected = new Map<string, { previous?: string; problem: string }>()
    for (let attempt = 0; attempt < 2; attempt++) {
      const ids = attempt === 0 ? [...byId.keys()] : [...rejected.keys()]
      if (!ids.length) break
      const previous = rejected
      rejected = new Map()
      let drafts: Record<string, unknown>
      try {
        drafts = await chatJson(
          llm,
          TRANSLATE_PROMPT,
          {
            ...context,
            items: ids.map((id) => ({
              ...describe(id, byId.get(id)!),
              ...previous.get(id)
            }))
          },
          usage,
          config.translateReasoning
        )
      } catch (error) {
        for (const id of ids)
          rejected.set(id, {
            problem: `translate request: ${(error as Error).message}`
          })
        continue
      }
      for (const id of ids) {
        const draft = drafts[id]
        if (typeof draft !== 'string') {
          rejected.set(id, { problem: 'missing from response' })
          continue
        }
        const text = normalize(draft)
        const problem = check(byId.get(id)!, text)
        if (problem) rejected.set(id, { previous: text, problem })
        else good.set(id, text)
      }
    }
    for (const [id, r] of rejected) fail(byId.get(id)!, r.problem, r.previous)

    if (!flags['no-review'] && good.size) {
      try {
        const fixes = await chatJson(
          llm,
          REVIEW_PROMPT,
          {
            ...context,
            items: [...good].map(([id, draft]) => {
              const { text, ...rest } = describe(id, byId.get(id)!)
              return { ...rest, source: text, draft }
            })
          },
          usage,
          config.reviewReasoning
        )
        for (const [id, fix] of Object.entries(fixes)) {
          if (!good.has(id) || typeof fix !== 'string') continue
          const text = normalize(fix)
          if (text === good.get(id)) continue
          // A broken correction keeps the draft, which already passed.
          if (check(byId.get(id)!, text) === undefined) {
            good.set(id, text)
            revised++
          }
        }
      } catch (error) {
        console.log(`review request failed: ${(error as Error).message}`)
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
    const t = lookup(items.get(s.seg.key), s.seg, true)
    if (t !== undefined) dict[s.en] = unmask(t, s.seg.masked.tokens)
  }
  const label = (en: string) => dict[en] ?? en

  rmSync(LOCALE_DIR, { recursive: true, force: true })
  rmSync(GENERATED, { recursive: true, force: true })
  let missing = strings.length - Object.keys(dict).length
  for (const page of pages) {
    const result = renderMarkdown(
      page.doc,
      (seg) => lookup(items.get(seg.key), seg, true),
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

const DIST_ZH = join(DOCS, '.vitepress/dist', 'zh')

// Lists English text that is still visible on the built Chinese pages.
// Site names (external link text), code and kept glossary terms are fine.
async function check() {
  const keep = new Set(glossary.keep.map((k) => k.toLowerCase()))
  const counts = new Map<string, Set<string>>()
  const files = (readdirSync(DIST_ZH, { recursive: true }) as string[]).filter(
    (f) => f.endsWith('.html')
  )
  for (const file of files) {
    const html = readFileSync(join(DIST_ZH, file), 'utf8')
      .replace(/<(head|script|style|code|pre|svg)\b[\s\S]*?<\/\1>/g, ' ')
      .replace(/<a\b[^>]*href="https?:[^"]*"[^>]*>[\s\S]*?<\/a>/g, ' ')
    const texts = [
      ...[...html.matchAll(/>([^<>]+)</g)].map((m) => m[1]),
      ...[
        ...html.matchAll(/\b(?:aria-label|title|placeholder)="([^"]+)"/g)
      ].map((m) => m[1])
    ]
    for (const raw of texts) {
      const text = raw
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      if (!text || /\p{Script=Han}/u.test(text)) continue
      const words = text.match(/[A-Za-z]{2,}/g) ?? []
      if (
        words.length < 2 &&
        !(words[0]?.length > 3 && /^[A-Z][a-z]+$/.test(words[0]))
      )
        continue
      if (words.every((w) => keep.has(w.toLowerCase()))) continue
      if (!counts.has(text)) counts.set(text, new Set())
      counts.get(text)!.add(file)
    }
  }
  const sorted = [...counts].sort((a, b) => b[1].size - a[1].size)
  writeJson(
    '.cache/i18n-english.json',
    sorted.map(([text, pages]) => ({ text, pages: [...pages] }))
  )
  console.log(
    `${sorted.length} distinct English texts on ${files.length} pages`
  )
  for (const [text, pages] of sorted.slice(0, 40))
    console.log(`  ${pages.size}\t${text.slice(0, 100)}`)
}

const commands: Record<string, () => Promise<void>> = {
  check,
  sync,
  render,
  status,
  prune
}
if (!commands[command]) throw new Error(`Unknown command ${command}`)
await commands[command]()
