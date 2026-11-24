---
name: self-improvement-loop
description: Feedback loop guardrail. Use after user corrections or failed attempts to record the mistake pattern and a concrete prevention rule where future sessions will read it.
---

# Self-Improvement Loop

Treat user corrections as feedback that must change future behavior.

## Where the lesson goes

| Lesson applies to | Write it to |
|---|---|
| Only this repository | `tasks/lessons.md` in the project root (create it if missing) |
| Several core-* projects (toolchain, shared convention, a lying dependency) | `~/Work/projects/javascript/.agent/lessons.md` |
| A rule that belongs in a skill | The skill in `core-ai/skills/` (edit the source, then re-vendor; see `cai check`) |

## Workflow

1. After a correction, record the mistake pattern in reusable language.
2. Add or tighten a rule that would have prevented it.
3. If an existing lesson already covers it, sharpen that entry; don't add a duplicate.

## Rule

- Never close a correction cycle without a written prevention rule in the right place.
