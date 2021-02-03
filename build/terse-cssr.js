const fs = require('fs').promises
const path = require('path')
const terseCssr = require('./utils/terse-cssr.js')
const { walk } = require('../scripts/utils')

const dirs = ['es', 'lib'].map((d) => path.resolve(__dirname, '..', d))

;(async () => {
  for (const dir of dirs) {
    for await (const p of walk(dir)) {
      if (p.includes('.cssr.js')) {
        const code = await fs.readFile(p, 'utf-8')
        await fs.writeFile(p, terseCssr(code))
      }
    }
  }
})()
