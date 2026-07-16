import type { Heading, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import { toString } from 'mdast-util-to-string'

export function remarkDocHeader(): Transformer<Root, Root> {
  return (tree, file) => {
    const nodes = tree.children
    const url = (file.data.url as string) || ''

    const titleIndex = nodes.findIndex(
      node => node.type === 'heading' && (node as Heading).depth === 1
    )
    if (titleIndex > -1) {
      const titleText = JSON.stringify(toString(nodes[titleIndex]))
      const btnTemplate = `<doc-header relative-url="${url}" text=${titleText}><\/doc-header>`
      nodes.splice(titleIndex, 1, {
        type: 'html',
        value: btnTemplate
      } as RootContent)
    }
  }
}
