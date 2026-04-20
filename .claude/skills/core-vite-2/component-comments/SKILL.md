---
name: component-comments
description: Component documentation guardrail for the core-vite-2 repo. Use when editing components with `useEffect`, JSDoc, `types.ts` param docs, or Storybook stories so implementation notes stay synchronized.
---

# Component Comments

Keep component comments and docs synchronized with implementation details.

## Rules

1. Add a short comment above each non-trivial `useEffect` that explains why the effect exists.
2. Keep component JSDoc synchronized with current behavior and props.
3. Keep `types.ts` comments synchronized so each parameter has JSDoc description.
4. If `stories.ts` or `stories.tsx` exists, keep Storybook notes/descriptions synchronized with the same behavior and prop semantics.
5. When behavior or props change, update code comments and docs in the same change.

## Rule

- Do not leave stale documentation across component files, `types.ts`, and Storybook stories.
