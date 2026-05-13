import path from 'node:path'
import process from 'node:process'
import { babel } from '@rollup/plugin-babel'
import { defineConfig } from 'vite'

const extensions = ['.mjs', '.js', '.json', '.ts', '.tsx']

const isDev = process.env.BUILD_ENV === 'development'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'naive',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'umd') {
          return isDev ? 'index.js' : 'index.prod.js'
        }
        return isDev ? 'index.mjs' : 'index.prod.mjs'
      }
    },
    outDir: 'dist',
    sourcemap: true,
    minify: !isDev,
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      },
      plugins: [
        babel({
          extensions,
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  oxc: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'Fragment',
      development: false
    }
  },
  define: {
    __DEV__: JSON.stringify(isDev),
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
  }
})
