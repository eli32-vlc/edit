import { getPages, getStats } from '@/lib/api'
import Link from 'next/link'

export const metadata = { title: 'Stats' }

export default async function StatsPage() {
  const [stats, pages] = await Promise.all([getStats(), getPages()])
  const max = Math.max(...pages.map((p) => p.links), 1)
  const top = [...pages].sort((a, b) => b.links - a.links).slice(0, 20)

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-ink">Stats</h1>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          ['Guides', stats.pages],
          ['Sites', stats.sites],
          ['Editor picks', stats.starred]
        ].map(([label, v]) => (
          <div
            key={label}
            className="rounded-card border border-line bg-surface px-4 py-3"
          >
            <p className="text-xl font-semibold tabular-nums text-ink">
              {Number(v).toLocaleString()}
            </p>
            <p className="mt-0.5 text-[12px] text-ink-2">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-base font-semibold text-ink">Largest guides</h2>
      <ul className="mt-3 space-y-1.5">
        {top.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/docs/${p.slug}`}
              className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-surface-sunken"
            >
              <span className="w-40 shrink-0 truncate text-sm text-ink sm:w-56">
                {p.label}
              </span>
              <span
                className="h-1.5 rounded-full bg-accent"
                style={{ width: `${Math.max(2, (p.links / max) * 100)}%` }}
              />
              <span className="ml-auto shrink-0 text-[12px] tabular-nums text-ink-3">
                {p.links}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
