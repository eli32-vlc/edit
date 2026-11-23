import type { Masked, MaskOptions } from './mask'
import { hashKey, hasTranslatableText, mask, unmask } from './mask'

export interface Segment {
  key: string
  masked: Masked
  context: string
}

type Line =
  | { kind: 'raw'; text: string }
  | {
      kind: 'text'
      prefix: string
      suffix: string
      anchor?: string
      original: string[]
      seg: Segment
    }
  | {
      kind: 'yaml'
      prefix: string
      field: string
      original: string[]
      seg: Segment
    }
  | { kind: 'container'; fence: string; label: string }

export interface MarkdownDoc {
  lines: Line[]
}

export type Lookup = (seg: Segment) => string | undefined

export interface SegmentOptions {
  entries: boolean
  title: string
  headingIds: Map<number, string>
  keepLinkTexts?: Set<string>
}

const YAML_FIELDS = new Set([
  'title',
  'description',
  'tagline',
  'text',
  'details'
])
const CONTAINER_LABELS: Record<string, string> = {
  tip: 'TIP',
  info: 'INFO',
  warning: 'WARNING',
  danger: 'DANGER',
  details: 'Details'
}
export const containerLabels = Object.values(CONTAINER_LABELS)

const BLOCK_PREFIX_RE =
  /^(\s*(?:>\s?)*(?:(?:[*+-]|\d+[.)])\s+)?(?:#{1,6}\s+)?(?:\*\*(?:Note|Warning)\*\* - |Note - |!!!(?:note|info|warning)\s)?)/
const LIST_RE = /^\s*(?:>\s?)*(?:[*+-]|\d+[.)])\s/
const HEADING_RE = /^\s*#{1,6}\s/
const TABLE_SEPARATOR_RE = /^\s*\|?[\s:|-]+\|[\s:|-]*$/

export function makeSegment(
  body: string,
  context: string,
  options: MaskOptions = {}
): Segment | undefined {
  const masked = mask(body, options)
  if (!hasTranslatableText(masked.text)) return undefined
  return { key: hashKey(masked.text), masked, context }
}

