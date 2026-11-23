import { createHash } from 'node:crypto'

// Placeholders stand in for everything a translator must not touch: URLs,
// site names, code, HTML, emoji shortcodes and template parameters.
const open = '\u27E6'
const close = '\u27E7'
export const PLACEHOLDER_RE = /\u27E6(\d+)\u27E7/g

export interface Masked {
  text: string
  tokens: string[]
}

export interface MaskOptions {
  // List-item entries: links before the first ` - ` are site names.
  entry?: boolean
  // UI strings: `{name}` is an interpolation parameter.
  params?: boolean
  keepLinkTexts?: Set<string>
}

const DESCRIPTION_SEP_RE = /^\s[-–—]\s/

function findClosing(text: string, start: number, o: string, c: string) {
  let depth = 0
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (ch === '\\') {
      i++
      continue
    }
    if (ch === o) depth++
    else if (ch === c) {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

const SIMPLE_PATTERNS: RegExp[] = [
  /^`[^`]+`/,
  /^<\/?[A-Za-z!][^>]*>/,
  /^https?:\/\/[^\s<>)\]]+/,
  /^\{\{[\s\S]*?\}\}/,
  /^\{#[^}]+\}/,
  /^&(?:[a-z]+|#\d+);/i,
  /^:[a-z0-9_+-]+:/,
  /^\[\^[^\]]+\]/
]

export function mask(input: string, options: MaskOptions = {}): Masked {
  const tokens: string[] = []
  let out = ''
  let inNames = Boolean(options.entry)
  const put = (value: string) => {
    tokens.push(value)
    out += `${open}${tokens.length}${close}`
  }

  let i = 0
  while (i < input.length) {
    const rest = input.slice(i)

    if (inNames && DESCRIPTION_SEP_RE.test(rest)) inNames = false

    if (options.params) {
      const param = rest.match(/^\{[A-Za-z]\w*\}/)
      if (param) {
        put(param[0])
        i += param[0].length
        continue
      }
    }

    const simple = SIMPLE_PATTERNS.map((re) => rest.match(re)).find(Boolean)
    if (simple) {
      put(simple[0])
      i += simple[0].length
      continue
    }

    const isImage = rest.startsWith('![')
    const boldLink = rest.startsWith('**[')
    if (rest.startsWith('[') || isImage || boldLink) {
      const textStart = i + (isImage ? 1 : boldLink ? 2 : 0)
      const textEnd = findClosing(input, textStart, '[', ']')
      if (textEnd !== -1 && input[textEnd + 1] === '(') {
        const urlEnd = findClosing(input, textEnd + 1, '(', ')')
        if (urlEnd !== -1) {
          const label = input.slice(textStart + 1, textEnd)
          const url = input.slice(textEnd + 2, urlEnd)
          const closesBold = boldLink && input.startsWith('**', urlEnd + 1)
          const end = closesBold ? urlEnd + 3 : urlEnd + 1
          // Links to other sections are labelled with a translatable title.
          const internal = /^(?:\/|#|\.\.?\/)/.test(url)
          const keepWhole =
            isImage ||
            (!internal && (closesBold || inNames)) ||
            /^[\d\s.,]*$/.test(label) ||
            options.keepLinkTexts?.has(label) ||
            !/\p{L}/u.test(label)
          if (keepWhole) {
            put(input.slice(i, end))
          } else {
            const prefix = boldLink ? '**' : ''
            out += `${prefix}[`
            const inner = mask(label, { params: options.params })
            // Inner placeholders are renumbered into this segment.
            out += inner.text.replace(PLACEHOLDER_RE, (_, n) => {
              tokens.push(inner.tokens[Number(n) - 1])
              return `${open}${tokens.length}${close}`
            })
            out += ']('
            tokens.push(url)
            out += `${open}${tokens.length}${close})`
            if (boldLink && closesBold) out += '**'
          }
          i = end
          continue
        }
      }
    }

    out += input[i]
    i++
  }
  return { text: out, tokens }
}

export function unmask(text: string, tokens: string[]) {
  return text.replace(PLACEHOLDER_RE, (_, n) => tokens[Number(n) - 1])
}

export const hashKey = (text: string) =>
  createHash('sha256').update(text).digest('hex').slice(0, 16)

export const hasTranslatableText = (masked: string) =>
  /\p{L}{2,}/u.test(masked.replace(PLACEHOLDER_RE, ''))

const EMOJI_RE = /\p{Extended_Pictographic}/gu

const count = (text: string, re: RegExp) => (text.match(re) || []).length

function multiset(values: string[]) {
  const map = new Map<string, number>()
  for (const v of values) map.set(v, (map.get(v) ?? 0) + 1)
  return [...map.entries()].sort().join('|')
}

export type InlineParser = (text: string) => string[]

// A translation is accepted only when it keeps every placeholder, link,
// emphasis, emoji and table cell of the source.
export function validate(
  source: Masked,
  translated: string,
  parseInline: InlineParser
): string | undefined {
  if (!translated.trim()) return 'empty translation'
  if (/[\r\n]/.test(translated)) return 'contains a line break'
  const srcPh = [...source.text.matchAll(PLACEHOLDER_RE)].map((m) => m[1])
  const outPh = [...translated.matchAll(PLACEHOLDER_RE)].map((m) => m[1])
  if (multiset(srcPh) !== multiset(outPh)) return 'placeholders changed'
  if (/[\u27E6\u27E7]/.test(translated.replace(PLACEHOLDER_RE, '')))
    return 'broken placeholder'
  for (const m of source.text.matchAll(/\]\(\u27E6(\d+)\u27E7\)/g)) {
    if (!translated.includes(m[0])) return `link ${m[1]} lost its target`
  }
  if (count(source.text, /\|/g) !== count(translated, /\|/g))
    return 'table cells changed'
  if (
    multiset(source.text.match(EMOJI_RE) || []) !==
    multiset(translated.match(EMOJI_RE) || [])
  )
    return 'emoji changed'
  const before = multiset(parseInline(unmask(source.text, source.tokens)))
  const after = multiset(parseInline(unmask(translated, source.tokens)))
  if (before !== after) return 'markdown structure changed'
  return undefined
}

const LINKED_RE =
  /(\u27E6\d+\u27E7|\]\(\u27E6\d+\u27E7\)\**)\s*[,，、]\s*(?=\u27E6|\*{0,2}\[)/g

// Lists of links use the Chinese enumeration comma, and stray double spaces
// left by the model are collapsed.
export function normalize(text: string) {
  return text
    .trim()
    .replace(LINKED_RE, '$1、')
    .replace(/(\S) {2,}(?=\S)/g, '$1 ')
}

const squash = (s: string) => s.replace(/\s+/g, '').toLowerCase()

// Every glossary term found in the source must appear in its required
// rendering.
export function checkGlossary(
  translated: string,
  terms: Record<string, string>
): string | undefined {
  const text = squash(translated.replace(PLACEHOLDER_RE, ' '))
  for (const [en, zh] of Object.entries(terms)) {
    // "a|b" accepts either rendering.
    if (!zh.split('|').some((option) => text.includes(squash(option))))
      return `glossary: render "${en}" as "${zh.split('|')[0]}"`
  }
  return undefined
}
