import type { Segment } from './documents'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { hashKey, PLACEHOLDER_RE } from './mask'

export interface Entry {
  s: string
  t: string
  g?: string
}
export type Store = Record<string, Entry>

export const TM_PATH = 'i18n/zh/tm.json'
export const OVERRIDES_PATH = 'i18n/zh/overrides.json'
export const GLOSSARY_PATH = 'i18n/zh/glossary.json'
export const CONFIG_PATH = 'i18n/config.json'

export function readJson<T>(path: string, fallback: T): T {
  return existsSync(path)
    ? (JSON.parse(readFileSync(path, 'utf8')) as T)
    : fallback
}

export function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)
}

export function sortStore(store: Store): Store {
  return Object.fromEntries(
    Object.entries(store).sort(([a], [b]) => a.localeCompare(b))
  )
}

// A term maps to one rendering, or to renderings that apply on some pages
// only (`pages` are path prefixes such as "gaming"); the first match wins.
export type GlossaryTerm = string | { zh: string; pages?: string[] }[]

export interface Glossary {
  version?: number
  terms: Record<string, GlossaryTerm>
  // Single words whose rendering is enforced; other single words only guide
  // the model, since generic words ("Music", "Site") have many valid forms.
  strict?: string[]
  keep: string[]
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const wordRe = (en: string, flags: string) =>
  new RegExp(`(?<![\\p{L}\\d])${escapeRe(en)}(?![\\p{L}\\d])`, flags)

export function glossaryMatcher(glossary: Glossary) {
  const terms = Object.entries(glossary.terms).map(([en, value]) => ({
    en,
    options: typeof value === 'string' ? [{ zh: value }] : value,
    re: wordRe(en, 'iu')
  }))
  const keep = glossary.keep.map((en) => ({ en, re: wordRe(en, 'u') }))
  const strict = new Set(glossary.strict ?? [])
  const version = `v${glossary.version ?? 1}`
  return (seg: Segment, page: string) => {
    let text = seg.masked.text.replace(PLACEHOLDER_RE, ' ')
    const kept = keep.filter((k) => k.re.test(text)).map((k) => k.en)
    // Words inside kept names ("Game Boy") are not glossary terms.
    for (const k of keep) text = text.replace(new RegExp(k.re, 'gu'), ' ')
    const matched: Record<string, string> = {}
    for (const term of terms) {
      if (!term.re.test(text)) continue
      const option = term.options.find(
        (o) => !o.pages || o.pages.some((p) => page.startsWith(p))
      )
      if (option) matched[term.en] = option.zh
    }
    // A longer matched term owns the words it contains ("Homebrew Apps"
    // overrides "Apps"), so only the longest overlapping terms are enforced.
    const names = Object.keys(matched)
    for (const en of names) {
      if (
        names.some(
          (o) => o !== en && o.length > en.length && wordRe(en, 'iu').test(o)
        )
      )
        delete matched[en]
    }
    const signature = Object.entries(matched).map(([en, zh]) => `${en}=${zh}`)
    const enforced = Object.fromEntries(
      Object.entries(matched).filter(
        ([en]) => en.includes(' ') || strict.has(en)
      )
    )
    return {
      terms: matched,
      enforced,
      keep: kept,
      key: hashKey([version, ...signature].join('\n'))
    }
  }
}
