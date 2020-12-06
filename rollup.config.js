const cssRenderPlugin = require('./build/rollup-plugin-css-render')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const replace = require('@rollup/plugin-replace')

function externalValidator (patterns) {
  return id => patterns.some(pattern => id.startsWith(pattern))
}

// do not use babel when build library, use it when only build the site
module.exports = {
  input: 'src-mirror/index.js',
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
    replace({
      __DEV__: 'process.env.NODE_ENV !== "production"'
    }),
    nodeResolve({
      extensions: ['.js', '.json']
    }),
    cssRenderPlugin(),
    terser({
      mangle: false,
      output: {
        beautify: true,
        indent_level: 2
      }
    })
  ],
  external: externalValidator([
    'async-validator',
    'date-fns',
    'lodash-es',
    'vue',
    'treemate',
    'css-render',
    '@css-render/plugin-bem',
    'vueuc',
    'vooks',
    'evtd',
    'vdirs',
    'seemly'
  ])
}
