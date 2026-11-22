'use client'

import type { Site } from '@/lib/api'
import type { FeedState } from '@/lib/feed'
import { act, loadFeed } from '@/lib/feed'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SavedList({ sites }: { sites: Site[] }) {
  const [state, setState] = useState<FeedState | null>(null)

  useEffect(() => {
    setState(loadFeed())
  }, [])

  const saved = state ? sites.filter((s) => state.saves[s.id]) : []

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-ink">Starred</h1>
      <p className="mt-1 text-sm text-ink-2">
        Sites you saved. Stored on this device only.
      </p>
      {state && saved.length === 0 && (
        <p className="mt-6 rounded-card border border-line bg-surface px-4 py-6 text-sm text-ink-2">
          Nothing saved yet — star sites from the{' '}
          <Link href="/discover">For You feed</Link> or{' '}
          <Link href="/sites">site index</Link>.
        </p>
      )}
      <ul className="mt-4 space-y-1.5">
        {saved.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-3 rounded-card border border-line bg-surface px-3.5 py-2.5"
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 flex-1 truncate text-sm font-medium text-ink"
            >
              {s.name}
              <span className="ml-2 font-normal text-ink-3">{s.pageName}</span>
            </a>
            <button
              type="button"
              aria-label={`Remove ${s.name} from saved`}
              onClick={() => state && setState(act(state, s, 'save'))}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-star hover:bg-surface-sunken"
            >
              <Star size={15} fill="currentColor" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
