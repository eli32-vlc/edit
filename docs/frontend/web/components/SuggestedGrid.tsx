'use client'

import type { Site } from '@/lib/api'
import type { FeedState } from '@/lib/feed'
import { act, loadFeed } from '@/lib/feed'
import { Globe, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SuggestedGrid({ sites }: { sites: Site[] }) {
  const [state, setState] = useState<FeedState | null>(null)

  useEffect(() => {
    setState(loadFeed())
  }, [])

  const visible = sites.filter((s) => !state?.dismisses[s.id])

  return (
    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((s) => (
        <div
          key={s.id}
          className="rounded-card border border-line bg-surface px-3.5 py-3"
        >
          <div className="flex items-start justify-between gap-2">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 truncate text-[14.5px] font-semibold text-ink"
            >
              {s.name}
            </a>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[12.5px] text-ink-2">
            {s.desc || s.pageName}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-accent-ink">
              {s.pageName}
            </span>
            <div className="flex items-center gap-0.5">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${s.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-surface-sunken hover:text-ink"
              >
                <Globe size={15} />
              </a>
              <button
                type="button"
                aria-label={state?.saves[s.id] ? 'Unsave' : 'Save'}
                aria-pressed={!!state?.saves[s.id]}
                onClick={() => state && setState(act(state, s, 'save'))}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
                  state?.saves[s.id]
                    ? 'text-star'
                    : 'text-ink-3 hover:bg-surface-sunken hover:text-ink'
                }`}
              >
                <Star
                  size={15}
                  fill={state?.saves[s.id] ? 'currentColor' : 'none'}
                />
              </button>
              <button
                type="button"
                aria-label="Not interested"
                onClick={() => state && setState(act(state, s, 'dismiss'))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-surface-sunken hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
