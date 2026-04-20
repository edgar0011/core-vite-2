---
name: react-use-watch-over-watch
description: "React Hook Form guardrail. Use `useWatch()` instead of `watch()` from `useForm()` to isolate re-renders to only the watched fields."
---

# useWatch over watch

Always use `useWatch()` from `react-hook-form` instead of the `watch()` method returned by `useForm()`.

## Why

`watch()` subscribes the entire form component to every field change, causing full re-renders on every keystroke. `useWatch()` isolates re-renders to only the fields being observed.

## Rules

1. Never destructure `watch` from `useForm()`.
2. Use `useWatch({ name: 'fieldName', control })` or `useWatch({ control })` for multiple fields.
3. `control` can be omitted when `useWatch` is called inside the same component that calls `useForm()` (FormProvider context).

## Incorrect

```tsx
const { register, watch } = useForm<FormValues>()
const rating = watch('rating')
```

## Correct

```tsx
const { register, control } = useForm<FormValues>()
const rating = useWatch({ name: 'rating', control })
```

## Multiple fields

```tsx
const [title, body] = useWatch({ name: ['title', 'body'], control })
```
