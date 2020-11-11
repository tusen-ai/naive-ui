const path = require('path')
const alias = require('@rollup/plugin-alias')

const { viteMdPlugin, rollupMdPlugin } = require('./demo/vite-plugins/mdPlugin')

module.exports = {
  root: __dirname,
  plugins: [
    viteMdPlugin()
  ],
  outDir: 'site',
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
        const isTusimple = !!process.env.TUSIMPLE
        console.log('/demo/index.' + isTusimple ? 'ts-dev.js' : 'dev.js')
        switch (process.env.NODE_ENV) {
          case 'production':
            return code.replace(
              /__INDEX__/,
              '/demo/index.' + (isTusimple ? 'ts-prod.js' : 'prod.js')
            )
          default:
            return code.replace(
              /__INDEX__/,
              '/demo/index.' + (isTusimple ? 'ts-dev.js' : 'dev.js')
            )
        }
      }
    }
  ]
}
