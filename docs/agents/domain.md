# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

1. **`CONTEXT-MAP.md`** at the repo root — multi-context map.
2. **`CONTEXT.md`** at the repo root — product-domain glossary and constraints.
3. The relevant per-context file(s) under `docs/contexts/*/CONTEXT.md` for the code you will touch.
4. **`docs/adr/`** — ADRs that touch the area you're about to work in.

If a listed file is missing, **proceed silently** for producer skills that create docs lazily. For this repo's initialization baseline, the map and product CONTEXT are expected to exist.

## File structure

Multi-context repo:

```
/
├── CONTEXT-MAP.md
├── CONTEXT.md                         ← product (shared)
├── docs/
│   ├── adr/                           ← system-wide decisions
│   └── contexts/
│       ├── weapp/CONTEXT.md           ← tourism_weapp
│       ├── admin/CONTEXT.md           ← tourism_admin
│       └── api/CONTEXT.md             ← tourism_api
├── tourism_weapp/
├── tourism_admin/
└── tourism_api/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in root `CONTEXT.md` / `LANGUAGES.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0001 (…) — but worth reopening because…_
