# Code generation (Plop) — core-vite-2

A component is a **set of files**, so generate it rather than hand-rolling the
set. Templates live in `scripts/plop-templates/ui/`.

```sh
yarn plop                                              # interactive
yarn plop component -- --component "atoms/my-button"
yarn plop headless-component -- --component "molecules/my-widget"
```

Generators: `Component` / `component` (aliases) and `headless-component`.

## `component` — standard (4 files)

Generated in `src/components/{module}/`:

| File | Contents |
|---|---|
| `{kebab-name}.tsx` | Component using `BoxLayout`, `cn`, Radix `Heading`/`Text`/`Button` |
| `{kebab-name}.types.ts` | Props type extending `ComponentProps<'div'> & PropsWithChildren` |
| `{kebab-name}.stories.tsx` | Storybook story (`@storybook/react-vite`) |
| `{kebab-name}.spec.tsx` | Vitest test using `~/utils/test/test-utils` |

## `headless-component` — controller / view (6 files)

| File | Contents |
|---|---|
| `{kebab-name}.tsx` | Controller — delegates to the View, supports component injection |
| `{kebab-name}.types.ts` | `ViewProps` + `Props` with a `components` slot |
| `{kebab-name}.helpers.ts` | Pure helpers and constants |
| `views/{kebab-name}.view.tsx` | Default view using `LayoutBox` + `cn` |
| `views/{kebab-name}.view.stories.tsx` | Story for the view |
| `views/{kebab-name}.view.spec.tsx` | Test for the view |

Use this when logic and presentation should be swappable independently — it is
the preferred answer to "this component needs another variant", rather than
adding boolean props.

## Changing a convention

**Edit the template, not the next ten components.** A convention that lives only
in recently-written files is not a convention. Templates import `BoxLayout` from
`~/components/es-kit/components/container/layoutBox/LayoutBox`, use
`data-testid`, and follow the naming rules in [conventions.md](conventions.md).
