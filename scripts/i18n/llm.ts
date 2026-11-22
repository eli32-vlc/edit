export interface LlmConfig {
  baseUrl: string
  model: string
  apiKey: string
  timeoutMs: number
}

export type ReasoningEffort = 'none' | 'low' | 'medium' | 'high'

export interface Usage {
  prompt: number
  completion: number
}

interface StreamChunk {
  choices?: { delta?: { content?: string } }[]
  usage?: { prompt_tokens?: number; completion_tokens?: number }
  error?: { message?: string }
}

const QUOTA_RE = /tier_limit_exceeded.*?resets (\S+?Z)/
const MAX_QUOTA_WAITS = 3
let pausedUntil = 0

// A stream that stops sending data is dead even if the socket stays open.
const IDLE_MS = 120_000

function idleTimeout(ms: number) {
  const controller = new AbortController()
  let timer = setTimeout(() => controller.abort(new Error('stream idle')), ms)
  return {
    signal: controller.signal,
    touch() {
      clearTimeout(timer)
      timer = setTimeout(() => controller.abort(new Error('stream idle')), ms)
    },
    clear: () => clearTimeout(timer)
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// The endpoint reports when its concurrency quota resets; every worker
// holds new requests until then instead of failing the rest of the run.
async function requestWithQuota(send: () => Promise<Response>) {
  for (let attempt = 0; ; attempt++) {
    if (Date.now() < pausedUntil) await sleep(pausedUntil - Date.now())
    const res = await send()
    if (res.ok || attempt >= MAX_QUOTA_WAITS) return res
    const body = await res.clone().text()
    const reset = body.match(QUOTA_RE)?.[1]
    if (!reset) return res
    const until = Date.parse(reset) + 1000
    if (until > pausedUntil) {
      pausedUntil = until
      console.log(`endpoint quota exceeded, pausing until ${reset}`)
    }
  }
}

// Streaming keeps the connection busy while the model reasons, so proxies
// in front of the endpoint do not cut long requests off as idle.
export async function chatJson(
  config: LlmConfig,
  system: string,
  user: unknown,
  usage: Usage,
  reasoning?: ReasoningEffort
): Promise<Record<string, unknown>> {
  let idle = idleTimeout(IDLE_MS)
  const res = await requestWithQuota(() => {
    idle.clear()
    idle = idleTimeout(IDLE_MS)
    return fetch(`${config.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        stream: true,
        stream_options: { include_usage: true },
        response_format: { type: 'json_object' },
        ...(reasoning ? { reasoning: { effort: reasoning } } : {}),
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: JSON.stringify(user) }
        ]
      }),
      signal: AbortSignal.any([
        idle.signal,
        AbortSignal.timeout(config.timeoutMs)
      ])
    })
  })
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
  let content = ''
  let buffer = ''
  const decoder = new TextDecoder()
  for await (const bytes of res.body) {
    idle.touch()
    buffer += decoder.decode(bytes, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()!
    for (const line of lines) {
      const data = line.match(/^data:\s*(.*)$/)?.[1]
      if (!data || data === '[DONE]') continue
      const chunk = JSON.parse(data) as StreamChunk
      if (chunk.error) throw new Error(chunk.error.message ?? 'stream error')
      content += chunk.choices?.[0]?.delta?.content ?? ''
      if (chunk.usage) {
        usage.prompt += chunk.usage.prompt_tokens ?? 0
        usage.completion += chunk.usage.completion_tokens ?? 0
      }
    }
  }
  idle.clear()
  if (!content) throw new Error('empty response')
  return JSON.parse(
    content.replace(/^```(?:json)?\s*|\s*```$/g, '').trim()
  ) as Record<string, unknown>
}

const SHARED_RULES = `Rules:
- ⟦n⟧ tokens are placeholders for links, site names, code and markup. Keep every placeholder exactly once, unchanged. Never translate, drop, duplicate or invent placeholders.
- Keep Markdown syntax intact: [label](⟦n⟧) links (translate a generic label, keep a name), **bold**, *italic*, table pipes |, and every emoji.
- Keep names of sites, apps, projects, people, companies, communities, file formats, protocols and acronyms in their original form. Also keep every term listed in "keep".
- Use the "glossary" renderings exactly.
- Tag lists separated by " / " keep the " / " separators.
- Put a space between Chinese text and adjacent Latin words, numbers or placeholders. Use full-width Chinese punctuation (，。：；？！（）) in Chinese sentences.
- Write concise, natural Simplified Chinese as used by mainland tech communities. Do not add, explain or omit anything.
- Each value is a single line.`

export const TRANSLATE_PROMPT = `You translate FMHY ("freemediaheckyeah"), a wiki that indexes free websites, apps and tools, from English into Simplified Chinese.
Input: JSON with "page", "glossary", "keep" and "items" (id, section, text).
Output: a JSON object mapping every item id to its Chinese translation.
${SHARED_RULES}`

export const REVIEW_PROMPT = `You review Simplified Chinese translations of FMHY ("freemediaheckyeah"), a wiki that indexes free websites, apps and tools.
Input: JSON with "page", "glossary", "keep" and "items" (id, section, source, draft).
Check each draft against its source for mistranslation, omissions, additions, unnatural Chinese and rule violations.
Output: a JSON object mapping the id of every draft that needs a change to its corrected full translation. Leave out drafts that are already correct. Output {} when all are correct.
${SHARED_RULES}`
