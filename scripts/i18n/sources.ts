import type { DefaultTheme } from 'vitepress'
import type { MarkdownDoc, Segment } from './documents'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { createMarkdownRenderer } from 'vitepress'
import { meta, nav, sidebar } from '../../docs/.vitepress/constants'
import { defs } from '../../docs/.vitepress/markdown/emoji'
import { isWikiPage, transformPage } from '../../docs/.vitepress/transformer'
import { headers } from '../../docs/.vitepress/transformer/constants'
import { containerLabels, makeSegment, segmentMarkdown } from './documents'

export const DOCS = 'docs'
export const LOCALE = 'zh'
export const LOCALE_DIR = join(DOCS, LOCALE)
export const GENERATED = join(DOCS, '.vitepress/i18n/generated', LOCALE)
const NOTES = join(DOCS, '.vitepress/notes')

export interface PageSource {
  id: string
  out: string
  doc: MarkdownDoc
}

export interface StringSource {
  en: string
  seg: Segment
}

const posix = (p: string) => p.split('\\').join('/')

export function listPages() {
  return (readdirSync(DOCS, { recursive: true }) as string[])
    .map(posix)
    .filter(
      (p) =>
        p.endsWith('.md') &&
        !p.startsWith(`${LOCALE}/`) &&
        !p.startsWith('.vitepress/') &&
        !p.startsWith('public/') &&
        !p.includes('node_modules') &&
        p !== 'README.md'
    )
    .sort()
}

type Renderer = Awaited<ReturnType<typeof createMarkdownRenderer>>

function headingIds(md: Renderer, src: string) {
  let text = src
  const fm = src.match(/^---\n[\s\S]*?\n---\n/)
  if (fm) text = fm[0].replace(/[^\n]/g, '') + src.slice(fm[0].length)
  const ids = new Map<number, string>()
  for (const token of md.parse(text, {})) {
    if (token.type === 'heading_open' && token.map) {
      const id = token.attrGet('id')
      if (id) ids.set(token.map[0], id)
    }
  }
  return ids
}

function pageTitle(id: string, src: string) {
  const header = headers[basename(id)]
  if (header) return header.title
  const fm = src.match(/^---\n[\s\S]*?\ntitle:\s*(.+)\n/)
  if (fm) return fm[1].replace(/^["']|["']$/g, '')
  return src.match(/^#\s+(.+)$/m)?.[1] ?? id
}

export async function loadPages(): Promise<PageSource[]> {
  const md = await createMarkdownRenderer(DOCS, { emoji: { defs } }, '/')
  const pages: PageSource[] = []
  for (const id of listPages()) {
    const raw = readFileSync(join(DOCS, id), 'utf8').replace(/\r\n/g, '\n')
    const wiki = isWikiPage(`/${id}`)
    const src = wiki ? transformPage(basename(id), raw) : raw
    pages.push({
      id,
      out: join(LOCALE_DIR, id),
      doc: segmentMarkdown(src, {
        entries: wiki,
        title: pageTitle(id, raw),
        headingIds: headingIds(md, src)
      })
    })
  }
  if (existsSync(NOTES)) {
    for (const file of readdirSync(NOTES)
      .filter((f) => f.endsWith('.md'))
      .sort()) {
      const src = readFileSync(join(NOTES, file), 'utf8').replace(/\r\n/g, '\n')
      pages.push({
        id: `notes/${file}`,
        out: join(GENERATED, 'notes', file),
        doc: segmentMarkdown(src, {
          entries: false,
          title: 'Tooltip note',
          headingIds: new Map()
        })
      })
    }
  }
  return pages
}

const CODE_ROOT = join(DOCS, '.vitepress')
const T_CALL_RE = /\bt\(\s*(['"])((?:\\.|(?!\1)[^\\\n])*)\1/g

function navTexts(
  items: (DefaultTheme.NavItem | DefaultTheme.SidebarItem)[]
): string[] {
  return items.flatMap((item) => [
    ...('text' in item && item.text ? [item.text] : []),
    ...('items' in item && item.items
      ? navTexts(item.items as DefaultTheme.SidebarItem[])
      : [])
  ])
}

export function loadStrings(): StringSource[] {
  const found = new Map<string, string>()
  const add = (en: string | undefined, context: string) => {
    if (en && !found.has(en)) found.set(en, context)
  }
  add(meta.description, 'Site description')
  for (const h of Object.values(headers)) {
    add(h.title, 'Page title')
    add(h.description, 'Page description')
  }
  for (const text of navTexts([
    ...nav,
    ...(sidebar as DefaultTheme.SidebarItem[])
  ]))
    add(text, 'Navigation menu label')
  for (const label of containerLabels) add(label, 'Callout box label')

  const files = (readdirSync(CODE_ROOT, { recursive: true }) as string[])
    .map(posix)
    .filter((f) => /\.(ts|mts|vue)$/.test(f) && !f.startsWith('i18n/generated'))
    .sort()
  for (const file of files) {
    const code = readFileSync(join(CODE_ROOT, file), 'utf8')
    for (const m of code.matchAll(T_CALL_RE))
      add(
        m[2].replace(/\\(.)/g, '$1'),
        `Site interface text (${basename(file)})`
      )
  }

  return [...found].flatMap(([en, context]) => {
    const seg = makeSegment(en, context, { params: true })
    return seg ? [{ en, seg }] : []
  })
}
