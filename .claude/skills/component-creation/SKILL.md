---
name: component-creation
description: Component scaffolding workflow for core-* Vite SPAs. Use when creating new atoms, molecules or UI components so generation always starts with the plop generator instead of hand-written files.
---

# Component Creation

Always scaffold new UI components with plop before editing files by hand.

## Workflow

1. Run:

```bash
yarn plop component -- --component "<level>/<component-name>"
```

2. Pick `<level>` from the folders that exist in the project:

| Project | Levels |
|---|---|
| core-vite-2 family | `atoms`, `molecules`, `ui` |
| core-vite-ui | `molecules` (Base UI wrappers live in `base-ui`) |

3. The generator emits the file set: `.tsx`, `.types.ts`, `.stories.tsx`, `.spec.tsx` (core-vite-ui adds `.module.scss`). Templates live in `scripts/plop-templates/ui/`.
4. Edit the generated files to match the feature requirements.

## Rules

- Do not create component files from scratch when plop can generate them.
- If the generated shape is wrong for every new component, change the plop template (a convention change), not each output.
