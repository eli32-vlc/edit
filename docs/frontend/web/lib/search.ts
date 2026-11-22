'use client'

import type { CorpusItem } from '@/lib/api'

export interface SearchResult {
  item: CorpusItem
  score: number
}

let cache: { corpus: CorpusItem[]; vectors: Float32Array[] } | null = null

export async function loadIndex() {
  if (cache) return cache

  // SAFETY: both files are build artifacts from scripts/embed.mjs — corpus
  // entries carry the CorpusItem shape, embeddings are aligned vectors.
  const [corpus, raw] = await Promise.all([
    fetch('/corpus.json').then((r) => r.json()) as Promise<CorpusItem[]>,
    fetch('/embeddings.json').then((r) => r.json()) as Promise<number[][]>
  ])

  cache = { corpus, vectors: raw.map((v) => Float32Array.from(v)) }

  return cache
}

export function cosine(a: Float32Array, b: Float32Array) {
  let d = 0

  for (let i = 0; i < a.length; i++) d += a[i] * b[i]

  return d // vectors are L2-normalized upstream
}

async function embedQuery(query: string): Promise<Float32Array> {
  const r = await fetch('/api/embed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query })
  })

  const { v } = await r.json()

  return Float32Array.from(v)
}

export async function semanticSearch(
  query: string,
  topK = 24
): Promise<SearchResult[]> {
  const [{ corpus, vectors }, q] = await Promise.all([
    loadIndex(),
    embedQuery(query)
  ])

  const ql = query.trim().toLowerCase()

  const scored: SearchResult[] = corpus.map((item, i) => {
    let score = cosine(q, vectors[i])
    // lexical boost: exact/loose term hits keep keyword-intent queries accurate
    const name = item.name.toLowerCase()

    if (name === ql) score += 0.35
    else if (name.includes(ql)) score += 0.22
    else if (item.text.toLowerCase().includes(ql)) score += 0.12

    if (item.kind === 'page') score += 0.02

    return { item, score }
  })

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, topK)
}
