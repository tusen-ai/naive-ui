import process from 'node:process'
import { defineConfig } from 'tsdown'
import vueJsxVapor from 'vue-jsx-vapor/rolldown'

const buildFormat = process.env.BUILD_FORMAT

if (buildFormat !== 'esm' && buildFormat !== 'cjs') {
  throw new Error('BUILD_FORMAT must be either "esm" or "cjs".')
}

const cjsLodashPlugin = {
  name: 'naive-cjs-lodash',
  renderChunk(code: string) {
    if (buildFormat !== 'cjs') {
      return null
    }
    return code
      .replaceAll('require("lodash-es")', 'require("lodash")')
      .replaceAll('require(\'lodash-es\')', 'require(\'lodash\')')
  }
}

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.spec.*'],
  root: 'src',
  outDir: buildFormat === 'esm' ? 'es' : 'lib',
  format: buildFormat,
  target: false,
  platform: 'browser',
  unbundle: true,
  dts: true,
  clean: false,
  outExtensions: () => ({
    js: '.js',
    dts: '.d.ts'
  }),
  plugins: [
    cjsLodashPlugin,
    vueJsxVapor({
      interop: true
    })
  ],
  define: {
    __DEV__: 'process.env.NODE_ENV !== \'production\''
  }
})
