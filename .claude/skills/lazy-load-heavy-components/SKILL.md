---
name: lazy-load-heavy-components
description: Bundle performance guardrail for core-* Vite SPAs. Use when adding large UI modules (charts, editors, maps, rich-text) so they are lazy-loaded with React.lazy and Suspense and kept out of the initial chunk.
---

# Lazy-Load Heavy Components

impact: CRITICAL
impactDescription: directly affects TTI and LCP
tags: bundle, dynamic-import, code-splitting, react-lazy, vite

Use `React.lazy` + `Suspense` to keep large components that are not needed on first render out of the main chunk. Vite splits every dynamic `import()` into its own chunk.

**Incorrect (the chart library ships in the entry chunk):**

```tsx
import { PriceChart } from '~/components/molecules/price-chart/PriceChart'

export function Dashboard() {
  return <PriceChart />
}
```

**Correct (loads on demand):**

```tsx
import { lazy, Suspense } from 'react'

const PriceChart = lazy(() =>
  import('~/components/molecules/price-chart/PriceChart').then((module) => ({ default: module.PriceChart })),
)

export function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <PriceChart />
    </Suspense>
  )
}
```

## Rules

- Lazy-load at route level first: react-router `lazy` route modules are the cheapest win.
- Measure before and after with `yarn build` chunk sizes; report the numbers (e.g. the 922 kB apexcharts chunk in `core-vite-ui`).
- Give every `Suspense` a fallback with the final layout size, so the page doesn't jump when the chunk arrives.
- In Astro, use islands (`client:visible`) instead; in TanStack Start, use route-level `lazy`.
