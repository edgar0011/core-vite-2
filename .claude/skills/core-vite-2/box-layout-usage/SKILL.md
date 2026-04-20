---
name: box-layout-usage
description: Layout wrapper guardrail for the core-vite-2 repo. Use when structuring spacing, flex, or grid containers so wrappers use `BoxLayout` instead of raw `div` layout wrappers.
---

# BoxLayout Usage

Use `BoxLayout` for structural wrappers that handle layout and spacing.

## Rules

1. When a wrapper exists only for spacing, flex, grid, width, or alignment, use `BoxLayout` instead of `<div className="...">`.
2. Import `BoxLayout` from `~/components/es-kit/components/container/layoutBox/LayoutBox`.
3. Keep semantic HTML elements (`section`, `ul`, `li`, etc.) when they carry document meaning.
4. Prefer `BoxLayout` props (`asGrid`, `column`, `centered`, `wFull`, `hFull`) for common layout intent.

## Example

```tsx
import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'

export function CardGroup() {
  return (
    <BoxLayout asGrid className="grid-cols-1 gap-4 md:grid-cols-3">
      <BoxLayout column className="gap-2 p-4">
        ...
      </BoxLayout>
    </BoxLayout>
  )
}
```

## Rule

- Do not add new layout-only `<div className="...">` wrappers when `BoxLayout` can represent the same structure.
