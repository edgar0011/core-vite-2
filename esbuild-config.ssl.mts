import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

esbuild.build({
  entryPoints: ['src/server/index.ssl.mts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outfile: 'distServer/index.mjs',
  format: 'esm',
  logLevel: 'info',
  plugins: [nodeExternalsPlugin()],
})
