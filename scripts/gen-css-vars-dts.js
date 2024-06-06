import fs from 'fs/promises'
import path, { dirname } from 'path'
import { genDts, collectVars } from './utils/collect-vars'
import { walk } from './utils/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const srcPath = path.resolve(__dirname, '..', 'src')

;(async () => {
  for await (const p of walk(srcPath)) {
    if (p.endsWith('.cssr.ts')) {
      const dts = genDts(collectVars(await fs.readFile(p, 'utf-8')))
      console.log(p, dts)
    }
  }
})()
