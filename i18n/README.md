# Translations

Chinese (`/zh/`) is generated from the English sources; nothing under `docs/zh/` is edited by hand.

- `i18n/zh/tm.json`: machine translations keyed by a hash of each English segment.
- `i18n/zh/overrides.json`: manual fixes (same shape as `tm.json`). They always win over `tm.json`.
- `i18n/zh/glossary.json`: fixed renderings and terms that must stay in English.
- `i18n/config.json`: endpoint, model, batching and concurrency.

## Workflow

```sh
OPENAI_API_KEY=... pnpm i18n:sync   # translate new or changed segments only
pnpm i18n:status                    # untranslated segments, unused entries, stale overrides
pnpm i18n:prune                     # drop translations whose English source is gone
pnpm docs:build                     # renders docs/zh from tm.json, no API calls
```

After an upstream rebase, run `pnpm i18n:sync` and `pnpm i18n:render`, then commit `tm.json`, `docs/zh/` and `docs/.vitepress/i18n/generated/`. Segments that fail validation are left in English and listed in `.cache/i18n-failures.json`; fix them in `overrides.json` or rerun the sync.
