const path = require('node:path')
const dns = require('node:dns')
const process = require('node:process')
const { babel } = require('@rollup/plugin-babel')
const createDemoPlugin = require('./build/vite-plugin-demo')

dns.setDefaultResultOrder('verbatim')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: createDemoPlugin(),
  resolve: {
    // In production site build, we want to import naive-ui from node_modules
    alias:
      process.env.NODE_ENV !== 'production'
        ? [
            {
              find: 'naive-ui',
              replacement: path.resolve(__dirname, './src')
            }
          ]
        : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'process.env.TUSIMPLE': !!process.env.TUSIMPLE,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      '@css-render/plugin-bem',
      'async-validator',
      'css-render',
      'date-fns',
      'date-fns-tz/getTimezoneOffset',
      'evtd',
      'highlight.js',
      'lodash-es',
      'seemly',
      'treemate',
      'vdirs',
      'vooks',
      'vue',
      'vue-router',
      'vueuc',
      '@css-render/vue3-ssr',
      'date-fns-tz',
      'codesandbox/lib/api/define',
      'grapheme-splitter',
      'highlight.js/lib/core',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/xml',
      '@vicons/ionicons5',
      '@vicons/ionicons4',
      '@vicons/fluent/Compose16Regular.js'
    ],
    exclude: ['__INDEX__']
  },
  build: {
    outDir: 'site',
    output: {
      manualChunks: {
        'grapheme-splitter': ['grapheme-splitter'],
        katex: ['katex']
      }
    },
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
