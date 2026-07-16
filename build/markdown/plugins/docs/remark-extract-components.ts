import type { Code, Root } from 'mdast'
import type { Transformer } from 'unified'

export interface ComponentInfo {
  ids: string[]
  importStmt: string
}

export function remarkExtractComponents(): Transformer<Root, Root> {
  return (tree, file) => {
    const nodes = tree.children
    const componentsIndex = nodes.findIndex(
      node => node.type === 'code' && (node as Code).lang === 'component'
    )

    let components: ComponentInfo[] = []
    if (~componentsIndex) {
      const node = nodes[componentsIndex] as Code
      components = node.value
        .split('\n')
        .map((component) => {
          const [ids, importStmt] = component.split(':')
          if (!ids.trim())
            throw new Error('No component id')
          if (!importStmt.trim())
            throw new Error('No component source url')
          return {
            ids: ids.split(',').map(id => id.trim()),
            importStmt: importStmt.trim()
          }
        })
        .filter(({ ids, importStmt }) => ids && importStmt)
      nodes.splice(componentsIndex, 1)
    }

    file.data.components = components
  }
}
