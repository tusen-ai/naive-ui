import fs from 'fs-extra'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkgJson = fs.readFileSync(
  resolve(__dirname, '..', 'package.json'),
  'utf-8'
)
const rawJson = JSON.parse(pkgJson)
const { version } = rawJson

fs.writeFileSync(
  resolve(__dirname, '..', 'src', 'version.ts'),
  `export default '${version}'\n`
)
