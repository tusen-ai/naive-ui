import { resolve } from 'path'
import { promises as fs, existsSync } from 'fs'
import * as components from '../src/components'

export function parseDeclaration (code) {
  if (!code) {
    return {}
  }
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      (i) => [i[1], i[2]]
    )
  )
}

async function generateComponentsType () {
  const componentsKeys = {}
  Object.keys(components).forEach((key) => {
    const entry = `typeof import('./${key.toLowerCase().slice(1)}')['${key}']`
    if (key.startsWith('N')) {
      componentsKeys[key] = entry
    }
  })
  const originalContent = existsSync(
    resolve(__dirname, '..', 'src', 'components-type.d.ts')
  )
    ? await fs.readFile(
      resolve(__dirname, '..', 'src', 'components-type.d.ts'),
      'utf-8'
    )
    : ''

  const originImports = parseDeclaration(originalContent)
  console.log(originImports)
  const lines = Object.entries({
    ...originImports,
    ...componentsKeys
  })
    .sort((a, b) => a[0].localeCompare(b[0]))
    .filter(([name]) => {
      return componentsKeys[name]
    })
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    })
  const code = `// this is global component declaration
    declare module 'vue' {
      export interface GlobalComponents {
        ${lines.join('\n    ')}
      }
    }
    export { }
    `
  if (code !== originalContent) {
    await fs.writeFile(
      resolve(__dirname, '..', 'src', 'components-type.d.ts'),
      code,
      'utf-8'
    )
  }
}
generateComponentsType()
