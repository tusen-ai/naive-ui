const vuePlugin = require('rollup-plugin-vue')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      dir: 'lib',
      exports: 'named',
      preserveModules: true
    },
    {
      format: 'esm',
      dir: 'es',
      preserveModules: true
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.json', '.vue']
    }),
    vuePlugin({
      compilerOptions: {
        whitespace: 'condense'
      }
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
    'async-validator',
    'date-fns',
    'date-fns/locale',
    'lodash-es',
    'vue',
    'treemate',
    'css-render',
    '@css-render/plugin-bem',
    'vueuc',
    'vooks'
  ]
}
