import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createTranslate, LOCALE } from './shared'

const generated = resolve(
  process.cwd(),
  'docs/.vitepress/i18n/generated',
  LOCALE
)
export const localeDir = resolve(process.cwd(), 'docs', LOCALE)
export const localeNotesDir = resolve(generated, 'notes')
const stringsPath = resolve(generated, 'strings.json')

export const hasLocale = existsSync(localeDir) && existsSync(stringsPath)

export const t = createTranslate(
  hasLocale ? JSON.parse(readFileSync(stringsPath, 'utf8')) : {}
)
