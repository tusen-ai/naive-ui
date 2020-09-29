const path = require('path')

module.exports = {
  root: __dirname,
  alias: {
    'naive-ui/lib/icons': path.resolve(__dirname, '../src/_icons'),
    'naive-ui': path.resolve(__dirname, '../src/index.js'),
    'src': path.resolve(__dirname, '../src')
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    '__DEV__': process.env === 'development'
  }
}
