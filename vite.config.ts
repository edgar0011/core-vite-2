import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import shelljs from 'shelljs'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { replaceCodePlugin } from 'vite-plugin-replace'
import tsconfigPaths from 'vite-tsconfig-paths'


const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })
console.log('lastCommit', lastCommit)

import { name, version } from './package.json'

const versionToken = `${version}, ${lastCommit?.trim()}`

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
          coreViteAppEntry: '/src/main.tsx',
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

          to: process.env.VITE_BASE || '/core-vite-2/',
        },
      ],
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  base: process.env.VITE_BASE || '/core-vite-2/',

  define: {
    __COMMIT__: JSON.stringify(lastCommit),
  },
})
