const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const createNaiveDemoVitePlugin = require('./build/vite-plugin-demo')

module.exports = {
  root: __dirname,
  plugins: createNaiveDemoVitePlugin(),
  alias: [
    {
      find: 'naive-ui',
      replacement: path.resolve(__dirname, './src')
    }
  ],
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
    ]
  },
  build: {
    outDir: 'site',
    minify: false,
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
          // exclude: 'node_modules/highlight.js/**'
        })
      ]
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
