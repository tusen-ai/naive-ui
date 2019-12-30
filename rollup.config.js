const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve')
const strip = require('@rollup/plugin-strip')
const path = require('path')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: 'packages/common/Select/index.js',
  output: {
    format: 'esm',
    file: 'lib/select/index.js'
  },
  plugins: [
    vue(),
    strip(),
    resolve({
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
