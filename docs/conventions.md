# Conventions — core-vite-2

## Naming

- **Components**: PascalCase (e.g. `CoachesStatsCard`)
- **Files**: kebab-case (e.g. `coaches-stats-card.tsx`)
- **Types**: PascalCase with `Props` suffix, in `{name}.types.ts`
- **Functions / variables**: camelCase
- **Event parameters**: always `event`, never `e`
- **Specs**: `{name}.spec.tsx` — never `.test.tsx`

## Imports

- Path alias `~/` maps to `src/` (configured in `tsconfig.app.json` + Vite)
- Sorting enforced by `simple-import-sort` (ESLint), auto-fixable
- **No default React import** — `import { FC } from 'react'`
- **No barrel `index.ts` files** — import directly from source files
- `unused-imports/no-unused-imports` is an error
- **`import type` for type-only imports** — `verbatimModuleSyntax` is on

### `@e1011/es-kit` entry points

Import from the narrowest entry point, not the root barrel — the root pulls the
whole library and defeats tree-shaking:

| Import | Entry point |
|---|---|
| `setThemeClassNames`, `classNames`, `parseProps` | `@e1011/es-kit/utils/ui` |
| `useToggle`, `useThemePreference`, `useApi`, `useResize` | `@e1011/es-kit/hooks` |
| `Button`, `LayoutBox`, `Tooltip` | `@e1011/es-kit/ui` |
| `ced` (custom element decorator) | `@e1011/es-kit/utils/ced` |
| `createStore`, `PeregrineMQ`, `debounce` | `@e1011/es-kit/utils` |

## File organization

```
src/components/
├── atoms/           # small, reusable (select, typography, table-cell, wc/)
├── molecules/       # composed (form, table, table-pagination, box)
├── es-kit/          # local wrappers over @e1011/es-kit (LayoutBox/BoxLayout)
├── routes/          # route-level page components
└── ui/              # utility UI
```

Pure helpers and constants live in `{name}.helpers.ts` (or a `helpers/` dir),
never inline in a component file — see the custom ESLint rule below. Hooks go in
`hooks/` as `use-{name}.ts`.

## TypeScript

`tsconfig.app.json` (browser) — target ES2022, `module: ESNext`,
`moduleResolution: bundler`, `jsx: react-jsx`, and:

- `strict: true`, `noUnusedLocals`, `noUnusedParameters`,
  `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
- `verbatimModuleSyntax: true` — use `import type`
- `erasableSyntaxOnly: true` — **no enums, no namespaces, no parameter
  properties**. Use `as const` objects and union types instead.
- `experimentalDecorators` + `emitDecoratorMetadata` are on, and genuinely used
  (the `@ced` decorator in `src/components/atoms/wc/`) — don't strip them.

`tsconfig.node.json` covers `vite.config.ts` and `vitest.config.ts`.
`tsconfig.app.json` covers `src` and `.storybook`. Everything type-checks under
`yarn tsc -b`; nothing is silently excluded.

## Formatting and lint stack

**Prettier** (`.prettierrc`) — the settings that affect how you write code:

| Setting | Value |
|---|---|
| `semi` | `false` — no semicolons |
| `singleQuote` | `true` |
| `printWidth` | `100` |
| `jsonRecursiveSort` | `true` |

Plugins: `prettier-plugin-tailwindcss` (sorts Tailwind classes — it will reorder
your `className` strings, so don't fight it), `prettier-plugin-packagejson`
(normalizes `package.json`), `prettier-plugin-sort-json`.

**ESLint 9 flat config** (`eslint.config.js`) composes: `@eslint/js` recommended,
`typescript-eslint` recommended, `react-hooks`, `react-refresh`, `jsx-a11y`,
`eslint-plugin-import` (`no-cycle`, `no-extraneous-dependencies` as errors),
`simple-import-sort`, `unused-imports`, `eslint-plugin-storybook`, Prettier
integration, and the local `cv2` plugin below.

Notable rule choices: `semi: ['error', 'never']`, `no-restricted-imports` blocks
the default React import, `@typescript-eslint/no-explicit-any` is a **warning**
(don't take that as licence — avoid `any` at data boundaries), and
`react-hooks/exhaustive-deps` is a warning. Ignored paths: `coverage`, `dist`,
`distServer`, `distSimple`, `node_modules`, `storybook-static`.

Test utilities, specs and stories are exempt from
`react-refresh/only-export-components` — they are never Fast Refresh boundaries.

## Custom ESLint rule — `cv2/no-inline-helpers`

A local plugin (`scripts/eslint-plugin-cv2/`) warns when a component file
declares something that looks like a helper. Move it to a co-located
`.helpers.ts` file. Specs, stories, `.types.ts` files and test utilities are
exempt. It is a **warning**, not an error — treat the existing backlog as debt
and don't add to it.

## Best practices

- Use TypeScript strictly — avoid `any`, especially at data boundaries
- Composition over inheritance; keep components small and focused
- Use `cn()` for conditional class merging
- No inline styles unless the value is genuinely dynamic
- Prefer early returns
- **`useWatch()` over `useForm().watch`** — `useWatch` scopes re-renders to the
  fields actually being watched
