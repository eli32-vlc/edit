import { SuggestedGrid } from '@/components/SuggestedGrid'
import { getPages, getSites, getStats } from '@/lib/api'
import { EyeOff, Rss, Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const INFO = [
  {
    icon: Rss,
    title: 'Auto-updated',
    body: 'This frontend rebuilds from the upstream wiki on every commit — entries stay current with the source.'
  },
  {
    icon: EyeOff,
    title: 'Private by default',
    body: 'Your likes, saves and searches stay on your device. Nothing leaves the browser.'
  },
  {
    icon: Search,
    title: 'Semantic search',
    body: 'Search by meaning via ternlight embeddings — on-device, no API calls, no tracking.'
  }
]

export default async function HomePage() {
  const [stats, sites, pages] = await Promise.all([
    getStats(),
    getSites(),
    getPages()
  ])

  // Suggested: top starred sites from diverse guides.
  const seen = new Set<string>()

  const suggested = sites
    .filter((s) => s.starred)
    .filter((s) => {
      if (seen.has(s.page)) return false
      seen.add(s.page)

      return seen.size <= 6
    })
    .slice(0, 6)

  const trending = pages
    .filter((p) => p.stars > 0)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10)

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-ink">Home</h1>
      <p className="mt-4 text-[15px] text-ink-2">
        <span className="font-semibold text-ink">FMHY X</span> — an alternative
        frontend for{' '}
        <a
          href="https://github.com/fmhy/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          FMHY
        </a>
        , the largest curated collection of free resources on the internet.{' '}
        {stats.pages} guides, {stats.sites.toLocaleString()} sites,{' '}
        {stats.starred.toLocaleString()} editor picks.
      </p>

      <div className="mt-5 space-y-2.5">
        {INFO.map(({ icon: Icon, title, body }) => (
          <section
            key={title}
            className="flex gap-3 rounded-card border border-line bg-surface px-4 py-3"
          >
            <Icon size={17} className="mt-0.5 shrink-0 text-accent-ink" />
            <p className="text-sm text-ink-2">
              <span className="font-semibold text-ink">{title}</span>
              <span className="mx-1.5">—</span>
              {body}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-ink">Suggested for You</h2>
        <Link href="/discover" className="text-sm">
          See all
        </Link>
      </div>
      <SuggestedGrid sites={suggested} />

      <h2 className="mt-8 flex items-center gap-2 text-lg font-semibold text-ink">
        <TrendingUp size={18} />
        Trending
      </h2>
      <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {trending.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/docs/${p.slug}`}
              className="flex items-center gap-3 rounded-card border border-line bg-surface px-3.5 py-2.5 hover:border-accent"
            >
              <span className="w-5 text-center text-sm font-semibold tabular-nums text-ink-3">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                {p.label}
              </span>
              <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-2">
                {p.stars} picks
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
