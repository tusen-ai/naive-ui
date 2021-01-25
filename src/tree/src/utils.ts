import { Key, BaseTreeNode } from './interface'

function traverse (
  nodes: BaseTreeNode[] | undefined,
  callback: (node: BaseTreeNode) => void,
  callbackAfter: (node: BaseTreeNode) => void
): void {
  nodes?.forEach((node) => {
    callback(node)
    traverse(node.children, callback, callbackAfter)
    callbackAfter(node)
  })
}

export function keysWithFilter (
  nodes: BaseTreeNode[],
  pattern: string,
  filter: (pattern: string, node: BaseTreeNode) => boolean
): [Key[], Key[]] {
  const keys = new Set<Key>()
  const highlightKeys = new Set<Key>()
  const path: BaseTreeNode[] = []
  traverse(
    nodes,
    (node) => {
      path.push(node)
      if (filter(pattern, node)) {
        highlightKeys.add(node.key)
        for (let i = path.length - 2; i >= 0; --i) {
          if (!keys.has(path[i].key)) {
            keys.add(path[i].key)
          } else {
            return
          }
        }
      }
    },
    () => {
      path.pop()
    }
  )
  return [Array.from(keys), Array.from(highlightKeys)]
}
