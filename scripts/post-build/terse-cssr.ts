import { promises as fs } from 'node:fs'
import { argv } from 'node:process'
import { terseCssr as terseCssrUtil } from '../../build/utils/terse-cssr'
import { outDirs, walk } from '../utils'

export async function terseCssr(): Promise<void> {
  for (const dir of outDirs) {
    for await (const p of walk(dir)) {
      if (p.includes('.cssr.js')) {
        const code = await fs.readFile(p, 'utf-8')
        await fs.writeFile(p, terseCssrUtil(code))
      }
    }
  }
}

if (import.meta.url === `file://${argv[1]}`) {
  terseCssr()
}
