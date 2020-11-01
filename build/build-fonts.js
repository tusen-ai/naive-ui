const path = require('path')
const ncp = require('ncp')

ncp(
  path.resolve(__dirname, '../src/fonts'),
  path.resolve(__dirname, '../fonts')
)
