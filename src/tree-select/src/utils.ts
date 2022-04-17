import { SelectBaseOption } from '../../select/src/interface'
import { Key } from '../../tree/src/interface'
import { TreeSelectTmNode, TreeSelectOption } from './interface'

export function treeOption2SelectOption (
  tmNode: TreeSelectTmNode,
  labelField: string
): SelectBaseOption {
  const { rawNode } = tmNode
  return {
    ...rawNode,
    label: (rawNode as any)[labelField] as string,
    value: tmNode.key
  }
}

export function treeOption2SelectOptionWithPath (
  tmNode: TreeSelectTmNode,
  path: TreeSelectTmNode[],
  separator: string,
  labelField: string
): SelectBaseOption {
  const { rawNode } = tmNode
  return {
    ...rawNode,
    value: tmNode.key,
    label: path.map((v) => (v.rawNode as any)[labelField]).join(separator)
  }
}

export function filterTree (
  tree: TreeSelectOption[],
  filter: (pattern: string, v: TreeSelectOption) => boolean,
  pattern: string,
  keyField: string,
  childrenField: string
): {
    filteredTree: TreeSelectOption[]
    expandedKeys: Key[]
    highlightKeySet: Set<Key>
  } {
  const visitedTailKeys = new Set<Key>()
  const visitedNonTailKeys = new Set<Key>()
  const highlightKeySet = new Set<Key>()
  const expandedKeys: Key[] = []
  const filteredTree: TreeSelectOption[] = []
  const path: TreeSelectOption[] = []
  function visit (t: TreeSelectOption[]): void {
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
      const children = n[childrenField] as TreeSelectOption[] | undefined
      if (children) {
        visit(children)
      }
      path.pop()
    })
  }
  visit(tree)
  function build (t: TreeSelectOption[], sibs: TreeSelectOption[]): void {
    t.forEach((n) => {
      const key = (n as any)[keyField] as Key
      const isVisitedTail = visitedTailKeys.has(key)
      const isVisitedNonTail = visitedNonTailKeys.has(key)
      if (!isVisitedTail && !isVisitedNonTail) return
      const children = n[childrenField] as TreeSelectOption[] | undefined
      if (children) {
        if (isVisitedTail) {
          // If it is visited path tail, use origin node
          sibs.push(n)
        } else {
          // It it is not visited path tail, use cloned node
          expandedKeys.push(key)
          const clonedNode = { ...n, [childrenField]: [] }
          sibs.push(clonedNode)
          build(children, clonedNode[childrenField] as TreeSelectOption[])
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
