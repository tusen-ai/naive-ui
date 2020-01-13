const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve')
const strip = require('@rollup/plugin-strip')
const path = require('path')
const { terser } = require('rollup-plugin-terser')
const naiveSCSSVariable = require('./playground/naiveScssVarPlugin')

module.exports = {
  preserveModules: true,
  input: 'index.js',
  output: {
    format: 'esm',
    dir: 'test-bundle'
  },
  plugins: [
    vue(),
    naiveSCSSVariable(),
    strip(),
    resolve({
      extensions: ['.js', '.json', '.vue'],
      jail: path.resolve(__dirname, 'packages')
    }),
    terser({
      mangle: false,
      output: {
        beautify: true,
        indent_level: 2
      }
    })
  ],
  external: [
    'vue-runtime-helpers',
    'lodash-es/cloneDeep',
    'resize-observer-polyfill'
  ]
}
