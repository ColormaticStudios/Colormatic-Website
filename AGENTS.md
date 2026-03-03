# AGENTS.md

This file is the local operating guide for AI coding agents working in this repository.

## Goals

- Keep behavior stable while improving maintainability.
- Prefer predictable structure and small, reversible changes.
- Avoid introducing framework-specific surprises.

## Project Conventions

- Framework: SvelteKit (Svelte 5 runes)
- Package manager: `bun` (do not switch to npm/yarn/pnpm lockfiles)
- Formatting: Prettier is the source of truth
- Validation gate: `bun run validate`

## Canonical Layout

- `src/routes`: route files only (`+page.svelte`, `+layout.svelte`, `+layout.ts`)
- `src/lib/blocks`: page-shell blocks (navbar, footer, background, settings)
- `src/lib/components`: reusable UI pieces
- `src/lib/data`: static content/data modules
- `src/lib/utils`: utilities/helpers
- `src/lib/styles`: global styles
- `static`: static public assets

## Import Rules

- Use `$lib/...` imports for internal shared modules.
- Keep route-to-route imports out unless there is a strong reason.

## Change Rules

- Keep edits focused; do not rewrite unrelated files.
- Preserve existing visual behavior unless explicitly requested.
- If changing structure, update imports and docs in the same change.

## Known Notes

- Site is configured for prerender/static output.
- Root styling is loaded from `src/routes/+layout.svelte` via `src/lib/styles/*`.
