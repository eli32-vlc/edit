'use client'

import type { Page, Site } from '@/lib/api'
import { ExternalLink, Star } from 'lucide-react'
import { useMemo, useState } from 'react'

export function SitesBrowser({
  sites,
  pages
}: {
  sites: Site[]
  pages: Page[]
}) {
  const [group, setGroup] = useState('all')
  const [starredOnly, setStarredOnly] = useState(false)
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(200)

  const groups = useMemo(() => {
    const m = new Map<string, number>()

    for (const s of sites) m.set(s.page, (m.get(s.page) ?? 0) + 1)

    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [sites])

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase()

    return sites.filter(
      (s) =>
        (group === 'all' || s.page === group) &&
        (!starredOnly || s.starred) &&
        (!ql ||
          s.name.toLowerCase().includes(ql) ||
          s.desc.toLowerCase().includes(ql))
    )
  }, [sites, group, starredOnly, q])

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name or description"
          aria-label="Filter sites"
          className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-[15px] placeholder:text-ink-3 sm:max-w-xs"
        />
        <label className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={starredOnly}
            onChange={(e) => setStarredOnly(e.target.checked)}
            className="h-4 w-4 accent-[#0e63a8]"
          />
          Picks only
        </label>
      </div>
      <div
        className="mt-3 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Guide filter"
      >
        <button
          type="button"
          onClick={() => setGroup('all')}
          className={`min-h-9 rounded-full border px-3 text-sm ${
            group === 'all'
              ? 'border-accent bg-accent-soft font-medium text-accent-ink'
              : 'border-line bg-surface text-ink-2'
          }`}
        >
          All
        </button>
        {groups.slice(0, 16).map(([g, n]) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            className={`min-h-9 rounded-full border px-3 text-sm ${
              group === g
                ? 'border-accent bg-accent-soft font-medium text-accent-ink'
                : 'border-line bg-surface text-ink-2'
            }`}
          >
            {pages.find((p) => p.slug === g)?.label ?? g}{' '}
            <span className="text-ink-3">{n}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-3" role="status">
        {filtered.length.toLocaleString()} entries
      </p>
      <ul className="mt-2 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
        {filtered.slice(0, limit).map((s) => (
          <li key={s.id} className="flex items-start gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ink"
              >
                {s.starred && (
                  <Star
                    size={13}
                    className="shrink-0 text-star"
                    fill="currentColor"
                  />
                )}
                {s.name}
                <ExternalLink size={12} className="text-ink-3" />
              </a>
              {s.desc && (
                <p className="mt-0.5 line-clamp-2 text-sm text-ink-2">
                  {s.desc}
                </p>
              )}
            </div>
            <span className="mt-1 shrink-0 text-xs text-ink-3">
              {pages.find((p) => p.slug === s.page)?.label ?? s.page}
            </span>
          </li>
        ))}
      </ul>
      {filtered.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + 400)}
          className="mt-3 min-h-11 w-full rounded-lg border border-line bg-surface text-sm font-medium text-ink-2 hover:bg-surface-sunken"
        >
          Show more ({(filtered.length - limit).toLocaleString()} left)
        </button>
      )}
    </div>
  )
}
