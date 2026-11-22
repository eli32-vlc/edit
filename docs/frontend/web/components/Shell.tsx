'use client'

import type { Page } from '@/lib/api'
import {
  BarChart3,
  BookOpen,
  Compass,
  Github,
  Home,
  Menu,
  Search,
  Star,
  X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MAIN = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/discover', label: 'For You', icon: Compass },
  { href: '/starred', label: 'Starred', icon: Star },
  { href: '/stats', label: 'Stats', icon: BarChart3 }
]

const START_HERE = new Set(['beginners-guide', 'startpage'])

function sections(pages: Page[]) {
  const start = pages.filter((p) => START_HERE.has(p.slug))
  const guides = pages
    .filter((p) => !START_HERE.has(p.slug) && p.stars > 0)
    .slice(0, 14)

  return { start, guides }
}

export function Shell({
  children,
  pages
}: {
  children: React.ReactNode
  pages: Page[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const { start, guides } = sections(pages)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        router.push('/search')
      }
    }

    window.addEventListener('keydown', h)

    return () => window.removeEventListener('keydown', h)
  }, [router])

  const item = (
    href: string,
    label: string,
    Icon?: typeof Home,
    extra?: React.ReactNode
  ) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href)

    return (
      <Link
        key={href + label}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] ${
          active
            ? 'bg-surface-sunken font-medium text-ink'
            : 'text-ink-2 hover:bg-surface-sunken hover:text-ink'
        }`}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {extra}
      </Link>
    )
  }

  const nav = (
    <>
      <div className="px-2 pb-3 pt-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-1 py-1.5 text-[17px] font-bold tracking-tight text-ink"
        >
          <Star size={17} className="text-star" fill="currentColor" />
          FMHY X
        </Link>
      </div>
      <nav aria-label="Primary" className="px-2">
        {MAIN.map(({ href, label, icon: Icon }) => item(href, label, Icon))}
      </nav>
      <p className="px-4 pb-1 pt-5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
        Start here
      </p>
      <nav aria-label="Start here" className="px-2">
        {start.map((p) => item(`/docs/${p.slug}`, p.label, BookOpen))}
        {item('/docs', 'All guides', BookOpen)}
      </nav>
      <p className="px-4 pb-1 pt-5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
        Guides
      </p>
      <nav aria-label="Guides" className="px-2 pb-4">
        {guides.map((p) =>
          item(
            `/docs/${p.slug}`,
            p.label,
            undefined,
            <span className="text-[11px] tabular-nums text-ink-3">
              {p.stars}
            </span>
          )
        )}
      </nav>
    </>
  )

  return (
    <div className="flex min-h-dvh">
      <aside
        className="sticky top-0 hidden h-dvh w-60 shrink-0 overflow-y-auto border-r border-line bg-surface-raised md:block"
        style={{ overscrollBehavior: 'contain' }}
      >
        {nav}
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 w-64 overflow-y-auto border-r border-line bg-surface-raised"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="flex justify-end p-2">
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-2 hover:bg-surface-sunken"
              >
                <X size={20} />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-line bg-surface-raised/95 backdrop-blur">
          <div
            className="flex h-13 items-center gap-2 px-3 sm:px-5"
            style={{ height: 52 }}
          >
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-surface-sunken md:hidden"
            >
              <Menu size={20} />
            </button>
            <form
              className="relative min-w-0 flex-1 sm:max-w-md"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                router.push(
                  q.trim()
                    ? `/search?q=${encodeURIComponent(q.trim())}`
                    : '/search'
                )
              }}
            >
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                aria-label="Search sites and guides"
                className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-12 text-sm text-ink placeholder:text-ink-3"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-line bg-surface-sunken px-1.5 text-[10px] text-ink-3 sm:inline">
                ⌘K
              </kbd>
            </form>
            <a
              href="https://github.com/fmhy/edit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-surface-sunken"
            >
              <Github size={18} />
            </a>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
