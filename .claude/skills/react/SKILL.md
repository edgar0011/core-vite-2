---
name: react
description: React and JavaScript performance guardrails for core-* projects (Vite SPAs and React Native). Use when optimizing rendering behavior, event listeners, startup work, lookup patterns, conditional rendering, or rerender side effects.
---

# React

## Priority

Use this skill for React or JavaScript performance work that is not repository-specific. Pair it with the project umbrella skill (`core-web`, `core-rn`) when repository conventions also apply.

Memoization depends on the project. Check `package.json` for `babel-plugin-react-compiler`:

| Project type | Compiler | Rule |
|---|---|---|
| core-* Vite SPAs (core-vite-2 family, core-vite-ui) | on | Do not add `useMemo` / `useCallback` / `memo` by hand. Fix the cause (unstable parent props, state held too high, effects that set state). |
| React Native / Expo (core-react-native-expo, cera) | off | `memo` on list items and screen sections is the existing convention. Keep it, and add `useCallback` for handlers passed to memoized children. |

## Included skill modules

- `client-passive-event-listeners` (web only): passive touch and wheel listeners when `preventDefault()` is not needed.
- `js-early-exit`: return early once a result is known.
- `use-watch-over-watch`: `useWatch()` instead of `watch()` in React Hook Form to isolate re-renders.

## Default flow

1. Identify the task category (render, listeners, loop logic, startup/init, lookups, conditional rendering, rerender side effects).
2. Apply the smallest safe change from the relevant module.
3. Keep runtime behavior unchanged while improving performance.
4. Validate with existing tests, the React DevTools profiler, or a reproduction, and say which one you used.
