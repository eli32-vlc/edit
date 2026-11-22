'use client'

import type { Site } from '@/lib/api'
import type { FeedState } from '@/lib/feed'
import { act, buildFeed, loadFeed, markSeen } from '@/lib/feed'
import { Bookmark, ExternalLink, Heart, Sparkles, Star, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const BATCH = 14

export function DiscoverFeed({ sites }: { sites: Site[] }) {
  const [state, setState] = useState<FeedState | null>(null)
  const [cursor, setCursor] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setState(loadFeed())
  }, [])

  const feed = useMemo(() => {
    if (!state) return []

    return buildFeed(sites, state, BATCH * 4 + cursor * BATCH, cursor)
  }, [sites, state, cursor, epoch])

  useEffect(() => {
    if (state && feed.length)
      markSeen(
        state,
        feed.slice(0, BATCH).map((s) => s.site.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state !== null, epoch])

  useEffect(() => {
    if (!sentinel.current) return

    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && setCursor((c) => c + 1),
      { rootMargin: '600px' }
    )

    io.observe(sentinel.current)

    return () => io.disconnect()
  }, [])

  const onAct = useCallback(
    (site: Site, action: 'like' | 'save' | 'dismiss') => {
      setState((st) => st && act(st, site, action))
      setEpoch((e) => e + 1)
    },
    []
  )

  const saved = useMemo(() => Object.keys(state?.saves ?? {}), [state])

  if (!state) {
    return (
      <div
        className="mt-6 space-y-3"
        aria-busy="true"
        aria-label="Loading feed"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-card border border-line bg-surface"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-4">
      {saved.length > 0 && (
        <p className="mb-3 flex items-center gap-1.5 text-sm text-ink-3">
          <Bookmark size={14} /> {saved.length} saved this session
        </p>
      )}
      <ul className="space-y-3">
        {feed.map(({ site, reason }) => (
          <FeedCard
            key={site.id}
            site={site}
            reason={reason}
            liked={!!state.likes[site.id]}
            saved={!!state.saves[site.id]}
            onAct={onAct}
          />
        ))}
      </ul>
      <div ref={sentinel} className="h-1" aria-hidden />
      <p className="mt-4 mb-8 text-center text-sm text-ink-3">
        Keep scrolling — the feed retunes itself
      </p>
    </div>
  )
}

function FeedCard({
  site,
  reason,
  liked,
  saved,
  onAct
}: {
  site: Site
  reason: string
  liked: boolean
  saved: boolean
  onAct: (site: Site, action: 'like' | 'save' | 'dismiss') => void
}) {
  return (
    <li className="rounded-card border border-line bg-surface px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-ink"
          >
            {site.name}
            <ExternalLink size={13} className="text-ink-3" />
          </a>
          {site.desc && (
            <p className="mt-1 line-clamp-3 text-sm text-ink-2">{site.desc}</p>
          )}
        </div>
        {site.starred && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-star-soft px-2 py-0.5 text-xs font-medium text-star">
            <Star size={11} fill="currentColor" /> Pick
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-ink-3">
          <Sparkles size={12} />
          {reason} · {site.pageName}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label={liked ? 'Unlike' : 'Like'}
            aria-pressed={liked}
            onClick={() => onAct(site, 'like')}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
              liked
                ? 'text-accent-ink bg-accent-soft'
                : 'text-ink-3 hover:bg-surface-sunken hover:text-ink'
            }`}
          >
            <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            aria-label={saved ? 'Unsave' : 'Save'}
            aria-pressed={saved}
            onClick={() => onAct(site, 'save')}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
              saved
                ? 'text-accent-ink bg-accent-soft'
                : 'text-ink-3 hover:bg-surface-sunken hover:text-ink'
            }`}
          >
            <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            aria-label="Not interested"
            onClick={() => onAct(site, 'dismiss')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-3 hover:bg-surface-sunken hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>
      </div>
    </li>
  )
}
