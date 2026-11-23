import type { MarkdownRenderer } from 'vitepress'
import { t } from '../i18n/node'
import { LOCALE } from '../i18n/shared'

// VitePress labels heading permalinks with the raw heading source, which
// still holds `{#id}` attributes and is always English.
export function anchorLabelPlugin(md: MarkdownRenderer) {
  md.core.ruler.after('anchor', 'fmhy-anchor-label', (state) => {
    const localized = state.env.relativePath?.startsWith(`${LOCALE}/`)
    for (const token of state.tokens) {
      if (token.type !== 'inline' || !token.children) continue
      const anchor = token.children.find(
        (child) =>
          child.type === 'link_open' && child.attrGet('aria-label') !== null
      )
      if (!anchor) continue
      const title = token.children
        .filter(
          (child) => child.type === 'text' || child.type === 'code_inline'
        )
        .map((child) => child.content)
        .join('')
        .trim()
      anchor.attrSet(
        'aria-label',
        localized
          ? t('Permalink to "{title}"', { title })
          : `Permalink to "${title}"`
      )
    }
  })
}
