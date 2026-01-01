import path from 'node:path'
import { fileURLToPath } from 'node:url'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import merge from 'deepmerge'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extensions = ['.mjs', '.js', '.json', '.ts']

const baseConfig = defineConfig({
  input: path.resolve('./src/index.ts'),
  external: ['vue'],
  plugins: [
    nodeResolve({ extensions }),
    esbuild({
      tsconfig: path.resolve(__dirname, 'tsconfig.esbuild.json'),
      target: 'esnext',
      sourceMap: true
    }),
    babel({
      extensions,
      babelHelpers: 'bundled'
    }),
    commonjs()
  ]
})

const umdConfig = defineConfig({
  output: {
    name: 'naive',
    format: 'umd',
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  }
})

const esmConfig = defineConfig({
  output: {
    format: 'esm'
  }
})

const devConfig = defineConfig({
  plugins: [
    replace({
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development')
      },
      preventAssignment: true
    })
  ]
})

const umdDevOutputConfig = defineConfig({
  output: {
    file: path.resolve('dist/index.js')
  }
})

const esmDevOutputConfig = defineConfig({
  output: {
    file: path.resolve('dist/index.mjs')
  }
})

const prodConfig = defineConfig({
  plugins: [
    replace({
      values: {
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      preventAssignment: true
    }),
    terser()
  ]
})

const umdProdOutputConfig = defineConfig({
  output: {
    file: path.resolve('dist/index.prod.js')
  }
})

const esmProdOutputConfig = defineConfig({
  output: {
    file: path.resolve('dist/index.prod.mjs')
  }
})

export default [
  // umd dev
  merge.all([baseConfig, umdConfig, devConfig, umdDevOutputConfig]),
  // umd prod
  merge.all([baseConfig, umdConfig, prodConfig, umdProdOutputConfig]),
  // esm dev
  merge.all([baseConfig, esmConfig, devConfig, esmDevOutputConfig]),
  // esm prod
  merge.all([baseConfig, esmConfig, prodConfig, esmProdOutputConfig])
]
