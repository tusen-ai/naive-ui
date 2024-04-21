import fs from 'fs/promises'
import { terseCssr as buildTerse } from '../../build/utils/terse-cssr.js'
import { walk, outDirs } from '../utils/index.js'
import url from 'url'

export let terseCssr

terseCssr = async () => {
  for (const dir of outDirs) {
    for await (const p of walk(dir)) {
      if (p.includes('.cssr.js')) {
        const code = await fs.readFile(p, 'utf-8')
        await fs.writeFile(p, buildTerse(code))
      }
    }
  }
}

const self = url.fileURLToPath(import.meta.url)
if (process.argv[1] === self) {
  // someone did `node thisfile.js
  terseCssr = buildTerse()
}
