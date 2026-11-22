import { getPages } from '@/lib/api'
import { Star } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'All guides' }

export default async function DocsIndex() {
  const pages = await getPages()

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-ink">
        All guides
      </h1>
      <p className="mt-1 text-sm text-ink-2">{pages.length} labeled pages.</p>
      <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/docs/${p.slug}`}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm hover:border-accent"
            >
              <span className="min-w-0 flex-1 truncate font-medium text-ink">
                {p.label}
              </span>
              {p.stars > 0 && (
                <span className="flex items-center gap-1 text-[11px] tabular-nums text-star">
                  <Star size={10} fill="currentColor" />
                  {p.stars}
                </span>
              )}
              <span className="text-[11px] tabular-nums text-ink-3">
                {p.links}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
