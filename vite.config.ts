import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import shelljs from 'shelljs'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })

console.log('lastCommit', lastCommit)

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
})
