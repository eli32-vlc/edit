import type { Site } from '@/lib/api'
import { cosine, loadIndex } from '@/lib/search'

const KEY = 'fmhy.feed.v1'

export interface FeedState {
  likes: Record<string, true>
  saves: Record<string, true>
  dismisses: Record<string, true>
  pageW: Record<string, number>
  secW: Record<string, number>
  seen: Record<string, number>
}

export function loadFeed(): FeedState {
  if (typeof window === 'undefined') return empty()

  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return empty()
  }
}

// Clears tuning signals but keeps saved bookmarks — they're user data,
// not part of the taste model.
export function resetTaste(state: FeedState): FeedState {
  const s = { ...empty(), saves: { ...state.saves } }

  persist(s)

  return s
}

function empty(): FeedState {
  return { likes: {}, saves: {}, dismisses: {}, pageW: {}, secW: {}, seen: {} }
}

function persist(s: FeedState) {
  localStorage.setItem(KEY, JSON.stringify(s))
}

function bump(map: Record<string, number>, k: string, d: number) {
  map[k] = Math.max(-3, Math.min(6, (map[k] ?? 0) + d))
}

export function act(
  state: FeedState,
  site: Site,
  action: 'like' | 'save' | 'dismiss'
): FeedState {
  const s = { ...state }

  if (action === 'like') {
    if (s.likes[site.id]) {
      delete s.likes[site.id]
      bump(s.pageW, site.page, -1)
      bump(s.secW, site.section, -0.6)
    } else {
      s.likes[site.id] = true
      bump(s.pageW, site.page, 1)
      bump(s.secW, site.section, 0.6)
    }
  } else if (action === 'save') {
    if (s.saves[site.id]) {
      delete s.saves[site.id]
      bump(s.pageW, site.page, -1.4)
      bump(s.secW, site.section, -0.8)
    } else {
      s.saves[site.id] = true
      bump(s.pageW, site.page, 1.4)
      bump(s.secW, site.section, 0.8)
    }
  } else {
    s.dismisses[site.id] = true
    bump(s.pageW, site.page, -1.2)
    bump(s.secW, site.section, -0.8)
  }

  persist(s)

  return s
}

export function markSeen(state: FeedState, ids: string[]) {
  const t = Date.now()

  for (const id of ids) state.seen[id] = t
  persist(state)
}

/* ---------- embedding taste model ---------- */

export interface TasteModel {
  vector: Float32Array
  vectors: Map<string, Float32Array>
  signals: number
}

// Builds a taste vector = weighted mean of embeddings of liked (+1) and
// saved (+1.5) sites, dismissed (-1.2). Sites without embeddings contribute
// through page/section weights instead.
export async function buildTaste(state: FeedState): Promise<TasteModel> {
  const { corpus, vectors } = await loadIndex()
  const map = new Map<string, Float32Array>()

  corpus.forEach((c, i) => {
    if (c.kind === 'site') map.set(c.id, vectors[i])
  })

  const dims = vectors[0]?.length ?? 0
  const acc = new Float32Array(dims)
  let signals = 0

  const add = (id: string, w: number) => {
    const v = map.get(id)

    if (!v) return

    for (let i = 0; i < dims; i++) acc[i] += v[i] * w
    signals++
  }

  for (const id of Object.keys(state.likes)) add(id, 1)

  for (const id of Object.keys(state.saves)) add(id, 1.5)

  for (const id of Object.keys(state.dismisses)) add(id, -1.2)

  let norm = 0

  for (let i = 0; i < dims; i++) norm += acc[i] * acc[i]
  norm = Math.sqrt(norm)

  if (norm > 0) for (let i = 0; i < dims; i++) acc[i] /= norm

  return { vector: acc, vectors: map, signals }
}

/* ---------- scoring ---------- */

interface Scored {
  site: Site
  score: number
  reason: string
}

function scoreOne(s: Site, st: FeedState, taste: TasteModel | null): Scored {
  let score = 0
  let reason = 'Fresh pick'
  let best = 0

  if (s.starred) {
    score += 3

    if (3 > best) {
      best = 3
      reason = "Editors' pick"
    }
  }

  const pw = st.pageW[s.page] ?? 0
  const sw = st.secW[s.section] ?? 0
  const aff = pw * 1.2 + sw * 0.7

  if (aff > 0) {
    score += aff

    if (aff > best) {
      best = aff
      reason = `Because you liked ${s.pageName}`
    }
  } else if (aff < 0) {
    score += aff * 0.8
  }

  // Semantic similarity to the taste vector — the real personalization.
  if (taste && taste.signals > 0) {
    const v = taste.vectors.get(s.id)

    if (v) {
      const sim = cosine(taste.vector, v) * 4

      score += sim

      if (sim > best) {
        best = sim
        reason = 'Matches your taste'
      }
    }
  }

  if (!st.seen[s.id]) {
    score += 0.8

    if (best === 0) reason = 'New to you'
  }

  score += Math.sin(hashCode(s.id)) * 0.9 // stable per-site jitter for shuffle feel

  return { site: s, score, reason }
}

function hashCode(s: string) {
  let h = 0

  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0

  return (h % 997) / 997
}

// Round-robin across pages weighted by affinity so one category can't flood the feed.
export function buildFeed(
  sites: Site[],
  st: FeedState,
  batch: number,
  cursor: number,
  taste: TasteModel | null = null
): Scored[] {
  const visible = sites.filter((s) => !st.dismisses[s.id])
  const byPage = new Map<string, Scored[]>()

  for (const s of visible) {
    const sc = scoreOne(s, st, taste)
    const arr = byPage.get(s.page) ?? []
    arr.push(sc)
    byPage.set(s.page, arr)
  }

  for (const arr of byPage.values()) arr.sort((a, b) => b.score - a.score)

  // Weight pages by mean affinity (min 1) for ordering.
  const pages = [...byPage.entries()]
    .map(([page, arr]) => ({
      page,
      arr,
      w: Math.max(0.5, 1 + (st.pageW[page] ?? 0))
    }))
    .sort((a, b) => b.w - a.w || b.arr[0].score - a.arr[0].score)

  const out: Scored[] = []
  let idx = cursor

  while (out.length < batch && pages.some((p) => p.arr.length > 0)) {
    const p = pages[idx % pages.length]
    const item = p.arr.shift()

    if (item) out.push(item)
    idx++
  }

  return out
}
