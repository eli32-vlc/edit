# FMHY X

An alternative frontend for the FMHY wiki, built with Go + Next.js.

## Stack

- `server/` — Go API that parses the markdown guides in `docs/` into labeled pages, a site index (17k+ entries, 2k+ editor picks) and a semantic-search corpus.
- `web/` — Next.js 16 app (App Router, Tailwind v4). Dark sidebar layout: Home, For You feed, Starred, Stats, 88 labeled guide pages, site index, and semantic search powered by `@ternlight/base` embeddings.

## Dev

```sh
# API on :8080
cd server && go run .

# Web on :3000 (proxies /api/* to :8080)
cd web && pnpm install && pnpm dev
```

Embeddings for semantic search are precomputed:

```sh
cd web && pnpm embed   # reads :8080, writes public/corpus.json + public/embeddings.json
```

## Checks

```sh
cd web && npx tsc --noEmit && npx oxlint -c oxlint.config.ts
```

`oxlint.config.ts` enables the vendored anti-slop rules (`tools/oxlint/anti-slop`).

The recommendation feed (`/discover`) and Starred page keep likes/saves/dismissals in `localStorage` only — nothing leaves the browser.
