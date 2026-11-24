# Build, dev server and deployment — core-vite-2

## Vite

- **Plugins**: `@vitejs/plugin-react` (with `babel-plugin-react-compiler`),
  `@tailwindcss/vite`, `vite-plugin-html` (template injection),
  `vite-plugin-replace` (version / app-name tokens)
- **Path resolution**: built in via `resolve.tsconfigPaths` — Vite 8 needs no
  `vite-tsconfig-paths` plugin
- **Dev server**: port 3000, `host: true`
- **Base path**: `VITE_BASE` env var, default `/core-vite-2`
- **Build-time defines**: `__COMMIT__` (git short SHA), `CORE_VITE_APP_VERSION`,
  `CORE_VITE_APP`, `CORE_VITE_CONFIG_BASE_PATH`
- **Manual chunk splitting**: each vendor dependency gets its own cacheable chunk
  (`chunk-react`, `chunk-react-router`, `chunk-@radix-ui/themes`, …);
  server-side deps are excluded

```sh
yarn dev            # dev server (:3000)
yarn dev:simple     # dev server, "simple" entry point
yarn build          # tsc -b && vite build
yarn preview        # serve the production build
```

There are `:ssl` variants of the dev/build scripts, plus
`yarn generate:ssl:cert` to create a local certificate.

## The `window.React` shim in `index.html`

`index.html` sets `window.React` before the app entry loads:

```html
<script type="module">
  import * as React from 'react';
  window.React = React;
</script>
```

This existed because older `@e1011/es-kit` builds were compiled for React 18
with the classic JSX transform (`React.createElement`) and expected a global
`React`.

**As of es-kit 1.6.0 it is no longer needed.** Verified by removing the shim,
rebuilding, and loading both routes from the production preview: everything
renders (including es-kit `Button` and `LayoutBox`), `typeof window.React` is
`undefined`, and the console is clean. The shim is still in place — it is a
candidate for removal, not a requirement.

Note `vitest.setup.ts` separately assigns `globalThis.React` for legacy test
helpers; that is independent of this shim.

## Express production server

`src/server/` holds a plain Express 5 static/SSL server — **not** NestJS (that's
`core-vite-2-nest`). Bundled by esbuild via `esbuild-config.mts` using
`esbuild-node-externals` so `node_modules` stay external.

- Middleware: helmet, cors, compression, `express-rate-limit`,
  `connect-timeout`, vhost
- Serves the built SPA and listens on **8080**

```sh
yarn build:be        # esbuild → distServer/index.mjs (+ copies cert/)
yarn start:be        # NODE_ENV=production node distServer/index.mjs
yarn start:prodbuild # build + build:be + start:be
yarn dev:be          # nodemon + ts-node against src/server/index.mts
```

## Docker & Vercel

```sh
yarn docker:build    # → edgar0011/core-vite-2-app
yarn docker:run      # maps 8080
```

Node 24 Alpine base image. `vercel.json` carries SPA rewrite rules for
client-side routing.

## Known issues

- **Favicon 404**: `index.html` references `/src/assets/icons/favicon.ico`, a dev
  path that does not survive the build. Move it to `public/` and reference
  `/favicon.ico`.
- **react-router `HydrateFallback` warning**: data mode logs
  `No HydrateFallback element provided to render during initial hydration`.
  Harmless today; fixed by giving the root route a `HydrateFallback`.
