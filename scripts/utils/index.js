import fs from 'fs/promises'
import path from 'path'

export const walk = async function * walk (dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name)
    if (d.isDirectory()) yield * walk(entry)
    else if (d.isFile()) yield entry
  }
}

export const outDirs = ['es', 'lib'].map((d) =>
  path.resolve(__dirname, '../..', d)
)
export const srcDir = path.resolve(__dirname, '../../src')

export const replaceDefine = require('./replace-define').replaceDefine
