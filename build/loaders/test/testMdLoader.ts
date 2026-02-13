import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdLoader from '../naive-ui-doc-loader'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const content = fs
  .readFileSync(path.resolve(__dirname, '../../../CHANGELOG.zh-CN.md'))
  .toString()

mdLoader(content, 'xxx').then((result) => {
  // eslint-disable-next-line no-console
  console.log(result)
})
