# Testing — core-vite-2

Vitest owns the UI, unit and e2e tiers. Storybook is a development tool and does
**not** run story files as tests (see [storybook.md](storybook.md)).

## Setup

- **Config**: `vitest.config.ts` — jsdom environment, `globals: true`, `~/` alias,
  SCSS `loadPaths: ['./src']`
- **jest-dom matcher types**: `src/utils/test/jest-dom-vitest.d.ts` — a workaround
  for [testing-library/jest-dom#738](https://github.com/testing-library/jest-dom/issues/738).
  jest-dom 7 augments Vitest's old `Assertion<T>`; Vitest 5 made it
  `Assertion<R, T>` and expects `Matchers<R, T>` to be augmented instead, so
  without this file every `toBeInTheDocument()` etc. is a type error (runtime is
  fine). Delete it once jest-dom ships the fix, then confirm `yarn tsc -b`.
- **Vitest 5 defaults to know**: `clearMocks` is on (mock call history resets
  before every test), unawaited `.resolves`/`.rejects` fail the test, and
  `vi.mock` must be at module top level.
- **Setup file**: `vitest.setup.ts` — imports `@testing-library/jest-dom/vitest`
  and `whatwg-fetch`, calls `cleanup()` after each test, and installs shims for
  APIs jsdom does not implement: `matchMedia`, `ResizeObserver`, and
  `Element.prototype.{has,set,release}PointerCapture` (needed by Radix UI and
  Base UI). Verified against jsdom 30 — all four are still missing natively, so
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
