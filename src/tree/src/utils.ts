import { computed, ComputedRef } from 'vue'
import { CheckStrategy } from 'treemate'
import { isBrowser } from '../../_utils'
import { Key, TmNode, TreeOption } from './interface'

export function useMergedCheckStrategy (props: {
  leafOnly: boolean
  checkStrategy: CheckStrategy
}): ComputedRef<CheckStrategy> {
  return computed(() => (props.leafOnly ? 'child' : props.checkStrategy))
}

export function isNodeDisabled (node: TmNode, disabledField: string): boolean {
  return !!(node.rawNode as any)[disabledField]
}

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
if (isBrowser && Image) {
  const emptyImage = new Image()
  emptyImage.src =
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
}

export { emptyImage }

export function filterTree (
  tree: TreeOption[],
  filter: (pattern: string, v: TreeOption) => boolean,
  pattern: string,
  keyField: string,
  childrenField: string
): {
    filteredTree: TreeOption[]
    expandedKeys: Key[]
    highlightKeySet: Set<Key>
  } {
  const visitedTailKeys = new Set<Key>()
  const visitedNonTailKeys = new Set<Key>()
  const highlightKeySet = new Set<Key>()
  const expandedKeys: Key[] = []
  const filteredTree: TreeOption[] = []
  const path: TreeOption[] = []
  function visit (t: TreeOption[]): void {
    t.forEach((n) => {
      path.push(n)
      if (filter(pattern, n)) {
        visitedTailKeys.add((n as any)[keyField] as Key)
        highlightKeySet.add((n as any)[keyField] as Key)
        for (let i = path.length - 2; i >= 0; --i) {
          const key: Key = (path[i] as any)[keyField]
          if (!visitedNonTailKeys.has(key)) {
            visitedNonTailKeys.add(key)
            if (visitedTailKeys.has(key)) {
              visitedTailKeys.delete(key)
            }
          } else {
            break
          }
        }
      }
      const children = n[childrenField] as TreeOption[] | undefined
      if (children) {
        visit(children)
      }
      path.pop()
    })
  }
  visit(tree)
  function build (t: TreeOption[], sibs: TreeOption[]): void {
    t.forEach((n) => {
      const key = (n as any)[keyField] as Key
      const isVisitedTail = visitedTailKeys.has(key)
      const isVisitedNonTail = visitedNonTailKeys.has(key)
      if (!isVisitedTail && !isVisitedNonTail) return
      const children = n[childrenField] as TreeOption[] | undefined
      if (children) {
        if (isVisitedTail) {
          // If it is visited path tail, use origin node
          sibs.push(n)
        } else {
          // It it is not visited path tail, use cloned node
          expandedKeys.push(key)
          const clonedNode = { ...n, [childrenField]: [] }
          sibs.push(clonedNode)
          build(children, clonedNode[childrenField] as TreeOption[])
        }
      } else {
        sibs.push(n)
      }
    })
  }
  build(tree, filteredTree)
  return {
    filteredTree,
    highlightKeySet,
    expandedKeys
  }
}
