---
name: create-fullstack-project-vite-nest
description: Scaffold a fullstack project with Vite + React frontend and NestJS + Fastify backend, including lint, type-checking, and test coverage for both FE and BE. Based on core-vite-2-nest conventions.
---

# Create Fullstack Project: Vite + NestJS/Fastify

Scaffold a production-ready fullstack project with a React + Vite frontend and NestJS + Fastify backend.

## Reference Project

Use `/Users/martinweiser/Work/projects/javascript/core-vite-2-nest` as the reference implementation. Read its `docs/initial-context.md` for a compact overview and `docs/express-vs-nestjs-fastify.md` for backend details.

## Frontend Stack

- **React 19** + **Vite 8** (SPA, client-side routing via react-router v7)
- **TypeScript 5.9** (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`)
- **Tailwind CSS v4** (CSS-first, no tailwind.config.js)
- **Radix UI Themes** + **Base UI** for components
- **React Hook Form** + **Zod** for forms

## Backend Stack

- **NestJS 11** on **Fastify 5** (`@nestjs/platform-fastify`)
- **@fastify/compress** (gzip/deflate)
- **@fastify/helmet** (CSP + security headers)
- **@nestjs/throttler** (rate limiting)
- **@fastify/static** (serve SPA builds)
- **@nestjs/config** (env/config management)
- Separate `tsconfig.server.json` with `emitDecoratorMetadata` (NestJS decorators need it)

## Required Quality Gates

Every generated project MUST include all of the following:

### 1. Linting

- ESLint 9 flat config with Prettier integration
- Plugins: `simple-import-sort`, `unused-imports`, `react-hooks`, `react-refresh`, `jsx-a11y`
- Script: `yarn lint` and `yarn lint:fix`

### 2. Type Checking

- Strict TypeScript (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Separate tsconfigs: `tsconfig.app.json` (frontend), `tsconfig.node.json` (vite/scripts), `tsconfig.server.json` (NestJS backend)
- `tsconfig.app.json` must exclude `src/server/`
- Script: `yarn tsc` (uses `tsc -b` for project references)

### 3. Frontend Test Coverage

- Vitest 5 with jsdom 31 environment (Vitest 5 needs `vite` in devDependencies under yarn 1)
- jest-dom 8; matcher types via `@testing-library/jest-dom/vitest` in `tsconfig.app.json` `types`
- React Testing Library for component tests
- Coverage: v8 provider, reporters: text + json-summary + lcov
- Custom render wrapper with theme provider
- Scripts: `yarn test`, `yarn test:watch`, `yarn test:coverage`

### 4. Backend Test Coverage

- Vitest or Jest with NestJS testing utilities (`@nestjs/testing`)
- Unit tests for services and controllers
- Integration/e2e tests for API endpoints using `supertest` or Fastify's `inject()`
- Coverage reporting matching the frontend setup
- Scripts: `yarn test:be`, `yarn test:be:coverage`

### 5. Validation & Hooks

- Combined validation script: `yarn validate` → `lint:fix + tsc -b + test:coverage`
- Pre-push hook via Husky: `yarn prepush` → `lint + tsc -b + test:coverage`

## Project Structure Template

```
{project-name}/
├── src/
│   ├── server/
│   │   ├── main.ts              # NestJS bootstrap + Fastify plugins
│   │   ├── app.module.ts         # Root module
│   │   ├── app.controller.ts     # Root controller
│   │   └── cert/                 # SSL certs (optional)
│   ├── components/               # React components (atoms/, molecules/, etc.)
│   ├── lib/                      # Utilities (cn helper, theme provider)
│   ├── router/                   # React Router config
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind CSS entry
├── tsconfig.json                 # Project references
├── tsconfig.app.json             # Frontend (excludes src/server/)
├── tsconfig.node.json            # Vite/scripts
├── tsconfig.server.json          # NestJS backend (emitDecoratorMetadata)
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc
├── .husky/pre-push
├── package.json
└── Dockerfile
```

## Scripts (package.json)

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint src --ext js,jsx,ts,tsx",
  "lint:fix": "yarn lint --fix",
  "tsc": "tsc",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:be": "vitest run --config vitest.server.config.ts",
  "test:be:coverage": "vitest run --config vitest.server.config.ts --coverage",
  "validate": "yarn lint:fix && yarn tsc -b && yarn test:coverage",
  "prepush": "yarn lint && yarn tsc -b && yarn test:coverage",
  "dev:be": "NODE_ENV=development node --import tsx/esm --watch src/server/main.ts",
  "build:be": "rm -f node_modules/.tmp/tsconfig.server.tsbuildinfo && tsc -p tsconfig.server.json",
  "start:be": "NODE_ENV=production node distServer/main.js",
  "start:prodbuild": "yarn build && yarn build:be && yarn start:be",
  "storybook": "storybook dev -p 6006",
  "prepare": "husky"
}
```

## Conventions

- File naming: kebab-case. Components: PascalCase. Types: `{Name}Props`
- Path alias: `~/` → `src/`
- No barrel `index.ts` files
- No default React imports — use named imports
- Server imports use `.js` extensions for NodeNext resolution
- No manual `useMemo`/`useCallback`/`memo` (React 19 compiler handles it)
- Use `cn()` (clsx + tailwind-merge) for class merging
