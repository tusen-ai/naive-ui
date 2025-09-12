const fs = require('node:fs')
const path = require('node:path')
const demoLoader = require('../NaiveUIDemoLoader')

const demoMd = fs
  .readFileSync(path.resolve(__dirname, 'basic.test.md'))
  .toString()
// eslint-disable-next-line no-console
console.log(demoLoader(demoMd))
