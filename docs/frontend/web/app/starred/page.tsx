import { SavedList } from '@/components/SavedList'
import { getSites } from '@/lib/api'

export const metadata = { title: 'Starred' }

export default async function StarredPage() {
  const sites = await getSites()

  return <SavedList sites={sites} />
}
