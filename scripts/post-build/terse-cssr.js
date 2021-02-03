const fs = require('fs').promises
const terseCssr = require('../../build/utils/terse-cssr.js')
const { walk, outDirs } = require('../utils')

exports.terseCssr = async () => {
  for (const dir of outDirs) {
    for await (const p of walk(dir)) {
      if (p.includes('.cssr.js')) {
        const code = await fs.readFile(p, 'utf-8')
        await fs.writeFile(p, terseCssr(code))
      }
    }
  }
}

if (require.main === module) {
  exports.terseCssr()
}
