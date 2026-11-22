const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export interface Page {
  slug: string
  title: string
  label: string
  group: string
  stars: number
  links: number
}

export interface Site {
  id: string
  name: string
  url: string
  desc: string
  page: string
  pageName: string
  section: string
  starred: boolean
  kind: string
}

export interface CorpusItem {
  id: string
  kind: string
  text: string
  ref: string
  name: string
}

export async function getPages(): Promise<Page[]> {
  const r = await fetch(`${API}/api/pages`, { next: { revalidate: 3600 } })

  return r.json()
}

export async function getPage(
  slug: string
): Promise<{ slug: string; title: string; label: string; html: string }> {
  const r = await fetch(`${API}/api/page/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 }
  })

  if (!r.ok) throw new Error('page not found')

  return r.json()
}

export async function getSites(): Promise<Site[]> {
  const r = await fetch(`${API}/api/sites`, { next: { revalidate: 3600 } })

  return r.json()
}

export async function getStats(): Promise<{
  pages: number
  sites: number
  starred: number
}> {
  const r = await fetch(`${API}/api/stats`, { next: { revalidate: 3600 } })

  return r.json()
}
