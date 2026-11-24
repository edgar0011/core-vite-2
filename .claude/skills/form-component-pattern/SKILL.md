---
name: form-component-pattern
description: Form composition guardrail for core-* React projects. Build each non-trivial form as a dedicated form component using React Hook Form with a Zod schema, exposing initialValues and onSubmit props.
---

# Form Component Pattern (React Hook Form + Zod)

Keep form logic and rendering in dedicated form components instead of inline route or page markup.

## Rules

1. Implement each non-trivial form as its own component (for example `molecules/review-form/ReviewForm`), generated with plop like any other component.
2. Validate with a Zod schema through `zodResolver`. In fullstack projects, reuse the schema the server validates with rather than redefining it, so both sides agree.
3. Expose `initialValues` and `onSubmit` props; map `initialValues` to `defaultValues`.
4. Read field values with `useWatch()`, not `watch()` (see `use-watch-over-watch`).
5. Keep route and page components focused on orchestration (data loading, navigation, toasts).

## Example

```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { reviewSchema, type ReviewValues } from '~/schemas/review'

import type { ReviewFormProps } from './ReviewForm.types'

export function ReviewForm({ initialValues, onSubmit }: ReviewFormProps) {
  const form = useForm<ReviewValues>({
    defaultValues: initialValues,
    resolver: zodResolver(reviewSchema),
  })

  return (
    <form onSubmit={form.handleSubmit((values) => onSubmit?.(values))}>
      {/* Fields */}
      <input {...form.register('comment')} aria-invalid={!!form.formState.errors.comment} />

      {/* Actions */}
      <button type="submit" disabled={form.formState.isSubmitting}>Save</button>
    </form>
  )
}
```

## Rule

- Prefer reusable form components with stable `initialValues` / `onSubmit` contracts and a single Zod schema.
