# Styling — core-vite-2

## Tailwind CSS v4 — CSS-first

There is **no `tailwind.config.js`**, and you should not add one. Configuration
lives in `src/index.css` via `@import 'tailwindcss'`, with the
`@tailwindcss/vite` plugin.

## The `@apply` trap

**`@apply` does not work in `.module.scss` files.** SCSS modules are processed
outside Tailwind's pipeline, so `@apply` silently emits nothing — no error, no
styles. Write plain CSS properties in SCSS modules instead.

## CSS variables

Variables are stored as **bare HSL triples** (no `hsl()` wrapper) so they can be
composed with alpha:

```css
:root { --border: 0 0% 89.8%; }
.thing { border-color: hsl(var(--border)); }
```

`@apply bg-background` with a custom variable does not work — use
`hsl(var(--background))` directly.

## `cn()`

`src/lib/utils.ts` exports `cn()` — `clsx` + `tailwind-merge`. Use it for all
conditional class composition so conflicting Tailwind classes resolve correctly.

## Theme

- **Light** (`:root`) — warm off-white background (`#f1efeb`), green primary
  (`#107a4d`), neutral grays
- **Dark** (`.dark`) — deep black background (`#0a0a0a`), sky accent

`RadixTheme` in `src/lib/customized-radix-theme-provider.tsx` uses
`useSyncExternalStore` with `matchMedia('prefers-color-scheme: dark')` to follow
the OS preference.

## Radix UI bridge

CSS variables are bridged to `@radix-ui/themes` via `.radix-themes` overrides in
`index.css`: `--foreground` → Radix text, `--primary` → `--accent-9`,
`--border` → `--gray-6`, `--card` → `--color-surface` / `--color-panel`, plus
destructive, muted, ring and radius.

## Custom utilities

Defined at the bottom of `src/index.css`: `.scrollbar-none`, `.canvas-linen`
(linen texture). `data-[attr]:` arbitrary variants work normally.
