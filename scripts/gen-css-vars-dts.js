const fs = require('fs').promises
const path = require('path')
const { genDts, collectVars } = require('./utils/collect-vars')
const { walk } = require('./utils')

const srcPath = path.resolve(__dirname, '..', 'src')

;(async () => {
  for await (const p of walk(srcPath)) {
    if (p.endsWith('.cssr.ts')) {
      const dts = genDts(collectVars(await fs.readFile(p, 'utf-8')))
      console.log(p, dts)
    }
  }
})()
