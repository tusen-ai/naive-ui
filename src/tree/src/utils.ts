import { Key, TreeOption } from './interface'

function traverse (
  nodes: TreeOption[] | undefined,
  childrenField: string,
  callback: (node: TreeOption) => void,
  callbackAfter: (node: TreeOption) => void
): void {
  nodes?.forEach((node) => {
    callback(node)
    traverse(
      (node as any)[childrenField],
      childrenField,
      callback,
      callbackAfter
    )
    callbackAfter(node)
  })
}

export function keysWithFilter (
  nodes: TreeOption[],
  pattern: string,
  keyField: string,
  childrenField: string,
  filter: (pattern: string, node: TreeOption) => boolean
): {
    expandedKeys: Key[]
    highlightKeySet: Set<Key>
  } {
  const keys = new Set<Key>()
  const highlightKeySet = new Set<Key>()
  const path: TreeOption[] = []
  traverse(
    nodes,
    childrenField,
    (node) => {
      path.push(node)
      if (filter(pattern, node)) {
        highlightKeySet.add((node as any)[keyField])
        for (let i = path.length - 2; i >= 0; --i) {
          if (!keys.has((path[i] as any)[keyField])) {
            keys.add((path[i] as any)[keyField])
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
  return {
    expandedKeys: Array.from(keys),
    highlightKeySet
  }
}

const emptyImage: HTMLImageElement | null = null
if (typeof window !== 'undefined' && Image) {
  const emptyImage = new Image()
  emptyImage.src =
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
}

export { emptyImage }
