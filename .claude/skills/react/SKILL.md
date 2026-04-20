---
name: react
description: React and JavaScript guardrails for implementation and performance. Use when optimizing rendering behavior, event listeners, startup initialization, lookup patterns, conditional rendering correctness, and rerender side-effect patterns in React applications.
---

# React

## Priority

Use this skill for React or JavaScript performance work that is not repository-specific. Pair it with project skills when repository conventions also apply.

## Included skill modules

- `client-passive-event-listeners/SKILL.md` for using passive touch and wheel listeners when `preventDefault()` is not needed.
- `js-early-exit/SKILL.md` for returning early when a result is known.
- `use-watch-over-watch/SKILL.md` for using `useWatch()` instead of `watch()` in react-hook-form to isolate re-renders.

For app startup, initialization, import-performance, repeated-lookup, conditional-rendering, interaction side-effect, and transient-value tasks, read and follow the relevant rule above.

## Default flow

1. Identify the task category (render, listeners, JS loop logic, startup/init, lookup patterns, conditional rendering, or rerender side-effect behavior).
2. Apply the smallest safe optimization or rule from the relevant module or rules document.
3. Keep runtime behavior unchanged while improving performance.
4. Validate with existing tests, profiling, or reproduction steps.
5. Pair with a repository skill when architecture or style conventions are required.
