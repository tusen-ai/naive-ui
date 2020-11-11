const { nodeResolve } = require('@rollup/plugin-node-resolve')

function externalValidator (patterns) {
  return id => patterns.some(pattern => id.startsWith(pattern))
}

module.exports = {
  input: 'playground/tree-shaking-test/index.js',
  output: [
    {
      format: 'esm',
      dir: 'dist'
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.js']
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
    'evtd'
  ])
}
