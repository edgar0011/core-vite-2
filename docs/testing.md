# Testing — core-vite-2

Vitest owns the UI, unit and e2e tiers. Storybook is a development tool and does
**not** run story files as tests (see [storybook.md](storybook.md)).

## Setup

- **Config**: `vitest.config.ts` — jsdom environment, `globals: true`, `~/` alias,
  SCSS `loadPaths: ['./src']`
- **jest-dom matcher types**: come from `"types": [..., "@testing-library/jest-dom/vitest"]`
  in `tsconfig.app.json` (jest-dom 8, which supports Vitest 5 only). The bare
  `@testing-library/jest-dom` entry types Jest's globals, not Vitest's `expect`.
- **jsdom 31 resolves `var()` in computed styles.** Radix's CSS variables aren't
  loaded in tests, so `toHaveStyle({ color: 'var(--x)' })` sees the resolved
  (empty) value. Assert the inline style instead: `el.style.color`.
- **Vitest 5 defaults to know**: `clearMocks` is on (mock call history resets
  before every test), unawaited `.resolves`/`.rejects` fail the test, and
  `vi.mock` must be at module top level.
- **Setup file**: `vitest.setup.ts` — imports `@testing-library/jest-dom/vitest`
  and `whatwg-fetch`, calls `cleanup()` after each test, and installs shims for
  APIs jsdom does not implement: `matchMedia`, `ResizeObserver`, and
  `Element.prototype.{has,set,release}PointerCapture` (needed by Radix UI and
  Base UI). Verified against jsdom 31 — all four are still missing natively, so
  the shims are load-bearing.
- **Custom render**: `src/utils/test/test-utils.tsx` wraps components in the Radix
  `<Theme>` provider and sets `testIdAttribute: 'data-testid'`
- **Router testing**: `renderWithRouter()` for components using `useLoaderData`
  or other data-router hooks

## Coverage

v8 provider, reporting `text` + `json-summary` + `lcov` to `coverage/`.
Excludes `*.d.ts`, `*.stories.*` and `index.ts`.

Thresholds are enforced (`vitest.config.ts`): statements 60, branches 40,
functions 50, lines 60. **They ratchet — raise them as coverage improves, never
lower them to make a run pass.**

## Conventions

- `vi.fn()` / `vi.spyOn()` for mocks — never `jest.*`
- `describe` / `it`
- Spec files are `{name}.spec.tsx`, co-located with the source
- **`container.firstChild` is the Radix `<Theme>` wrapper**, not your component —
  query by role or test id instead

## Commands

```sh
yarn test            # single run
yarn test:watch      # watch mode
yarn test:coverage   # with coverage + thresholds
```
