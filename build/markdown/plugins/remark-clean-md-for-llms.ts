import type { Code, Root } from 'mdast'
import { visit } from 'unist-util-visit'

export function remarkCleanMdForLlms() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (index == null || !parent)
        return

      if (node.type === 'code' && (node as Code).lang === 'component') {
        parent.children.splice(index, 1)
        return index
      }

      if (node.type === 'html') {
        parent.children.splice(index, 1)
        return index
      }
    })
  }
}