function parseFrontmatter(lines: string[], end: number, title: string) {
  const out: Line[] = [{ kind: 'raw', text: lines[0] }]
  for (let i = 1; i < end; i++) {
    const m = lines[i].match(/^(\s*(?:-\s+)?)([A-Za-z]+):(?:\s+(.*))?$/)
    if (!m || !YAML_FIELDS.has(m[2])) {
      out.push({ kind: 'raw', text: lines[i] })
      continue
    }
    const indent = m[1].length
    const original = [lines[i]]
    let value = (m[3] ?? '').trim()
    if (value === '|' || value === '>') {
      out.push({ kind: 'raw', text: lines[i] })
      continue
    }
    while (
      i + 1 < end &&
      lines[i + 1].trim() &&
      lines[i + 1].search(/\S/) > indent &&
      !/^\s*(?:-\s+)?[A-Za-z]+:(\s|$)/.test(lines[i + 1])
    ) {
      i++
      original.push(lines[i])
      value += ` ${lines[i].trim()}`
    }
    value = value.trim()
    if (/^(["']).*\1$/.test(value)) {
      value =
        value[0] === '"'
          ? JSON.parse(value)
          : value.slice(1, -1).replace(/''/g, "'")
    }
    const seg = makeSegment(value, `${title} (page metadata)`)
    if (!seg) {
      out.push(...original.map((text) => ({ kind: 'raw' as const, text })))
      continue
    }
    out.push({ kind: 'yaml', prefix: m[1], field: m[2], original, seg })
  }
  out.push({ kind: 'raw', text: lines[end] })
  return out
}

export function segmentMarkdown(
  src: string,
  options: SegmentOptions
): MarkdownDoc {
  const lines = src.split('\n')
  const out: Line[] = []
  let start = 0
  if (lines[0] === '---') {
    const end = lines.indexOf('---', 1)
    if (end > 0) {
      out.push(...parseFrontmatter(lines, end, options.title))
      start = end + 1
    }
  }

  type Block = {
    prefix: string
    body: string
    suffix: string
    original: string[]
    entry: boolean
    anchor?: string
    joinable: boolean
    context: string
  }
  let fence: string | undefined
  let inComment = false
  let rawUntil: string | undefined
  let section = ''
  const headingPath: string[] = []
  let open: Block | undefined
  const pending: (Line | Block)[] = []

  const flush = () => {
    open = undefined
  }

  for (let n = start; n < lines.length; n++) {
    const line = lines[n]
    if (fence) {
      if (line.trim().startsWith(fence)) fence = undefined
      pending.push({ kind: 'raw', text: line })
      continue
    }
    if (rawUntil) {
      if (line.includes(rawUntil)) rawUntil = undefined
      pending.push({ kind: 'raw', text: line })
      continue
    }
    const rawBlock = line.match(/^\s*<(script|style)\b/)
    if (rawBlock) {
      flush()
      if (!line.includes(`</${rawBlock[1]}>`)) rawUntil = `</${rawBlock[1]}>`
      pending.push({ kind: 'raw', text: line })
      continue
    }
    if (inComment) {
      if (line.includes('-->')) inComment = false
      pending.push({ kind: 'raw', text: line })
      continue
    }
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      fence = fenceMatch[1]
      flush()
      pending.push({ kind: 'raw', text: line })
      continue
    }
    if (line.trim().startsWith('<!--')) {
      inComment = !line.includes('-->')
      flush()
      pending.push({ kind: 'raw', text: line })
      continue
    }
    if (!line.trim() || TABLE_SEPARATOR_RE.test(line)) {
      flush()
      pending.push({ kind: 'raw', text: line })
      continue
    }
    const container = line.match(/^(\s*:{3,})\s*([a-z-]+)?\s*(.*)$/)
    if (container) {
      flush()
      const [, colons, name, title] = container
      if (name && title.trim()) {
        pending.push({
          prefix: `${colons} ${name} `,
          body: title.trim(),
          suffix: '',
          original: [line],
          entry: false,
          joinable: false,
          context: section
        })
      } else if (name && CONTAINER_LABELS[name]) {
        pending.push({
          kind: 'container',
          fence: `${colons} ${name}`,
          label: CONTAINER_LABELS[name]
        })
      } else {
        pending.push({ kind: 'raw', text: line })
      }
      continue
    }

    const prefix = line.match(BLOCK_PREFIX_RE)![1]
    const rest = line.slice(prefix.length)
    const body = rest.trimEnd()
    const suffix = rest.slice(body.length)
    const isHeading = HEADING_RE.test(line)
    const isList = LIST_RE.test(line)
    const isTable = body.startsWith('|')
    const isHtml = body.startsWith('<')

    if (open && open.joinable && !prefix.trim() && !isTable && !isHtml) {
      open.body += ` ${body}`
      open.original.push(line)
      open.suffix = suffix
      if (/ {2}$|\\$|<br\s*\/?>$/i.test(line)) open.joinable = false
      continue
    }
    flush()
    if (isHeading) {
      const level = line.trim().match(/^#+/)![0].length
      headingPath.length = level - 1
      headingPath[level - 1] = body.replace(/\{#[^}]+\}\s*$/, '').trim()
      section = headingPath.filter(Boolean).join(' › ')
    }
    const block: Block = {
      prefix,
      body,
      suffix,
      original: [line],
      entry: options.entries && isList,
      anchor:
        isHeading && !/\{#/.test(body) ? options.headingIds.get(n) : undefined,
      joinable:
        !isHeading &&
        !isTable &&
        !isHtml &&
        !/ {2}$|\\$|<br\s*\/?>$/i.test(line),
      context: isHeading ? '' : section
    }
    pending.push(block)
    open = block
  }

  for (const item of pending) {
    if ('kind' in item) {
      out.push(item)
      continue
    }
    const context = [options.title, item.context].filter(Boolean).join(' › ')
    const seg = makeSegment(item.body, context, {
      entry: item.entry,
      keepLinkTexts: options.keepLinkTexts
    })
    if (!seg) {
      out.push(...item.original.map((text) => ({ kind: 'raw' as const, text })))
      continue
    }
    out.push({
      kind: 'text',
      prefix: item.prefix,
      suffix: item.suffix,
      anchor: item.anchor,
      original: item.original,
      seg
    })
  }
  return { lines: out }
}

export function segmentsOf(doc: MarkdownDoc): Segment[] {
  return doc.lines.flatMap((l) => ('seg' in l ? [l.seg] : []))
}

export function renderMarkdown(
  doc: MarkdownDoc,
  lookup: Lookup,
  label: (en: string) => string
): { text: string; missing: number } {
  let missing = 0
  const out: string[] = []
  for (const line of doc.lines) {
    if (line.kind === 'raw') {
      out.push(line.text)
    } else if (line.kind === 'container') {
      out.push(`${line.fence} ${label(line.label)}`)
    } else {
      const t = lookup(line.seg)
      if (t === undefined) {
        missing++
        out.push(...line.original)
      } else if (line.kind === 'yaml') {
        out.push(
          `${line.prefix}${line.field}: ${JSON.stringify(unmask(t, line.seg.masked.tokens))}`
        )
      } else {
        const anchor = line.anchor ? ` {#${line.anchor}}` : ''
        out.push(
          `${line.prefix}${unmask(t, line.seg.masked.tokens)}${anchor}${line.suffix}`
        )
      }
    }
  }
  return { text: out.join('\n'), missing }
}
