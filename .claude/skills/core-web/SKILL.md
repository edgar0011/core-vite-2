---
name: core-web
description: Umbrella guardrails for core-* React 19 + Vite SPAs (core-vite-2, core-vite-2-nest, core-vite-nest-rabbitmq, core-vite-ui and apps built on them). Use for any frontend change - composing atomic UI, creating components or headless components, layout wrappers, Tailwind classes, forms, lazy loading, long lists, UI review, and the lint loop before sharing work.
---

# core-web

## Priority

Apply this skill first for frontend work in a core-* Vite SPA, before optional task-specific skills. The project's own `CLAUDE.md` wins wherever it is more specific.

## Included skill modules

- `component-creation`: generate components with plop before editing by hand.
- `headless-component-creation`: generate controller/view-split components with plop.
- `component-comments`: keep effect comments, JSDoc, `.types.ts` docs and stories in sync.
- `tailwind-class-organization`: multiline `cn()` for long class lists.
- `jsx-structure-comments`: section comments in non-trivial markup.
- `box-layout-usage`: `BoxLayout` instead of layout-only `div`s.
- `form-component-pattern`: forms as dedicated React Hook Form + Zod components.
- `lazy-load-heavy-components`: `React.lazy` for heavy, non-initial UI.
- `rendering-content-visibility`: `content-visibility` on long lists.
- `web-design-guidelines`: UI / accessibility review.
- `react`, `js-early-exit`, `client-passive-event-listeners`, `use-watch-over-watch`: performance rules.
- `linting-workflow`: the `eslint --fix` loop and `yarn validate` gate.

## Critical rules (shared by every core-* SPA)

1. No default React import: `import { useState } from 'react'`, never `import React`.
2. `import type` for type-only imports (`verbatimModuleSyntax`).
3. No `enum`, no `namespace` (`erasableSyntaxOnly`).
4. No hand-written `useMemo` / `useCallback` / `memo`; the React Compiler handles memoization.
5. Event parameters are named `event`, never `e`.
6. No barrel files; import from the source file.
7. Path alias `~/` = `src/`.
8. No `@apply` inside `.module.scss`; SCSS modules use plain CSS and `hsl(var(--token))`.

## Project differences

| Project | UI base | Components live in |
|---|---|---|
| core-vite-2, core-vite-2-nest, core-vite-nest-rabbitmq | `@radix-ui/themes` + es-kit | `src/components/{atoms,molecules,ui,routes}` |
| core-vite-ui | `@base-ui/react` + SCSS-module tokens, **no Radix** | `src/components/{base-ui,molecules}` |

`core-vite-ui`'s differences are deliberate. Don't "fix" them toward the rest of the family.

## Default flow

1. Put shared code in `src/lib`, `src/hooks`, `src/helpers`, `src/components`.
2. Create components through plop, then customize the generated files.
3. Keep the file set together: a component change touches its `.tsx`, `.types.ts`, `.stories.tsx` and `.spec.tsx` as needed.
4. For UI review tasks, run `web-design-guidelines`.
5. Before sharing work: `linting-workflow`.
