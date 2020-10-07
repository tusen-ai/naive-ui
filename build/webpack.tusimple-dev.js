module.exports = Object.assign(
  {},
  require('./webpack.dev'),
  { entry: './demo/tusimple-dev-index.js' }
)
