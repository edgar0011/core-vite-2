# CLAUDE.md — core-vite-2

Guidelines for AI-assisted development. **Detail lives in the referenced files
below — read the one that covers your task rather than guessing.**

## Project Overview

core-vite-2 is the original React 19 + Vite 8 SPA shell of the `core-*` stack: a
prototyping sandbox and the reference frontend the other projects inherit. It
also ships a plain Express 5 static/SSL server in `src/server/`.

It is a **template**: a convention change here is expected to propagate to
`core-vite-2-nest` (the fullstack scaffold) and its derivatives, so make it as a
convention — code, plop template, and these docs — not as one edited file.

## Tech Stack

| | |
|---|---|
| Framework | React 19.3 + Vite 8.3 (SPA, `react-router` v8) |
| Language | TypeScript 5.9 — strict, `verbatimModuleSyntax`, `erasableSyntaxOnly` |
| Styling | Tailwind CSS v4.3 (CSS-first, no config file) + SCSS modules (`sass-embedded`) |
| UI | `@base-ui/react` v1.8 headless primitives + `@radix-ui/themes` v3.3 |
| Forms | `react-hook-form` v7 + `zod` v4 + `@hookform/resolvers` |
| Testing | Vitest 5.0 + jsdom 30 + React Testing Library |
| Storybook | Storybook 10.6 (`@storybook/react-vite`) — dev tool only, no Vitest integration |
| Shared lib | `@e1011/es-kit` v1.6 (hooks, utils, UI primitives) |
| Tooling | ESLint 9 flat config, Prettier 3.9, Plop 4, Husky, yarn 1.22 (classic) |

Node 24+. **yarn only** — never npm, never pnpm.

## Key Commands

| Command | Description |
|---|---|
| `yarn dev` | Dev server on port 3000 |
| `yarn build` | Type-check + production build |
| `yarn test` / `test:watch` / `test:coverage` | Vitest |
| `yarn lint` / `lint:fix` | ESLint |
| `yarn tsc -b` | Type-check all projects (src, .storybook, configs) |
| `yarn storybook` | Storybook on port 6006 |
| `yarn plop` | Scaffold a component |
| **`yarn validate`** | **lint:fix + tsc -b + test:coverage — the gate** |
| `yarn build:be` / `start:be` | Express server (port 8080) |

Husky `pre-push` runs `yarn prepush` (lint + tsc + coverage).

## Critical Rules — Do Not Break These

1. **No `@apply` in `.module.scss`** — SCSS modules bypass Tailwind's pipeline and
   it silently emits nothing. Use plain CSS properties.
2. **No default React import** — `import { FC } from 'react'`.
3. **`import type`** for type-only imports (`verbatimModuleSyntax`).
4. **No enums, no namespaces, no parameter properties** (`erasableSyntaxOnly`).
5. **No `useMemo` / `useCallback` / `memo`** — React 19 + the React Compiler
   handle it. The only exception is a *measured* regression, with a comment
   saying what was measured.
6. **Event params are `event`**, never `e`.
7. **No barrel `index.ts`** — import directly from source files.
8. **`data-testid`** is the test-id attribute.
9. **`BoxLayout` / `LayoutBox` as a component's root**, not a raw `<div>` — unless
   the root is already another component.
10. **`useWatch()`, never `useForm().watch`**.
11. **Import es-kit from its narrow entry points**, not the root barrel.
12. **Scaffold with `yarn plop`** — and change conventions in the template.

## Referenced Files

- [docs/conventions.md](docs/conventions.md) — naming, imports, es-kit entry points, file organization, TypeScript config, the `cv2/no-inline-helpers` rule
- [docs/styling.md](docs/styling.md) — Tailwind v4 CSS-first, the `@apply` trap, CSS variables, `cn()`, theming, Radix bridge
- [docs/testing.md](docs/testing.md) — Vitest config, jsdom shims, custom render, coverage thresholds
- [docs/storybook.md](docs/storybook.md) — addons, story pattern, and why there is no Vitest integration
- [docs/codegen.md](docs/codegen.md) — Plop generators, the 4-file and 6-file component sets
- [docs/build.md](docs/build.md) — Vite config, chunking, the `window.React` shim, Express server, Docker, known issues
- [docs/web-components.md](docs/web-components.md) — `ced` decorator, React 19 JSX module augmentation, property-vs-attribute

## Open follow-ups

Known issues and deferred work for this project are tracked **outside the repo**,
alongside its sibling, at `../core-vite-2-core-vite-ui-TODOS.md` (the
`javascript` folder root). Check it before starting work — it records what is
already known, why it was deferred, and what is blocked upstream. Tick items
there and reflect anything durable back into this file or `docs/`.

## Before Completing Your Task

```sh
yarn validate
```

Green means 0 lint errors, a clean `tsc -b`, and passing tests above the coverage
thresholds. Lint *warnings* (the `no-inline-helpers` backlog) are pre-existing
debt — don't add to it.
