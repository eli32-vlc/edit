import type { DefaultTheme } from 'vitepress'

export const LOCALE = 'zh'
export const LOCALE_PREFIX = `/${LOCALE}`

export type Translate = (
  en: string,
  params?: Record<string, string | number>
) => string

export function createTranslate(dict: Record<string, string>): Translate {
  return (en, params) => {
    const text = dict[en] ?? en
    if (!params) return text
    return text.replace(/\{(\w+)\}/g, (match, name) =>
      name in params ? String(params[name]) : match
    )
  }
}

const hasFileExtension = (path: string) =>
  /\.[a-z0-9]+$/i.test(path.split(/[?#]/)[0])

// Internal page links point at the localized copy; assets and raw files stay shared.
export function localizePath(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (href === LOCALE_PREFIX || href.startsWith(`${LOCALE_PREFIX}/`))
    return href
  if (hasFileExtension(href)) return href
  return `${LOCALE_PREFIX}${href}`
}

type Item = DefaultTheme.NavItem | DefaultTheme.SidebarItem

export function localizeItems<T extends Item>(items: T[], t: Translate): T[] {
  return items.map((item) => {
    const out: Record<string, unknown> = { ...item }
    if ('text' in item && item.text) out.text = t(item.text)
    if ('link' in item && item.link) out.link = localizePath(item.link)
    if ('items' in item && item.items)
      out.items = localizeItems(item.items as Item[], t)
    return out as T
  })
}
