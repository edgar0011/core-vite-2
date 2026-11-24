---
name: debug
description: Debugging workflow guardrails. Use when diagnosing failures, handling user corrections, and preventing repeated mistakes with documented lessons.
---

# Debug

## Priority

Use this skill when debugging or responding to a correction. Pair it with the project umbrella skill for repository conventions.

## Included skill modules

- `self-improvement-loop`: capture corrections as prevention rules.

## Default flow

1. Reproduce the failure first. If it cannot be reproduced, say so; do not fix a guess.
2. Find the root cause and name the assumption that was wrong.
3. Fix it, then confirm the original reproduction no longer fails. For UI, that means the running app, not only the test suite.
4. Record the lesson through `self-improvement-loop`.
