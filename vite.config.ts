import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import shelljs from 'shelljs'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { createHtmlPlugin } from 'vite-plugin-html'
import { replaceCodePlugin } from 'vite-plugin-replace'

const useEslint =
  dotenv.config()?.parsed?.USE_ESLINT !== 'false' || process.env.USE_ESLINT !== 'false'
const useSSL = dotenv.config()?.parsed?.USE_SSL === 'true' || process.env.USE_SSL === 'true'

console.log('useEslint', useEslint)
console.log('useSSL', useSSL)

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProd = NODE_ENV === 'production'

const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })
console.log('lastCommit', lastCommit)

import { dependencies, name, version } from './package.json'

const versionToken = `${version}, ${lastCommit?.trim()}`

const manualChunksMap: Record<string, string[]> = {
  'chunk-react': ['react', 'react-dom'],
  'chunk-@base-ui/react': ['@base-ui/react'],
  'chunk-@radix-ui/themes': ['@radix-ui/themes'],
}

// server-side deps — excluded from client chunks
const excludedFromChunks = new Set([
  'react',
  'react-dom',
  '@base-ui/react',
  '@radix-ui/themes',
  'body-parser',
  'compression',
  'connect-timeout',
  'cors',
  'dotenv',
  'express',
  'express-rate-limit',
  'helmet',
  'vhost',
])

Object.keys(dependencies).forEach((key) => {
  if (!excludedFromChunks.has(key)) {
    manualChunksMap[`chunk-${key}`] = [key]
  }
})

const isSimple = `${process.argv.slice(-2)}` === `${['--', 'simple']}`

const basePath = process.env.VITE_BASE || (isSimple ? '/core-simple/' : '/core-vite-2')
const entryPoint = isSimple ? '/src/main.simple.tsx' : '/src/main.tsx'
const outDir = isSimple ? 'distSimple' : 'dist'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          coreViteAppName: name,
          coreViteAppVersion: versionToken,
          coreViteAppEntry: entryPoint,
        },
      },
    }),
    replaceCodePlugin({
      replacements: [
        {
          from: /CORE_VITE_APP_VERSION/g,
          to: versionToken,
        },
        {
          from: /CORE_VITE_APP/g,
          to: name,
        },
        {
          from: /CORE_VITE_CONFIG_BASE_PATH/g,
          to: basePath,
        },
      ],
    }),
    useSSL ? basicSsl() : null,
    isProd || !useEslint ? null : checker({ eslint: { lintCommand: 'eslint src' } }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  base: basePath,
  build: {
    outDir,
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [chunkName, deps] of Object.entries(manualChunksMap)) {
            if (deps.some((dep) => id.includes(`node_modules/${dep}/`))) {
              return chunkName
            }
          }
        },
      },
    },
  },

  define: {
    __COMMIT__: JSON.stringify(lastCommit),
  },
})
