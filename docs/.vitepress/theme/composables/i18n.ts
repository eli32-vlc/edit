/// <reference types="vitepress/client" />

import { useData } from 'vitepress'
import { createTranslate, LOCALE } from '../../i18n/shared'

const generated = import.meta.glob<Record<string, string>>(
  '../../i18n/generated/zh/strings.json',
  { eager: true, import: 'default' }
)
const translateLocale = createTranslate(Object.values(generated)[0] ?? {})
const translateRoot = createTranslate({})

export function useT() {
  const { localeIndex } = useData()
  return (en: string, params?: Record<string, string | number>) =>
    (localeIndex.value === LOCALE ? translateLocale : translateRoot)(en, params)
}
