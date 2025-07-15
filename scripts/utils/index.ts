import { promises as fs } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'

export async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = join(dir, d.name)
    if (d.isDirectory()) {
      yield * walk(entry)
    }
    else if (d.isFile()) {
      yield entry
    }
  }
}

export const outDirs = ['es', 'lib'].map(d => resolve(process.cwd(), d))

export const srcDir = resolve(process.cwd(), 'src')

export { replaceDefine } from './replace-define'
