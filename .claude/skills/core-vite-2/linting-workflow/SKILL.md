---
name: linting-workflow
description: Required linting iteration rule for the core-vite-2 repo. Use after each implementation pass to run eslint auto-fixes on newly created files before sharing updates.
---

# Linting Workflow

Run lint auto-fixes on new files at the end of every iteration.

## Workflow

1. Identify files created during the current iteration.
2. Run eslint auto-fix on those files before posting an update.

```bash
yarn eslint --fix <new-file-1> <new-file-2>
```

3. If more files are created in a later iteration, run the command again for the newly created set.

## Rule

- Do not skip this step before sharing implementation progress.
