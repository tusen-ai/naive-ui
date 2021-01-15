import { Key, KeyedRawNode } from 'treemate'

function traverse (
  nodes: KeyedRawNode[] | undefined,
  callback: (node: KeyedRawNode) => void,
  callbackAfter: (node: KeyedRawNode) => void
) {
  nodes &&
    nodes.forEach((node) => {
      callback(node)
      traverse(node.children, callback, callbackAfter)
      callbackAfter && callbackAfter(node)
    })
}

export function keysWithFilter (
  nodes: KeyedRawNode[],
  pattern: string,
  filter: (pattern: string, node: KeyedRawNode) => boolean
): [Key[], Key[]] {
  const keys = new Set<Key>()
  const highlightKeys = new Set<Key>()
  const path: KeyedRawNode[] = []
  traverse(
    nodes,
    (node) => {
      path.push(node)
      if (filter(pattern, node)) {
        highlightKeys.add(node.key as Key)
        for (let i = path.length - 2; i >= 0; --i) {
          if (!keys.has(path[i].key as Key)) {
            keys.add(path[i].key as Key)
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
