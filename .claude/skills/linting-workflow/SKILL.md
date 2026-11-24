---
name: linting-workflow
description: Required lint-and-validate loop for every core-* project (web, React Native, Node). Use after each implementation pass to run eslint auto-fixes on changed files, and before reporting work as done.
---

# Linting Workflow

## Every iteration

Run eslint auto-fix on the files created or changed in this iteration before posting an update:

```bash
yarn eslint --fix <file-1> <file-2>
```

Repeat for files created in later iterations.

## Before saying "done"

Run the project's full gate and report its real outcome:

```bash
yarn validate
```

`validate` is defined in every core-* project, but its contents differ (web: `lint:fix && tsc -b && test:coverage`; React Native: `lint:fix && ts:check && test`). Check `package.json` if unsure. If a project has no `validate` script, run its lint, typecheck and test scripts one after another.

## Rules

- Yarn is the package manager in core-* projects. Exception: `core-cli` / `create-core-cli` use npm. Check for a lockfile before running anything.
- Never lower coverage thresholds or add `eslint-disable` to make the gate pass. Fix the cause or report the failure.
- A green gate is not proof that a UI change works. For UI or dependency changes, also check the app in a browser (see the upgrade playbook).
