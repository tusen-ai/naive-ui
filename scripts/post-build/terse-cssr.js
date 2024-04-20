import fs from 'fs/promises'
import { terseCssr } from './terse-cssr'
import { walk, outDirs } from '../utils'

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

if (import.meta.main === module) {
  exports.terseCssr()
}
