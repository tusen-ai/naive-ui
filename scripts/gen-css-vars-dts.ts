import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { walk } from './utils'
import { collectVars, genDts } from './utils/collect-vars'

const srcPath = path.resolve(process.cwd(), 'src')

;(async () => {
  for await (const p of walk(srcPath)) {
    if (p.endsWith('.cssr.ts')) {
      const dts = genDts(collectVars(await fs.readFile(p, 'utf-8')))
      console.log(p, dts)
    }
  }
})()
