# UI Component Guidelines for core-vite-2

## Project Overview

core-vite-2 is a Vite-based React SPA for prototyping UI components and patterns.

**Tech Stack**:

- **Framework**: React 19 + Vite 8 (SPA, client-side routing via `react-router` v7)
- **Language**: TypeScript 5.9 (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`)
- **Styling**: Tailwind CSS v4 (CSS-first config via `@import 'tailwindcss'` — no `tailwind.config.js`), SCSS modules for component-scoped styles
- **UI Components**: `@base-ui/react` v1.2 for headless primitives, `@radix-ui/themes` v3.3 for higher-level components (Table, Button, Flex, Select, Link)
- **Forms**: `react-hook-form` v7 + `zod` v4 + `@hookform/resolvers`
- **Testing**: Vitest 4 + jsdom + React Testing Library
- **Storybook**: Storybook 10 (`@storybook/react-vite`)
- **Package Manager**: yarn 1.22 (classic)
- **Linting**: ESLint 9 (flat config), Prettier, `simple-import-sort`, `unused-imports`
- **Git hooks**: Husky — `pre-push` runs `yarn prepush` (lint + test:coverage + tsc)
- **Code generation**: Plop 4

## Key Commands

| Command | Description |
|---|---|
| `yarn dev` | Dev server on port 3000 |
| `yarn build` | Type-check + production build |
| `yarn test` | Run Vitest (single run) |
| `yarn test:watch` | Run Vitest in watch mode |
| `yarn test:coverage` | Run Vitest with v8 coverage |
| `yarn lint` | ESLint src |
| `yarn lint:fix` | ESLint src with autofix |
| `yarn storybook` | Storybook on port 6006 |
| `yarn plop` | Run component generator |
| `yarn validate` | lint:fix + test:coverage + tsc |

## Code Style and Conventions

### Naming Conventions

- **Components**: PascalCase (e.g., `CoachesStatsCard`)
- **Files**: kebab-case (e.g., `coaches-stats-card.tsx`)
- **Types**: PascalCase with `Props` suffix (e.g., `CoachesStatsCardProps`)
- **Functions/Variables**: camelCase
- **Event parameters**: Always `event`, never `e`

### Import Rules

- Path alias: `~/` maps to `src/` (configured in tsconfig + vite)
- Import sorting enforced by `simple-import-sort` (ESLint)
- No default imports from `react` — use named imports (`import { FC } from 'react'`)
- No barrel `index.ts` files — import directly from source files
- `unused-imports/no-unused-imports` is enforced

### File Organization

```
src/components/
├── atoms/           # Small, reusable components (select, typography, table-cell, wc/)
├── molecules/       # Composed components (form, table-pagination)
├── es-kit/          # Wrappers around @e1011/es-kit (LayoutBox, BoxLayout)
├── routes/          # Route-level page components
└── ui/              # Utility UI components
```

### Styling Rules

- **Tailwind CSS v4**: No `tailwind.config.js`. Config is CSS-first via `@import 'tailwindcss'` in `src/index.css`
- **`@apply` does NOT work** in `.module.scss` files — SCSS modules bypass Tailwind's pipeline. Use plain CSS properties instead.
- **CSS variables**: HSL format without `hsl()` wrapper (e.g., `--border: 0 0% 89.8%`). Use as `hsl(var(--border))` in CSS.
- **`cn()` helper**: `src/lib/utils.ts` — combines `clsx` + `tailwind-merge`
- Custom utilities (`.scrollbar-none`, `.canvas-linen`) defined in `src/index.css`

### TypeScript Config

- Target: ES2022, Module: ESNext, JSX: react-jsx
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no enums, no namespaces, no parameter properties
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`

## Plop Templates — Component Generation

Run `yarn plop` to scaffold components. There are three generators:

### 1. `Component` / `component` — Standard component

Generates 4 files in `src/components/{module}/`:

```
{kebab-name}.tsx           # Main component (uses BoxLayout, cn, Radix Heading/Text/Button)
{kebab-name}.types.ts      # Props type (extends ComponentProps<'div'> & PropsWithChildren)
{kebab-name}.stories.tsx   # Storybook story (@storybook/react-vite)
{kebab-name}.spec.tsx      # Vitest test (uses ~/utils/test/test-utils)
```

CLI shorthand: `yarn plop component -- --component "module/path/ComponentName"`

### 2. `headless-component` — Headless + View pattern

Generates 6 files with logic/view separation:

```
{kebab-name}.tsx                    # Controller (delegates to View, supports component injection)
{kebab-name}.types.ts               # Props types
{kebab-name}.helpers.ts             # Pure helper functions and constants
views/{kebab-name}.view.tsx         # View component (uses LayoutBox, cn)
views/{kebab-name}.view.stories.tsx # Storybook story for view
views/{kebab-name}.view.spec.tsx    # Vitest test for view
```

### Template Notes

- Templates import from `~/components/es-kit/components/container/layoutBox/LayoutBox` (BoxLayout/LayoutBox)
- Stories use `@storybook/react-vite` — `Meta` and `StoryFn as Story`
- Tests import from `~/utils/test/test-utils` (custom render with Radix `<Theme>` wrapper)
- Test ID attribute is `data-testid` (the default)

## Testing

### Setup

- **Config**: `vitest.config.ts` — jsdom environment, globals enabled, `~/` alias
- **Setup file**: `vitest.setup.ts` — imports `@testing-library/jest-dom/vitest`, mocks `matchMedia`, `ResizeObserver`, pointer capture methods for Radix UI
- **Custom render**: `src/utils/test/test-utils.tsx` — wraps components in Radix `<Theme>`, configures `testIdAttribute: 'data-testid'`
- **Router testing**: `renderWithRouter()` available for components using `useLoaderData` or data router hooks
- **Coverage**: v8 provider, reports text + json-summary + lcov, excludes `.d.ts`, `.stories.*`, `index.ts`

### Test Conventions

- Use `vi.fn()` for mocks
- `describe`/`it` pattern
- Note: `container.firstChild` is the Radix `<Theme>` wrapper, not your component

## Storybook

- **Framework**: `@storybook/react-vite`
- **Addons**: chromatic, vitest, a11y, docs, onboarding
- **Preview decorator**: Wraps all stories in Radix `<Theme>` + `<ThemePanel>`
- **Stories location**: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)` and `src/**/*.mdx`
- **a11y**: Configured as `'todo'` mode (shows violations in UI but doesn't fail CI)

## Vite Config

- **Plugins**: `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-html` (template injection), `vite-plugin-replace` (version/app name tokens), `vite-plugin-checker` (ESLint overlay in dev)
- **Path resolution**: Built-in `resolve.tsconfigPaths: true` (Vite 8 — no plugin needed)
- **Base path**: `VITE_BASE` env var or `/core-vite-2`
- **Dev server**: port 3000, host: true
- **Build-time defines**: `__COMMIT__` (git short SHA), `CORE_VITE_APP_VERSION`, `CORE_VITE_APP`, `CORE_VITE_CONFIG_BASE_PATH`

## React 19 — NO Manual Memoization

This project uses React 19 with `babel-plugin-react-compiler`. Do NOT use:

- `useMemo()`, `useCallback()`, `memo()` — the compiler handles this automatically

Exception: Only when there is a **proven, measured performance issue**. Document why with a comment.

## Web Components

Custom elements (e.g., `atom-stripe`) live in `src/components/atoms/wc/`. They use `customElements.define()` and `observedAttributes`/`attributeChangedCallback`. React 19 passes properties (not attributes) to custom elements — use `attributeChangedCallback` for reactive updates. The `declare global { namespace JSX { ... } }` block for TypeScript support lives in the same file as the component; import the file (side-effect import) to make it visible to TypeScript.

## Best Practices

- Use TypeScript strictly — avoid `any`
- Use composition over inheritance
- Keep components small and focused
- Use `cn()` for conditional class merging
- Place constants and pure helpers in `.helpers.ts` files, not in component files
- No inline styles unless dynamic values require it
- Import components directly from source files, not barrels
- **`useWatch` over `watch`** — always use `useWatch()` from `react-hook-form` instead of the `watch()` method returned by `useForm()`. `useWatch` isolates re-renders to only the fields being watched
