import { SelectBaseOption } from '../../select/src/interface'
import { TreeOption, TreeOptions, Key } from '../../tree/src/interface'

export function treeOption2SelectOption (treeOpt: TreeOption): SelectBaseOption {
  return {
    ...treeOpt,
    value: treeOpt.key
  }
}

export function filterTree (
  tree: TreeOptions,
  filter: (pattern: string, v: TreeOption) => boolean,
  pattern: string
): {
    filteredTree: TreeOptions
    highlightKeySet: Set<Key>
  } {
  const visitedTailKeys = new Set<Key>()
  const visitedNonTailKeys = new Set<Key>()
  const highlightKeySet = new Set<Key>()
  const filteredTree: TreeOptions = []
  const path: TreeOptions = []
  function visit (t: TreeOptions): void {
    t.forEach((n) => {
      path.push(n)
      if (filter(pattern, n)) {
        visitedTailKeys.add(n.key)
        highlightKeySet.add(n.key)
        for (let i = path.length - 2; i >= 0; --i) {
          const { key } = path[i]
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
      if (n.children) {
        visit(n.children)
      }
      path.pop()
    })
  }
  visit(tree)
  function build (t: TreeOptions, sibs: TreeOptions): void {
    t.forEach((n) => {
      const { key } = n
      const isVisitedTail = visitedTailKeys.has(key)
      const isVisitedNonTail = visitedNonTailKeys.has(key)
      if (!isVisitedTail && !isVisitedNonTail) return
      const { children } = n
      if (children) {
        if (isVisitedTail) {
          // If it is visited path tail, use origin node
          sibs.push(n)
        } else {
          // It it is not visited path tail, use cloned node
          const clonedNode = { ...n, children: [] }
          sibs.push(clonedNode)
          build(children, clonedNode.children)
        }
      } else {
        sibs.push(n)
      }
    })
  }
  build(tree, filteredTree)
  return {
    filteredTree,
    highlightKeySet
  }
}
