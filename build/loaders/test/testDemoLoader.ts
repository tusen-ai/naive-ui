import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import demoLoader from '../naive-ui-demo-loader'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const demoMd = fs
  .readFileSync(path.resolve(__dirname, 'basic.test.md'))
  .toString()

// eslint-disable-next-line no-console
console.log(demoLoader(demoMd, 'xxx'))
