---
name: component-creation
description: Component scaffolding workflow for the core-vite-2 repo. Use when creating new atoms, molecules, or compounds so generation always starts with the required plop command.
---

# Component Creation

Always scaffold new UI components with plop before hand-editing files.

## Workflow

1. Run:

```bash
yarn plop component -- --component "{atoms|molecules}/component-name"
```

2. Replace `component-name` and pick the correct atomic level (`atoms` or `molecules`).
3. Edit the generated template files to match the actual feature requirements.

## Rule

- Do not create component files from scratch when plop generation is possible.
