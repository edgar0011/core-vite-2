# React 19 + Vite Boilerplate

> A modern, production-ready React 19 boilerplate with comprehensive tooling for building scalable web applications.

[![React](https://img.shields.io/badge/React-19.2.8-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-646cff?logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1.11-6e9f18?logo=vitest)](https://vitest.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-10.5.10-ff4785?logo=storybook)](https://storybook.js.org/)

`core-vite-2` is the original SPA shell of the `core-*` stack — a prototyping
sandbox and the reference frontend the other projects inherit. It also ships a
plain Express 5 static/SSL server in `src/server/`.

It is a **template**: a convention change here is expected to propagate to
`core-vite-2-nest` and its derivatives, so make it as a convention — code, plop
template, and docs — not as one edited file.

## Features

- **React 19** with the React Compiler — no manual `useMemo` / `useCallback` / `memo`
- **Vite 8** — fast HMR, built-in tsconfig path resolution (no plugin needed)
- **TypeScript 5.9** — strict, plus `verbatimModuleSyntax` and `erasableSyntaxOnly`
- **Tailwind CSS v4** — CSS-first configuration, no `tailwind.config.js`
- **Base UI 1.8** + **Radix UI Themes 3.3** — headless primitives and themed components
- **React Hook Form + Zod** — typed forms with schema validation
- **Vitest 5** + jsdom 30 + Testing Library — with enforced coverage thresholds
- **Storybook 10** — component development and docs (not a test runner)
- **Plop** — component scaffolding (standard + headless generators)
- **ESLint 9** flat config, **Prettier 3.9**, Husky pre-push gate
- **Express 5 server** + **Docker** (Node 24 Alpine) + Vercel SPA rewrites

## Quick Start

**Prerequisites:** Node.js 24+ and yarn (classic 1.22). **yarn only** — never npm, never pnpm.

```bash
git clone <your-repo-url>
cd core-vite-2
yarn install
yarn dev
```

Visit [http://localhost:3000/core-vite-2](http://localhost:3000/core-vite-2).

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Vite dev server with HMR (port 3000) |
| `build` | Type-check (`tsc -b`) and build for production |
| `preview` / `start` | Serve the production build locally |
| `test` / `test:watch` / `test:coverage` | Vitest — single run, watch, coverage |
| `lint` / `lint:fix` | ESLint, with autofix |
| `tsc -b` | Type-check everything (`src`, `.storybook`, config files) |
| **`validate`** | **lint:fix + tsc -b + test:coverage — the gate** |
| `prepush` | lint + tsc + coverage (Husky pre-push hook) |
| `storybook` / `build-storybook` | Storybook on port 6006 / static build |
| `plop` | Scaffold a component |
| `build:be` / `start:be` | Build and run the Express server (port 8080) |
| `dev:be` | Express server in watch mode |
| `docker:build` / `docker:run` | Build and run the Docker image |

`dev`, `build` and the backend scripts have `:ssl` variants; `yarn generate:ssl:cert`
creates a local certificate. `dev:simple` / `build:simple` use the alternate entry point.

## Project Structure

```
src/
├── components/
│   ├── atoms/          # small, reusable (select, typography, table-cell, wc/)
│   ├── molecules/      # composed (box, form, table, table-pagination)
│   ├── es-kit/         # local wrappers over @e1011/es-kit (LayoutBox/BoxLayout)
│   ├── routes/         # route-level page components
│   └── ui/             # utility UI
├── lib/                # cn() helper, Radix theme provider
├── router/             # React Router configuration
├── utils/test/         # custom render + test utilities
├── sandbox/            # development sandbox & decorators
├── server/             # Express 5 static/SSL server (not NestJS)
├── assets/             # static assets
└── index.css           # Tailwind entry + CSS variables + custom utilities

scripts/
├── plop-templates/ui/  # component + headless-component generators
└── eslint-plugin-cv2/  # local no-inline-helpers rule
```

## Documentation

Conventions and deep detail live in [CLAUDE.md](CLAUDE.md) — a short index of the
topic docs below. Read the one that covers your task rather than guessing.

| Doc | Covers |
|---|---|
| [docs/conventions.md](docs/conventions.md) | Naming, imports, es-kit entry points, file organization, TypeScript config, the `cv2/no-inline-helpers` rule |
| [docs/styling.md](docs/styling.md) | Tailwind v4 CSS-first, the `@apply` trap, CSS variables, `cn()`, theming, Radix bridge |
| [docs/testing.md](docs/testing.md) | Vitest config, jsdom shims, custom render, coverage thresholds |
| [docs/storybook.md](docs/storybook.md) | Addons, story pattern, and why there is no Vitest integration |
| [docs/codegen.md](docs/codegen.md) | Plop generators — the 4-file and 6-file component sets |
| [docs/build.md](docs/build.md) | Vite config, chunking, the `window.React` shim, Express server, Docker, known issues |
| [docs/web-components.md](docs/web-components.md) | `ced` decorator, React 19 JSX module augmentation, property-vs-attribute |

### Things that surprise people

A few rules are load-bearing and easy to violate silently — the full list is in
[CLAUDE.md](CLAUDE.md):

- **`@apply` does not work in `.module.scss`** — SCSS modules bypass Tailwind's
  pipeline and it emits nothing, with no error. Use plain CSS properties.
- **No manual memoization** — the React Compiler handles it; an exception needs a
  *measured* regression and a comment saying what was measured.
- **No barrel `index.ts` files**, and import `@e1011/es-kit` from its narrow entry
  points (`/hooks`, `/ui`, `/utils/ui`, `/utils/ced`) rather than the root barrel.
- **Custom elements need `declare module 'react'`** module augmentation — the
  React 18 `declare global` pattern does not work.

## Core Technologies

**Frontend** — React 19.3 (React Compiler) · React Router 8 · Radix UI Themes 3.3 ·
Base UI 1.8 · Tailwind CSS 4.3 · `@e1011/es-kit` 1.6

**Build & deploy** — Vite 8.3 (native `resolve.tsconfigPaths`) · per-dependency
manual chunk splitting · Express 5 production server (compression, CORS, helmet,
rate limiting) · Docker (Node 24 Alpine) · Vercel SPA rewrites

**Testing** — Vitest 5.0 · Testing Library 16.3 · jsdom 30 · Playwright 1.63
(installed as the Vitest browser-mode provider; no browser tests configured yet)

**Quality** — TypeScript 5.9 · ESLint 9.39 · Prettier 3.9 · Plop 4

**Forms** — React Hook Form 7.89 · Zod 4.6 · `@hookform/resolvers` 5.9

> Two upgrades are held back by upstream peer ranges, not by choice:
> **TypeScript 7** (`typescript-eslint` peers `<6.1.0`) and **ESLint 10**
> (`eslint-plugin-react`, `jsx-a11y` and `import` cap at `^9`). Everything else is
> on its latest published version.

## License

MIT
