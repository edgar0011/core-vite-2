---
name: box-layout-usage
description: Layout wrapper guardrail for core-* Vite SPAs. Use when structuring spacing, flex or grid containers so wrappers use BoxLayout instead of raw layout-only div wrappers.
---

# BoxLayout Usage

Use `BoxLayout` for structural wrappers that only handle layout and spacing.

## Import path per project

| Project | Import |
|---|---|
| core-vite-2, core-vite-2-nest, core-vite-nest-rabbitmq | `import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'` |
| core-vite-ui | `import { BoxLayout } from '~/components/molecules/boxLayout/BoxLayout'` |
| other projects | copy whatever import existing files use (`grep -r "BoxLayout }" src`) |

## Rules

1. When a wrapper exists only for spacing, flex, grid, width or alignment, use `BoxLayout` instead of `<div className="...">`.
2. Keep semantic elements (`section`, `ul`, `li`, `nav`, ...) when they carry document meaning.
3. Prefer `BoxLayout` props (`asGrid`, `column`, `centered`, `wFull`, `hFull`; core-vite-ui also has `flex`) over the equivalent utility classes.

## Example

```tsx
export function CardGroup() {
  return (
    <section>
      <BoxLayout asGrid className="grid-cols-1 gap-4 md:grid-cols-3">
        <BoxLayout column className="gap-2 p-4">
          <h3>Title</h3>
          <p>Body</p>
        </BoxLayout>
      </BoxLayout>
    </section>
  )
}
```

## Rule

- Do not add new layout-only `<div className="...">` wrappers when `BoxLayout` can express the same structure.
