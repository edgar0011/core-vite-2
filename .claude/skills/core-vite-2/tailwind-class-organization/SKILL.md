---
name: tailwind-class-organization
description: Tailwind className formatting rules for the core-vite-2 repo. Use when writing or refactoring JSX className strings, especially when utility counts grow beyond simple inline readability.
---

# Tailwind Class Organization

Keep class blocks readable and consistently ordered.

## Rules

1. If a `className` has more than 8 Tailwind classes, split it into a multiline `cn()` call.
2. Order class groups by concern:
   - sizing and layout
   - colors
   - hover and interactive states
   - responsive variants

## Example

```tsx
className={cn(
  'flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3',
  'bg-white text-slate-900',
  'hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400',
  'md:px-5 md:py-4'
)}
```
