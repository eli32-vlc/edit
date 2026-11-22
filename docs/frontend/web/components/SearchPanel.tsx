'use client'

import type { SearchResult } from '@/lib/search'
import { semanticSearch } from '@/lib/search'
import {
  BookOpen,
  ExternalLink,
  Loader2,
  Search as SearchIcon,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export function SearchPanel() {
  const params = useSearchParams()
  const [q, setQ] = useState(() => params.get('q') ?? '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [busy, setBusy] = useState(false)
  const [ran, setRan] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  const run = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      setRan(false)

      return
    }

    setBusy(true)

    try {
      setResults(await semanticSearch(query))
      setRan(true)
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => run(q), 320)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [q, run])

  return (
    <div className="mt-4">
      <div className="relative">
        <SearchIcon
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “watch anime without ads” or “edit pdf”…"
          aria-label="Semantic search query"
          autoFocus
          className="h-12 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-[16px] placeholder:text-ink-3"
        />
        {busy && (
          <Loader2
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-ink-3"
          />
        )}
      </div>

      {ran && !busy && (
        <p className="mt-3 text-sm text-ink-3" role="status">
          {results.length} matches by meaning
        </p>
      )}
      <ul className="mt-2 space-y-2" aria-label="Search results">
        {results.map(({ item, score }) => (
          <li
            key={item.id}
            className="rounded-card border border-line bg-surface px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.kind === 'page'
                    ? 'bg-accent-soft text-accent-ink'
                    : 'bg-surface-sunken text-ink-2'
                }`}
              >
                {item.kind === 'page' ? (
                  <BookOpen size={11} />
                ) : (
                  <Sparkles size={11} />
                )}
                {item.kind === 'page' ? 'Guide' : 'Site'}
              </span>
              <span className="text-xs tabular-nums text-ink-3">
                {score.toFixed(2)}
              </span>
            </div>
            {item.kind === 'page' ? (
              <Link href={item.ref} className="mt-1 block font-medium text-ink">
                {item.name}
              </Link>
            ) : (
              <a
                href={item.ref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-medium text-ink"
              >
                {item.name}
                <ExternalLink size={12} className="text-ink-3" />
              </a>
            )}
            <p className="mt-0.5 line-clamp-2 text-sm text-ink-2">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      {ran && results.length === 0 && !busy && (
        <p className="mt-6 text-center text-ink-3">
          No semantic matches — try rephrasing the idea.
        </p>
      )}
    </div>
  )
}
