import { DiscoverFeed } from '@/components/DiscoverFeed'
import { getSites } from '@/lib/api'

export default async function DiscoverPage() {
  const sites = await getSites()

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-[28px] font-bold tracking-tight text-ink">For You</h1>
      <p className="mt-1 text-ink-2">
        A semantic feed over 17k sites — it learns from every like, save and
        dismiss.
      </p>
      <DiscoverFeed sites={sites} />
    </div>
  )
}
