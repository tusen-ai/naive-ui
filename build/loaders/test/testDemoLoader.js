const demoLoader = require('../NaiveUIDemoLoader')
const fs = require('fs')
const path = require('path')

const demoMd = fs.readFileSync(path.resolve(__dirname, 'basic.test.md')).toString()
console.log(demoLoader(demoMd))
