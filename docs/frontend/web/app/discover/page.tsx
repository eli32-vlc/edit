import { DiscoverFeed } from '@/components/DiscoverFeed'
import { getSites } from '@/lib/api'

export default async function DiscoverPage() {
  const sites = await getSites()

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
      <p className="mt-1 text-ink-2">
        A feed of sites from the guides — like, save or dismiss to tune it.
      </p>
      <DiscoverFeed sites={sites} />
    </div>
  )
}
