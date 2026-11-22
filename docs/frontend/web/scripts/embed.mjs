// Precompute ternlight embeddings for the semantic-search corpus.
// Reads the Go API's /api/search-index and writes public/embeddings.json
// plus public/corpus.json (the corpus the vectors align with).

import { mkdirSync, writeFileSync } from 'node:fs'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

const index = await fetch(`${API}/api/search-index`).then((r) => r.json())

console.log(`corpus: ${index.length} items`)

const { embed } = await import('@ternlight/base')

const vectors = []

for (let i = 0; i < index.length; i++) {
  const v = embed(index[i].text)
  vectors.push(Array.from(v, (x) => Math.round(x * 1e4) / 1e4))

  if ((i + 1) % 500 === 0) console.log(`  ${i + 1}/${index.length}`)
}

mkdirSync('public', { recursive: true })

writeFileSync('public/corpus.json', JSON.stringify(index))

writeFileSync('public/embeddings.json', JSON.stringify(vectors))

console.log('wrote public/corpus.json + public/embeddings.json')
