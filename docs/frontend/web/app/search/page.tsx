import { SearchPanel } from '@/components/SearchPanel'

export const metadata = { title: 'Search' }

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Semantic search</h1>
      <p className="mt-1 text-ink-2">
        Meaning-based, not just keywords — runs fully on-device via ternlight.
      </p>
      <SearchPanel />
    </div>
  )
}
