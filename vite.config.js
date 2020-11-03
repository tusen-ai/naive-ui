const path = require('path')
const alias = require('@rollup/plugin-alias')

const { viteMdPlugin, rollupMdPlugin } = require('./demo/vite-plugins/mdPlugin')

module.exports = {
  root: __dirname,
  plugins: [
    viteMdPlugin()
  ],
  optimizeDeps: {
    include: [
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/highlight',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      'vooks'
    ]
  },
  alias: {
    '/@naive-ui/lib/icons/': path.resolve(__dirname, './src/_deprecated/icons'),
    '/@naive-ui/': path.resolve(__dirname, './src'),
    src: path.resolve(__dirname, './src')
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  rollupPluginVueOptions: {
    include: /\.(vue|md|demo.md|demo-entry.md|entry)$/
  },
  rollupInputOptions: {
    plugins: [
      alias({
        entries: [
          {
            find: /^naive-ui\/lib\/icons\//g,
            replacement: './src/_deprecated/icons/'
          },
          {
            find: /^naive-ui$/g,
            replacement: './src/index.js'
          }
        ]
      }),
      rollupMdPlugin()
    ]
  },
  indexHtmlTransforms: [
    {
      apply: 'pre',
      transform ({ code }) {
        switch (process.env.NODE_ENV) {
          case 'production':
            return code.replace(/__INDEX__/, '/demo/index.prod.js')
          default:
            return code.replace(/__INDEX__/, '/demo/index.dev.js')
        }
      }
    }
  ]
}
