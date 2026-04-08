# React 19 + Vite Boilerplate

> A modern, production-ready React 19 boilerplate with comprehensive tooling for building scalable web applications.

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.3-646cff?logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.18-6e9f18?logo=vitest)](https://vitest.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-10.2.14-ff4785?logo=storybook)](https://storybook.js.org/)

## Features

- **React 19** with React Compiler for automatic optimizations
- **Vite 8** - Lightning-fast HMR and optimized builds (built-in tsconfig path resolution)
- **TypeScript** - Strict type safety with ES2022 target
- **Tailwind CSS v4** - CSS-first configuration via `@import 'tailwindcss'`
- **Vitest** - Fast unit testing with coverage reporting
- **Storybook 10** - Component development and documentation
- **Radix UI** - Accessible component primitives with theme bridging
- **Base UI** - Headless unstyled components (`@base-ui/react`)
- **React Hook Form** - Performant form handling with Zod validation
- **CVA** - Class Variance Authority for type-safe component variants
- **ESLint 9** - Modern flat config with comprehensive rules
- **Prettier** - Consistent code formatting with plugins
- **Plop** - Component scaffolding (standard + headless generators)
- **Docker** - Production-ready Dockerfile (Node 24 Alpine)

## Quick Start

### Prerequisites

- Node.js 24+
- yarn (classic 1.22)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd core-vite-2

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite development server with HMR (port 3000) |
| `build` | Type-check and build for production |
| `preview` / `start` | Preview production build locally |
| `lint` | Lint source files with ESLint |
| `lint:fix` | Auto-fix linting issues |
| `test` | Run tests once |
| `test:watch` | Run tests in watch mode |
| `test:coverage` | Generate coverage report |
| `validate` | Run lint:fix, tests with coverage, and type-check |
| `storybook` | Start Storybook on port 6006 |
| `build-storybook` | Build Storybook for deployment |
| `plop` | Generate new components |
| `tsc` | Run TypeScript compiler |
| `prepush` | Run lint, tests, and type-check (pre-push hook) |
| `docker:build` | Build Docker image |
| `docker:run` | Run Docker container (port 8080 -> 3000) |

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Atom components (Select, TableCell, etc.)
│   ├── molecules/      # Molecular components (Box, Form, Table, etc.)
│   ├── routes/         # Route-level components
│   └── es-kit/         # ES-kit component wrappers
├── lib/                # Utility libraries (cn(), theme provider)
├── router/             # React Router configuration
├── utils/
│   └── test/           # Test utilities and custom render
├── sandbox/            # Development sandbox & decorators
└── assets/             # Static assets

scripts/
└── plop-templates/
    └── ui/
        ├── component/           # Standard component templates
        └── headless-component/  # Headless component templates

coverage/               # Test coverage reports
dist/                   # Production build output
```

## Component Generation

Generate new components with Plop:

```bash
# Interactive mode — choose between component and headless-component
yarn plop

# Standard component with CLI arguments
yarn plop component -- --component "atoms/my-button"

# Headless component with view separation
yarn plop headless-component -- --component "molecules/my-widget"
```

### Standard Component

Generates:
- `component-name.tsx` — Component with Radix UI integration
- `component-name.types.ts` — Type definitions
- `component-name.stories.tsx` — Storybook story (`@storybook/react-vite`)
- `component-name.spec.tsx` — Vitest tests

### Headless Component

Generates a controller + swappable view pattern:
- `component-name.tsx` — Headless controller (accepts `components.View` override)
- `component-name.types.ts` — `ViewProps` + `Props` with `components` slot
- `component-name.helpers.ts` — Helper functions
- `views/component-name.view.tsx` — Default view using LayoutBox
- `views/component-name.view.stories.tsx` — View story
- `views/component-name.view.spec.tsx` — View tests

## Theming

### Color System

The app uses CSS variables in `src/index.css` bridged to Radix UI Themes:

- **Light theme** (`:root`) — Greptile-inspired palette: warm off-white background (`#f1efeb`), green primary (`#107a4d`), neutral grays
- **Dark theme** (`.dark`) — Headless UI-inspired palette: deep black background (`#0a0a0a`), sky-400 accent, neutral gray scale

### Auto Dark/Light Switching

The `RadixTheme` provider in `src/lib/customized-radix-theme-provider.tsx` uses `useSyncExternalStore` with `matchMedia('prefers-color-scheme: dark')` to automatically switch between light and dark themes based on the OS preference.

### Radix UI Bridge

All CSS variables are bridged to Radix UI Themes via `.radix-themes` overrides in `index.css`:
- `--foreground` -> Radix text color
- `--primary` -> Radix `--accent-9`
- `--border` -> Radix `--gray-6`
- `--card` -> Radix `--color-surface`, `--color-panel`
- And more (destructive, muted, ring, radius)

### Canvas Linen Texture

A Greptile-style linen texture is available as a CSS utility:

```html
<div class="canvas-linen">...</div>
```

## Web Components

Custom elements live in `src/components/atoms/wc/`. They use the `@ced` decorator from `@e1011/es-kit` to register with the browser via `customElements.define()`.

### Creating a Custom Element

```typescript
// src/components/atoms/wc/Stripe.ts
import { ced } from '@e1011/es-kit'
import type React from 'react'

@ced('atom-stripe')
class Stripe extends HTMLElement {
  static get observedAttributes() { return ['value'] }
  attributeChangedCallback(name: string, oldVal: string, newVal: string) { /* ... */ }
}

export default Stripe
```

### React 19 JSX Typing

React 19 moved `JSX.IntrinsicElements` from the global scope into the `react` module. To register a custom element for JSX, use **module augmentation** (not `declare global`):

```typescript
interface AtomStripeAttributes extends React.HTMLAttributes<HTMLElement> {
  value?: string | number
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'atom-stripe': AtomStripeAttributes
    }
  }
}
```

### Using in React

Import the component file (side-effect import) to register it, then use the tag in JSX:

```typescript
import '~/components/atoms/wc/Stripe'

<atom-stripe value={progress} style={{ width: '600px' }} />
```

> **Note**: React 19 passes values as **properties** (not attributes) to custom elements. Use `attributeChangedCallback` and property setters for reactive updates.

## Tailwind CSS v4

This project uses Tailwind CSS v4 with **CSS-first configuration** — there is no `tailwind.config.js`.

- Config via `@import 'tailwindcss'` in `src/index.css`
- `@apply` with custom CSS variables (e.g., `@apply bg-background`) does **not** work — use `hsl(var(--background))` directly
- Custom utilities like `.scrollbar-none` are defined at the bottom of `index.css`
- `data-[attr]:` arbitrary variants work fine

## es-kit Compatibility

`@e1011/es-kit` is bundled for React 18 with the classic JSX transform (`React.createElement`). Since this project uses React 19 with the automatic JSX runtime, a shim is required:

```html
<!-- In index.html <head> -->
<script type="module">
  import * as React from 'react';
  window.React = React;
</script>
```

This sets `React` on the global scope before any es-kit modules evaluate.

## Testing

### Running Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# With coverage
yarn test:coverage
```

### Test Configuration

- **Environment**: jsdom
- **Coverage Provider**: V8
- **Reports**: Text, JSON Summary, LCOV
- **Custom render**: Wraps components in Radix `<Theme>` via `~/utils/test/test-utils`
- **testIdAttribute**: `data-testid` (default)

## Storybook

```bash
yarn storybook
```

Visit [http://localhost:6006](http://localhost:6006)

Stories use `@storybook/react-vite` with `StoryFn` pattern:

```typescript
import type { Meta, StoryFn as Story } from '@storybook/react-vite'
```

## Docker

```bash
# Build
yarn docker:build

# Run (maps port 8080 -> 3000)
yarn docker:run
```

Uses Node 24 Alpine base image.

## Configuration

### TypeScript

- **Target**: ES2022
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled
- **Path Aliases**: `~/` -> `./src/`

### ESLint

Modern flat config with:
- TypeScript integration
- React & React Hooks rules
- Auto-sorted imports (`eslint-plugin-simple-import-sort`)
- Unused imports removal
- Prettier integration

### Prettier

- **Semi**: false
- **Single Quote**: true
- **Print Width**: 100
- **Plugins**: Tailwind CSS class sorting, package.json formatting, JSON sorting

## Core Technologies

### Frontend
- **React 19.2** with React Compiler
- **React Router 7** - Client-side routing
- **Radix UI Themes 3.3** - Themed component primitives
- **Base UI 1.2** - Headless unstyled components
- **Tailwind CSS 4.2** - Utility-first CSS (CSS-first config)

### Build & Deployment
- **Vite 8.0** - Build tool (native `resolve.tsconfigPaths` replaces `vite-tsconfig-paths`)
- **Manual chunk splitting** - Each vendor dependency gets its own cacheable chunk (server-side deps excluded)
- **Vercel deployment** - SPA URL rewrite rules for client-side routing
- **Express production server** - Node.js server with compression, CORS, helmet, rate limiting
- **TypeScript 5.9** - Type safety

### Testing
- **Vitest 4.0** - Unit testing
- **@testing-library/react 16.3** - Component testing
- **Playwright 1.58** - Browser testing
- **jsdom 27.4** - DOM environment

### Code Quality
- **ESLint 9.39** - Linting
- **Prettier 3.8** - Formatting

### Forms
- **React Hook Form 7.71** - Form handling
- **Zod 4.3** - Schema validation
- **@hookform/resolvers 5.2** - Validation integration

### Documentation
- **Storybook 10.2** - Component docs with a11y testing, dark/light mode via `storybook-dark-mode`

### Developer Tools
- **Plop 4.0** - Code generation (standard + headless generators)
- **@e1011/es-kit 1.1** - Utility library (LayoutBox, hooks)

## License

MIT
