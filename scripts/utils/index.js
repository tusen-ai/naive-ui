import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const outDirs = ['es', 'lib'].map((d) =>
  path.resolve(__dirname, '../..', d)
)

export const srcDir = path.resolve(__dirname, '../../src')

export { walk } from './walk.js'
export { replaceDefine } from './replace-define.js'
