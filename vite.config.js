const path = require('path')

const mdPlugin = require('./demo/vite-plugins/mdPlugin')
console.log(path.resolve(__dirname, './src'))

const i18nTransform = ({ code, query }) => {
  let resource
  resource = JSON.parse(code.trim())
  return `
export default Comp => {
Comp.i18n = ${JSON.stringify(resource || {})}
}`.trim()
}
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
    '__DEV__': process.env === 'development'
  },
  vueCustomBlockTransforms: {
    i18n: i18nTransform
  }
}
