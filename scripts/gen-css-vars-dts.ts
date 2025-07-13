import { promises as fs } from 'node:fs'
import path, { dirname } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { walk } from './utils'
import { collectVars, genDts } from './utils/collect-vars'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const srcPath = path.resolve(process.cwd(), 'src')

;(async () => {
  for await (const p of walk(srcPath)) {
    if (p.endsWith('.cssr.ts')) {
      const dts = genDts(collectVars(await fs.readFile(p, 'utf-8')))
      console.log(p, dts)
    }
  }
})()
