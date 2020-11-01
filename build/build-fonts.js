const path = require('path')
const ncp = require('ncp')

ncp(
  path.resolve(__dirname, '../src/fonts/assets'),
  path.resolve(__dirname, '../fonts/assets')
)
