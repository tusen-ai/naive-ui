import { Key, TreeOption } from './interface'

function traverse (
  nodes: TreeOption[] | undefined,
  callback: (node: TreeOption) => void,
  callbackAfter: (node: TreeOption) => void
): void {
  nodes?.forEach((node) => {
    callback(node)
    traverse(node.children, callback, callbackAfter)
    callbackAfter(node)
  })
}

export function keysWithFilter (
  nodes: TreeOption[],
  pattern: string,
  filter: (pattern: string, node: TreeOption) => boolean
): [Key[], Key[]] {
  const keys = new Set<Key>()
  const highlightKeys = new Set<Key>()
  const path: TreeOption[] = []
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

const emptyImage: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  const emptyImage = new Image()
  emptyImage.src =
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
}

export { emptyImage }
