import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import shelljs from 'shelljs'

const { stdout: lastCommit } = shelljs.exec('git rev-parse --short HEAD', { silent: true })

console.log('lastCommit', lastCommit)


// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
})
