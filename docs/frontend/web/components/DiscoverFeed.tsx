'use client'

import type { Site } from '@/lib/api'
import type { FeedState, TasteModel } from '@/lib/feed'
import {
  act,
  buildFeed,
  buildTaste,
  loadFeed,
  markSeen,
  resetTaste
} from '@/lib/feed'
import {
  ArrowUpRight,
  Bookmark,
  Heart,
  RotateCcw,
  Sparkles,
  Star,
  X
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const BATCH = 14

function hueFor(key: string) {
  let h = 0

  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0

  return (Math.abs(h) * 137.508) % 360 // golden-angle spread across the wheel
}

export function DiscoverFeed({ sites }: { sites: Site[] }) {
  const [state, setState] = useState<FeedState | null>(null)
  const [taste, setTaste] = useState<TasteModel | null>(null)
  const [cursor, setCursor] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setState(loadFeed())
  }, [])

  useEffect(() => {
    if (state) buildTaste(state).then(setTaste)
  }, [state])

  const feed = useMemo(() => {
    if (!state) return []

    return buildFeed(sites, state, BATCH * 4 + cursor * BATCH, cursor, taste)
  }, [sites, state, cursor, epoch, taste])

  useEffect(() => {
    if (state && feed.length)
      markSeen(
        state,
        feed.slice(0, BATCH).map((s) => s.site.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state !== null, epoch])

  useEffect(() => {
    if (!state || !sentinel.current) return

    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && setCursor((c) => c + 1),
      {
        rootMargin: '600px'
      }
    )

    io.observe(sentinel.current)

    return () => io.disconnect()
  }, [state])

  const onAct = useCallback(
    (site: Site, action: 'like' | 'save' | 'dismiss') => {
      setState((st) => st && act(st, site, action))
      setEpoch((e) => e + 1)
    },
    []
  )

  const onReset = useCallback(() => {
    setState((st) => st && resetTaste(st))
    setCursor(0)
    setEpoch((e) => e + 1)
  }, [])

  const affinities = useMemo(() => {
    if (!state) return []

    return Object.entries(state.pageW)
      .filter(([, w]) => w > 0.5)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([page, w]) => ({ page, w }))
  }, [state])

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
            className="h-28 animate-pulse rounded-2xl border border-line bg-surface"
          />
        ))}
      </div>
    )
  }

  const signals =
    Object.keys(state.likes).length + Object.keys(state.saves).length

  return (
    <div className="mt-2">
      <div className="sticky top-[52px] z-30 -mx-4 border-b border-line/60 bg-surface-raised/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-ink-2">
            <Sparkles size={14} className="text-accent-ink" />
            {signals === 0 ? (
              <>Like or save picks — the feed learns what you want</>
            ) : (
              <>
                <span className="font-semibold tabular-nums text-ink">
                  {signals}
                </span>{' '}
                signals
                {taste && taste.signals > 0 && ' · semantic match on'}
              </>
            )}
          </p>
          {signals > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs text-ink-3 transition-colors hover:bg-surface-sunken hover:text-ink active:scale-95"
            >
              <RotateCcw size={12} />
              Reset taste
            </button>
          )}
        </div>
        {affinities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {affinities.map(({ page, w }) => (
              <span
                key={page}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: `hsl(${hueFor(page)} 55% 18%)`,
                  color: `hsl(${hueFor(page)} 85% 78%)`
                }}
              >
                {page}
                <span
                  className="inline-block h-1 rounded-full"
                  style={{
                    width: `${Math.min(28, w * 6)}px`,
                    background: `hsl(${hueFor(page)} 80% 65%)`
                  }}
                />
              </span>
            ))}
          </div>
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {feed.map(({ site, reason }, i) => (
          <FeedCard
            key={site.id}
            site={site}
            reason={reason}
            liked={!!state.likes[site.id]}
            saved={!!state.saves[site.id]}
            onAct={onAct}
            fresh={i >= feed.length - BATCH}
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
  onAct,
  fresh
}: {
  site: Site
  reason: string
  liked: boolean
  saved: boolean
  onAct: (site: Site, action: 'like' | 'save' | 'dismiss') => void
  fresh: boolean
}) {
  const hue = hueFor(site.page)

  return (
    <li
      className="group rounded-2xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-ink-3/40"
      style={
        fresh
          ? { animation: 'feed-rise .4s cubic-bezier(.2,.8,.3,1) both' }
          : undefined
      }
    >
      <div className="flex items-start gap-3.5">
        <div
          className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[16px] font-bold"
          style={{
            background: `hsl(${hue} 55% 18%)`,
            color: `hsl(${hue} 85% 78%)`
          }}
          aria-hidden
        >
          {site.name
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 2)
            .toUpperCase() || site.name.slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 text-[16px] font-semibold text-ink"
            >
              <span className="truncate">{site.name}</span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            {site.starred && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-star-soft px-2 py-0.5 text-[11px] font-semibold text-star">
                <Star size={10} fill="currentColor" /> Pick
              </span>
            )}
          </div>
          {site.desc && (
            <p className="mt-0.5 line-clamp-2 text-[13.5px] leading-snug text-ink-2">
              {site.desc}
            </p>
          )}
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide"
                style={{
                  background: `hsl(${hue} 55% 18%)`,
                  color: `hsl(${hue} 85% 78%)`
                }}
              >
                {site.pageName}
              </span>
              <span className="truncate text-[11.5px] text-ink-3">
                {reason}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <ActionBtn
                label={liked ? 'Unlike' : 'Like'}
                pressed={liked}
                onClick={() => onAct(site, 'like')}
                active={liked ? 'text-red-400' : ''}
              >
                <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
              </ActionBtn>
              <ActionBtn
                label={saved ? 'Unsave' : 'Save'}
                pressed={saved}
                onClick={() => onAct(site, 'save')}
                active={saved ? 'text-accent-ink' : ''}
              >
                <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
              </ActionBtn>
              <ActionBtn
                label="Not interested"
                pressed={false}
                onClick={() => onAct(site, 'dismiss')}
              >
                <X size={17} />
              </ActionBtn>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function ActionBtn({
  label,
  pressed,
  onClick,
  active,
  children
}: {
  label: string
  pressed: boolean
  onClick: () => void
  active?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-75 ${
        active ?? 'text-ink-3 hover:bg-surface-sunken hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
