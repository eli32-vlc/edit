import { SitesBrowser } from '@/components/SitesBrowser'
import { getPages, getSites } from '@/lib/api'

export default async function SitesPage() {
  const [sites, pages] = await Promise.all([getSites(), getPages()])

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Sites</h1>
      <p className="mt-1 text-ink-2">
        {sites.length.toLocaleString()} entries across {pages.length} guides.
      </p>
      <SitesBrowser sites={sites} pages={pages} />
    </div>
  )
}
