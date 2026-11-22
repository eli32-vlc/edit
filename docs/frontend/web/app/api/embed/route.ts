import { embed } from '@ternlight/base'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  // SAFETY: embed() validates input itself (TernError on non-string), so a
  // mis-typed body degrades to a thrown error rather than bad output.
  const { q } = (await req.json()) as { q?: string }

  if (!q) {
    return NextResponse.json({ error: 'missing query' }, { status: 400 })
  }

  const v = embed(q)

  return NextResponse.json({ v: Array.from(v) })
}
