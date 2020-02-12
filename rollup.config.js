const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve')
const strip = require('@rollup/plugin-strip')
const { terser } = require('rollup-plugin-terser')
const naiveSCSSVariable = require('./playground/naiveScssVarPlugin')

function externalValidator (ids) {
  return id => ids.some(identifier => id.startsWith(identifier))
}

module.exports = {
  preserveModules: true,
  input: 'packages/index.js',
  output: [
    {
      format: 'cjs',
      dir: 'lib'
    },
    {
      format: 'esm',
      dir: 'es'
    }
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.json', '.vue']
    }),
    vue(),
    naiveSCSSVariable(),
    strip(),
    terser({
      mangle: false,
      output: {
        beautify: true,
        indent_level: 2
      }
    })
  ],
  external: externalValidator([
    'vue-runtime-helpers',
    'date-fns',
    'async-validator',
    'vue-virtual-scroller',
    'lodash-es',
    'resize-observer-polyfill'
  ])
}
