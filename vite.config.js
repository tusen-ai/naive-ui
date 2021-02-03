const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const createDemoPlugin = require('./build/vite-plugin-demo')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: createDemoPlugin(),
  alias:
    // In production site build, we want to import naive-ui from node_modules
    process.env.NODE_ENV !== 'production'
      ? [
        {
          find: 'naive-ui',
          replacement: path.resolve(__dirname, './src')
        }
      ]
      : undefined,
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      'highlight.js/lib/core',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      '@vicons/fluent/Compose16Regular.js',
      'date-fns/locale'
    ],
    exclude: ['__INDEX__']
  },
  build: {
    outDir: 'site',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
