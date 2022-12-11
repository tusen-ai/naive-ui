const path = require('path')
const merge = require('deepmerge')
const { defineConfig } = require('rollup')
const nodeResolve = require('@rollup/plugin-node-resolve').default
const babel = require('@rollup/plugin-babel').default
const replace = require('@rollup/plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const esbuild = require('rollup-plugin-esbuild').default
const terser = require('@rollup/plugin-terser')

const extensions = ['.mjs', '.js', '.json', '.ts']

const baseConfig = defineConfig({
  input: path.resolve('./src/index.ts'),
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
  ],
  external: ['vue'],
  output: {
    name: 'naive',
    format: 'umd',
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
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
  ],
  output: {
    file: path.resolve('dist/index.js')
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
  ],
  output: {
    file: path.resolve('dist/index.prod.js')
  }
})

module.exports = [merge(baseConfig, devConfig), merge(baseConfig, prodConfig)]
