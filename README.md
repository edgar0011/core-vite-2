# React 19 + Vite Boilerplate

> A modern, production-ready React 19 boilerplate with comprehensive tooling for building scalable web applications.

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.16-6e9f18?logo=vitest)](https://vitest.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-10.1.11-ff4785?logo=storybook)](https://storybook.js.org/)

## ✨ Features

- ⚡️ **React 19** with React Compiler for automatic optimizations
- 🚀 **Vite 7** - Lightning-fast HMR and optimized builds
- 📘 **TypeScript** - Strict type safety with ES2022 target
- 🧪 **Vitest** - Fast unit testing with coverage reporting
- 📚 **Storybook** - Component development and documentation
- 🎨 **Radix UI** - Accessible component primitives
- 🎯 **ESLint 9** - Modern flat config with comprehensive rules
- 💅 **Prettier** - Consistent code formatting with plugins
- 🔧 **Plop** - Component scaffolding and code generation
- ♿️ **A11y Testing** - Built-in accessibility testing
- 📊 **Coverage Reports** - V8 coverage with multiple formats

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd core-vite-2

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite development server with HMR |
| `build` | Type-check and build for production |
| `preview` | Preview production build locally |
| `lint` | Lint source files with ESLint |
| `lint:fix` | Auto-fix linting issues |
| `test` | Run tests once |
| `test:watch` | Run tests in watch mode |
| `test:coverage` | Generate coverage report |
| `storybook` | Start Storybook on port 6006 |
| `build-storybook` | Build Storybook for deployment |
| `plop` | Generate new components |
| `tsc` | Run TypeScript compiler |
| `prepush` | Run lint, tests, and type-check (pre-push hook) |

## 🏗️ Project Structure

```
src/
├── components/        # Reusable components
│   ├── es-kit/       # ES-kit components
│   └── molecules/    # Molecular components
├── lib/              # Utility libraries
├── utils/            # Helper functions
│   └── test/         # Test utilities
├── stories/          # Storybook stories
├── sandbox/          # Development sandbox
│   └── decorators/   # Storybook decorators
└── assets/           # Static assets

scripts/
└── plop-templates/   # Component generation templates

coverage/             # Test coverage reports
dist/                 # Production build output
```

## 🧩 Component Generation

Generate new components with Plop:

```bash
# Interactive mode
npm run plop

# With arguments
npm run plop component -- --component "molecules/MyButton"
```

### What You Get

When you run `npm run plop component -- --component "path/ComponentName"`, you'll get:

- **`component-name.tsx`** - Component with Radix UI, proper typing, JSDoc comments
- **`component-name.types.ts`** - Type definitions with proper type imports
- **`component-name.stories.tsx`** - Storybook story with `@storybook/react-vite`
- **`component-name.spec.tsx`** - Vitest tests with comprehensive coverage

All files follow the same patterns and best practices as the Box component example! 🚀

### Generated Component Features

- ✅ **Radix UI Integration** - Uses `@radix-ui/themes` components
- ✅ **Type Safety** - Full TypeScript support with proper type imports
- ✅ **Accessible** - Built with accessibility in mind
- ✅ **Tested** - Includes comprehensive test suite
- ✅ **Documented** - Storybook stories and JSDoc comments
- ✅ **Styled** - Ready for Tailwind CSS with `cn()` utility

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Test Configuration

- **Environment**: jsdom
- **Coverage Provider**: V8
- **Reports**: Text, JSON Summary, LCOV
- **Excludes**: Type definitions, stories, index files
- **Setup**: `vitest.setup.ts`

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 📚 Storybook

### Running Storybook

```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006)

### Writing Stories

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './my-component'

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
}

export default meta
type Story = StoryObj<typeof MyComponent>

export const Default: Story = {
  args: {
    label: 'Click me',
  },
}
```

## 🎨 Styling

### Radix UI Themes

This template includes Radix UI Themes for accessible, customizable components:

```typescript
import { Button, Flex, Text } from '@radix-ui/themes'

export const MyComponent = () => (
  <Flex direction="column" gap="2">
    <Text>Hello World</Text>
    <Button>Click me</Button>
  </Flex>
)
```

### Tailwind CSS

Tailwind CSS is configured via Prettier plugin for class sorting:

```typescript
import { cn } from '~/lib/utils'

export const MyComponent = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 rounded-lg bg-blue-500 p-4', className)}>
    Content
  </div>
)
```

### Sass/SCSS

Sass is available for component-scoped styles:

```typescript
import './my-component.scss'

export const MyComponent = () => <div className="my-component">Content</div>
```

## 🔧 Configuration

### TypeScript

- **Target**: ES2022
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled
- **Path Aliases**: `~/` → `./src/`
- **Experimental Decorators**: Enabled

### ESLint

Modern flat config with:
- TypeScript integration
- React & React Hooks rules
- Auto-sorted imports
- Unused imports removal
- Prettier integration
- No semicolons, curly braces enforced

### Prettier

- **Semi**: false (no semicolons)
- **Single Quote**: true
- **Print Width**: 100
- **Plugins**:
  - Tailwind CSS class sorting
  - Package.json formatting
  - JSON recursive sorting

### Vite

- **Plugins**: React, tsconfig-paths
- **Path Aliases**: Configured via tsconfig
- **Git Integration**: Commit hash in build metadata

## 📦 Core Technologies

### Frontend
- **React 19.2.0** - Latest React with new features
- **React DOM 19.2.0** - DOM rendering
- **React Compiler** - Automatic optimizations

### Build & Development
- **Vite 7.2.4** - Next-gen build tool
- **TypeScript 5.9.3** - Type safety
- **vite-tsconfig-paths** - Path alias support

### Testing
- **Vitest 4.0.16** - Unit testing framework
- **@testing-library/react 16.3.1** - Component testing
- **@vitest/browser-playwright** - Browser testing
- **@vitest/coverage-v8** - Coverage reporting
- **jsdom 27.4.0** - DOM environment

### Code Quality
- **ESLint 9.39.1** - Linting
- **Prettier 3.7.4** - Formatting
- **TypeScript ESLint** - TS-specific rules

### UI & Styling
- **Radix UI Themes 3.2.1** - Component primitives
- **Tailwind CSS** - Utility-first CSS
- **Sass 1.97.1** - CSS preprocessor
- **clsx** & **tailwind-merge** - Class utilities

### Documentation
- **Storybook 10.1.11** - Component docs
- **@storybook/addon-a11y** - Accessibility testing
- **@storybook/addon-docs** - Auto-docs
- **@storybook/addon-vitest** - Vitest integration

### Developer Tools
- **Plop 4.0.4** - Code generation
- **@e1011/es-kit** - Utility library

## 🚦 Code Quality Gates

### Pre-push Hook

The `prepush` script runs:
1. ESLint checks
2. Full test suite with coverage
3. TypeScript compilation

```bash
npm run prepush
```

### Coverage Thresholds

Configure in `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json-summary', 'lcov'],
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['src/**/*.d.ts', 'src/**/*.stories.*', 'src/**/index.ts'],
}
```

## 🎯 Best Practices

### Import Organization

Imports are auto-sorted by `eslint-plugin-simple-import-sort`:

```typescript
// 1. External packages
import { useState } from 'react'
import { Button } from '@radix-ui/themes'

// 2. Internal modules (sorted alphabetically)
import { MyComponent } from '~/components/my-component'
import { useCustomHook } from '~/hooks/use-custom-hook'
import { formatDate } from '~/utils/date'
```

### React Imports

Use named imports only (enforced by ESLint):

```typescript
// ✅ Good
import { useState, useEffect } from 'react'

// ❌ Bad
import React from 'react'
```

### Component Structure

```typescript
// my-component.types.ts
export interface MyComponentProps {
  title: string
  onClick?: () => void
}

// my-component.tsx
import type { MyComponentProps } from './my-component.types'

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return <button onClick={onClick}>{title}</button>
}

// my-component.spec.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})

// my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './my-component'

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
}

export default meta
type Story = StoryObj<typeof MyComponent>

export const Default: Story = {
  args: { title: 'Hello' },
}
```

## 📝 Environment Variables

Create `.env` files for environment-specific config:

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=My App
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy Storybook

```bash
npm run build-storybook
```

Output in `storybook-static/` directory.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run prepush` to validate
4. Submit a pull request

## 📄 License

MIT

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/)
- [Radix UI](https://www.radix-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Built with ❤️ using modern web technologies**
