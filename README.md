# Colormatic Website

[colormatic.org](https://colormatic.org)

This is a SvelteKit + TypeScript static site (SSG/prerendered).

## Tooling Standard

- Package manager: `bun`
- Runtime target: Node `>=20`, Bun `>=1.1`
- Formatter: `prettier`
- Type/lint gate: `svelte-check`

## Quick Start

```bash
git clone git@git.colormatic.org:ColormaticStudios/Colormatic-Website.git
cd Colormatic-Website
bun install
bun run dev
```

## Scripts

- `bun run dev`: start local dev server
- `bun run build`: create production build
- `bun run preview`: preview production build
- `bun run format`: apply formatting
- `bun run format:check`: verify formatting
- `bun run check`: run Svelte/TypeScript checks
- `bun run validate`: run formatting check + type checks (CI/local gate)

## Source Layout

- `src/routes`: pages and route-level layouts
- `src/lib/blocks`: app-level layout blocks (navbar, footer, background, settings)
- `src/lib/components`: reusable UI components
- `src/lib/data`: static data sources used by routes/components
- `src/lib/utils`: utility functions
- `src/lib/styles`: global styles imported in the root layout

[Bootstrap Icons](https://icons.getbootstrap.com/) are licensed under the [MIT](https://opensource.org/license/MIT) license.
