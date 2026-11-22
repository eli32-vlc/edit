import { getPage, getPages } from '@/lib/api'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function DocPage({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: parts } = await params
  const slug = parts.join('/')

  const [pages, doc] = await Promise.all([
    getPages(),
    getPage(slug).catch(() => null)
  ])

  if (!doc) notFound()

  return (
    <div className="flex gap-6">
      <aside
        className="sticky top-[60px] hidden h-[calc(100dvh-76px)] w-56 shrink-0 overflow-y-auto border-r border-line pr-3 lg:block"
        style={{ overscrollBehavior: 'contain' }}
      >
        <p className="px-2 pt-1 pb-2 text-xs font-semibold tracking-wide text-ink-3 uppercase">
          Guides
        </p>
        <nav aria-label="Docs">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/docs/${p.slug}`}
              aria-current={p.slug === slug ? 'page' : undefined}
              className={`block rounded-lg px-2 py-1.5 text-sm ${
                p.slug === slug
                  ? 'bg-accent-soft font-medium text-accent-ink'
                  : 'text-ink-2 hover:bg-surface-sunken hover:text-ink'
              }`}
            >
              {p.label}
              {p.stars > 0 && (
                <span className="ml-1.5 text-[11px] text-star">
                  <Star
                    size={10}
                    className="mb-0.5 inline"
                    fill="currentColor"
                  />{' '}
                  {p.stars}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="mb-1 text-sm text-ink-3">
          <Link href="/docs" className="hover:text-ink">
            Docs
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-2">{doc.label}</span>
        </nav>
        <h1 className="sr-only">{doc.title}</h1>
        <div
          className="doc-content"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </article>
    </div>
  )
}
