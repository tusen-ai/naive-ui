import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import * as globalComponents from '../src/components'

const TYPE_ROOT = process.cwd()

// XButton is for tsx type checking, shouldn't be exported
const excludeComponents: string[] = ['NxButton']

function exist(path: string): boolean {
  return existsSync(path)
}

function parseComponentsDeclaration(code: string): Record<string, string> {
  if (!code) {
    return {}
  }
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      (i: string[]) => [i[1], i[2]]
    )
  )
}

async function generateComponentsType(): Promise<void> {
  const components: Record<string, string> = {}
  Object.keys(globalComponents).forEach((key: string) => {
    const entry = `(typeof import('naive-ui'))['${key}']`
    if (key.startsWith('N') && !excludeComponents.includes(key)) {
      components[key] = entry
    }
  })
  const originalContent = exist(path.resolve(TYPE_ROOT, 'volar.d.ts'))
    ? await readFile(path.resolve(TYPE_ROOT, 'volar.d.ts'), 'utf-8')
    : ''
  const originImports = parseComponentsDeclaration(originalContent)
  const lines = Object.entries({
    ...originImports,
    ...components
  })
    .filter(([name]: [string, string]) => {
      return components[name]
    })
    .map(([name, v]: [string, string]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    })
  const code = `// Auto generated component declarations
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
  }
}
export {}
`

  if (code !== originalContent) {
    await writeFile(path.resolve(TYPE_ROOT, 'volar.d.ts'), code, 'utf-8')
  }
}

generateComponentsType()
