const vue = require('rollup-plugin-vue')
const resolve = require('@rollup/plugin-node-resolve')
const strip = require('@rollup/plugin-strip')
const { terser } = require('rollup-plugin-terser')
const naiveSCSSVariable = require('./build/naiveSCSSVarPlugin')

function externalValidator (patterns) {
  return id => patterns.some(pattern => id.startsWith(pattern))
}

module.exports = {
  preserveModules: true,
  input: 'src/index.js',
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
    vue({
      template: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
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
