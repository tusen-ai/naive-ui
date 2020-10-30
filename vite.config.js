const path = require('path')

const mdPlugin = require('./demo/vite-plugins/mdPlugin')

module.exports = {
  root: __dirname,
  plugins: [ mdPlugin() ],
  optimizeDeps: {
    include: ['highlight.js/lib/languages/cpp', 'highlight.js/lib/highlight',
      'highlight.js/lib/languages/javascript', 'highlight.js/lib/languages/python', 'vooks']
  },
  alias: {
    '/@naive-ui/lib/icons/': path.resolve(__dirname, './src/_icons'),
    '/@naive-ui/': path.resolve(__dirname, './src'),
    'src': path.resolve(__dirname, './src')
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    '__DEV__': process.env !== 'production'
  }
}
