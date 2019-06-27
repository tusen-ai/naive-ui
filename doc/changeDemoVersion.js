const fs = require('fs')
const path = require('path')

const demoPath = path.resolve(__dirname, '../demo/demo.vue')
const demoPage = fs.readFileSync(demoPath).toString()
const version = require('../package.json').version
const newDemoPage = demoPage.replace(/name="NAIVE UI \(.*?\)"/, `name="NAIVE UI (${version})"`)
fs.writeFileSync(demoPath, newDemoPage)
