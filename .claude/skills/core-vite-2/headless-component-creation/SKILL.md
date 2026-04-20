---
name: headless-component-creation
description: Headless component scaffolding workflow for the core-vite-2 repo. Use when creating new headless components (components with separated view logic) so generation always starts with the required plop command.
---

# Headless Component Creation

Always scaffold new headless components with plop before hand-editing files.

## When to use

Use this skill whenever the user mentions creating a **headless component** — a component with separated controller/view logic where the view can be swapped via a `components.View` prop.

## Workflow

1. Run:

```bash
yarn plop headless-component -- --component "{path}/{component-name}"
```

2. Replace `{path}` with the target location (e.g. `molecules/chat/my-component`) and `{component-name}` with the kebab-case name.

3. This generates 6 files:
   - `{component-name}.tsx` — Main headless component (controller)
   - `{component-name}.types.ts` — Type definitions
   - `{component-name}.helpers.ts` — Constants and helper functions
   - `views/{component-name}.view.tsx` — Default view component
   - `views/{component-name}.view.stories.tsx` — Storybook stories
   - `views/{component-name}.view.spec.tsx` — Unit tests

4. Edit the generated template files to match the actual feature requirements.

## Rule

- Do not create headless component files from scratch when plop generation is possible.
- Use this instead of the regular `component` generator when the component needs separated controller/view logic.
