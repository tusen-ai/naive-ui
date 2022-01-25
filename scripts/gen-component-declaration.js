import * as globalComponents from '../src/components'
import { resolve } from 'path'
import fs from 'fs-extra'

const TYPE_ROOT = resolve(__dirname, '..')

function exist (path) {
  return fs.existsSync(path)
}

function parseComponentsDeclaration (code) {
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
  const components = {}
  Object.keys(globalComponents).forEach((key) => {
    const entry = `typeof import('naive-ui')['${key}']`
    if (key.startsWith('N')) {
      components[key] = entry
    }
  })
  const originalContent = exist(resolve(TYPE_ROOT, 'volar.d.ts'))
    ? await fs.readFile(resolve(TYPE_ROOT, 'volar.d.ts'), 'utf-8')
    : ''

  const originImports = parseComponentsDeclaration(originalContent)
  const lines = Object.entries({
    ...originImports,
    ...components
  })
    .filter(([name]) => {
      return components[name]
    })
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    })
  const code = `// Auto generated component declarations
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
    [key: string]: any
  }
}
export {}
`
  if (code !== originalContent) {
    await fs.writeFile(resolve(TYPE_ROOT, 'volar.d.ts'), code, 'utf-8')
  }
}
generateComponentsType()
