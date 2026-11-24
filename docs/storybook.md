# Storybook — core-vite-2

Storybook 10 (`@storybook/react-vite`) on port 6006.

```sh
yarn storybook         # dev server on :6006
yarn build-storybook   # static build to storybook-static/
```

## No Vitest integration — deliberate

Storybook is a **development and documentation tool only**. Story files are not
run as tests. `@storybook/addon-vitest` and its `.storybook/vitest.setup.ts`
were removed rather than left configured-but-inert. Vitest owns the UI, unit and
e2e tiers — see [testing.md](testing.md).

If you ever want story-based tests, wire a dedicated Vitest project rather than
re-adding a half-configured addon.

## Addons

`@chromatic-com/storybook`, `@storybook/addon-a11y`, `@storybook/addon-docs`,
`@storybook/addon-onboarding`, `storybook-dark-mode`.

The a11y addon runs in `'todo'` mode — it surfaces violations in the UI but does
not fail anything. Treat it as advisory; accessibility is still part of "done".

> The onboarding addon reports that it can be uninstalled once onboarding is
> complete — safe to drop when convenient.

## Stories

- Location: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)` and `src/**/*.mdx`
- Pattern: `Meta` + `StoryFn as Story` from `@storybook/react-vite`

```ts
import type { Meta, StoryFn as Story } from '@storybook/react-vite'
```

- The preview decorator wraps every story in the Radix `<Theme>` (+ `<ThemePanel>`)
