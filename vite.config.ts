import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import shelljs from 'shelljs'
import { defineConfig } from 'vite'
// @ts-expect-error -- vite-plugin-eslint has broken typings with package.json exports
import eslint from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import { replaceCodePlugin } from 'vite-plugin-replace'
import tsconfigPaths from 'vite-tsconfig-paths'

const useEslint = dotenv.config()?.parsed?.USE_ESLINT !== 'false' || process.env.USE_ESLINT !== 'false'
const useSSL = dotenv.config()?.parsed?.USE_SSL === 'true' || process.env.USE_SSL === 'true'

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProd = NODE_ENV === 'production'

const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })
console.log('lastCommit', lastCommit)

import { name, version } from './package.json'

const versionToken = `${version}, ${lastCommit?.trim()}`

const isSimple = `${process.argv.slice(-2)}` === `${['--', 'simple']}`

const basePath = process.env.VITE_BASE || (isSimple ? '/core-simple/' : '/core-vite-2/')
const entryPoint = isSimple ? '/src/main.simple.tsx' : '/src/main.tsx'
const outDir = isSimple ? 'distSimple' : 'dist'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
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
    useSSL ? null : basicSsl(),
    isProd || !useEslint ? null : eslint({ emitWarning: false }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  base: basePath,
  build: {
    outDir,
  },

  define: {
    __COMMIT__: JSON.stringify(lastCommit),
  },
})
