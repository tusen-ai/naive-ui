const path = require('path')
const alias = require('@rollup/plugin-alias')
const { babel } = require('@rollup/plugin-babel')
const rollupCssRenderPlugin = require('./build/rollup-plugin-css-render')
const rollupDemoPlugin = require('./build/rollup-plugin-demo')
const viteCssRenderPlugin = require('./build/vite-plugin-css-render')
const viteDemoPlugin = require('./build/vite-plugin-demo')

module.exports = {
  root: __dirname,
  plugins: [
    viteDemoPlugin(),
    viteCssRenderPlugin()
  ],
  outDir: 'site',
  optimizeDeps: {
    include: [
      'highlight.js/lib/core',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python'
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
      rollupDemoPlugin(),
      rollupCssRenderPlugin(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  },
  indexHtmlTransforms: [
    {
      apply: 'pre',
      transform ({ code }) {
        const isTusimple = !!process.env.TUSIMPLE
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
