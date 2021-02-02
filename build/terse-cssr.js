const fs = require('fs').promises
const path = require('path')
const terseCssr = require('./utils/terse-cssr.js')

const dirs = ['es', 'lib'].map((d) => path.resolve(__dirname, '..', d))

async function * walk (dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield * walk(entry)
    else if (d.isFile()) yield entry
  }
}

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
