import { generate } from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

// Hack to handle both CJS and ESM imports
const traverseBabel = (traverse as any).default || traverse

export function terseCssr(code: string): string {
  const patternSpace = / +/g
  const patternEnter = /\n+/g

  const ast: any = parse(code, {
    sourceType: 'module'
  })

  traverseBabel(ast, {
    TemplateElement(path: any) {
      ;(['raw', 'cooked'] as const).forEach((type) => {
        path.node.value[type] = path.node.value[type]
          .replace(patternSpace, ' ')
          .replace(patternEnter, '\n')
      })
    }
  })

  return generate(ast).code
}
