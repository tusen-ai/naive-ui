import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import packageJson from '../package.json' with { type: 'json' }

writeFileSync(
  resolve(cwd(), 'src', 'version.ts'),
  `export default '${packageJson.version}'\n`
)
