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

export interface Glossary {
  terms: Record<string, string>
  keep: string[]
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function glossaryMatcher(glossary: Glossary) {
  const terms = Object.entries(glossary.terms).map(([en, zh]) => ({
    en,
    zh,
    re: new RegExp(`(?<![\\p{L}\\d])${escapeRe(en)}(?![\\p{L}\\d])`, 'iu')
  }))
  const keep = glossary.keep.map((en) => ({
    en,
    re: new RegExp(`(?<![\\p{L}\\d])${escapeRe(en)}(?![\\p{L}\\d])`, 'u')
  }))
  return (seg: Segment) => {
    const text = seg.masked.text.replace(PLACEHOLDER_RE, ' ')
    const matched = terms.filter((t) => t.re.test(text))
    const kept = keep.filter((k) => k.re.test(text)).map((k) => k.en)
    return {
      terms: Object.fromEntries(matched.map((t) => [t.en, t.zh])),
      keep: kept,
      key: matched.length
        ? hashKey(matched.map((t) => `${t.en}=${t.zh}`).join('\n'))
        : undefined
    }
  }
}
