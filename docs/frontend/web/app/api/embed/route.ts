import { embed } from '@ternlight/base'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_QUERY_LEN = 2000

export async function POST(req: Request) {
  let q: unknown

  try {
    // SAFETY: body shape is uncontrolled client input; narrowed by the
    // type/length check below before use.
    q = ((await req.json()) as { q?: unknown }).q
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- boundary validation of untyped JSON input
  if (typeof q !== 'string' || !q.trim() || q.length > MAX_QUERY_LEN) {
    return NextResponse.json({ error: 'missing query' }, { status: 400 })
  }

  const v = embed(q)

  return NextResponse.json({ v: Array.from(v) })
}
