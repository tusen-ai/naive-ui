import type { TmNode, BaseOption } from './interface'
import type { SelectOption } from '../../select'

function traverseWithCallback<T extends { children?: T[] }> (
  options: T[],
  beforeCallback: (node: T) => void,
  afterCallback: (node: T) => void
): void {
  if (Array.isArray(options)) {
    for (const option of options) {
      if (beforeCallback) beforeCallback(option)
      if (option.children) {
        traverseWithCallback(option.children, beforeCallback, afterCallback)
      }
      if (afterCallback) afterCallback(option)
    }
  }
}

function createSelectOptions (
  tmNodes: TmNode[],
  leafOnly: boolean
): Array<SelectOption & { path: BaseOption[] }> {
  const selectOptions: Array<SelectOption & { path: BaseOption[] }> = []
  const path: BaseOption[] = []
  traverseWithCallback(
    tmNodes,
    (tmNode) => {
      if (tmNode.isLeaf || !leafOnly) {
        if (tmNode.disabled) return
        const { rawNode } = tmNode
        path.push(rawNode)
        selectOptions.push({
          label: path.map((rawNodeInPath) => rawNodeInPath.label).join('/'),
          value: rawNode.value,
          path: Array.from(path)
        })
      }
    },
    () => {
      path.pop()
    }
  )
  return selectOptions
}

function getPathLabel (node: TmNode | null, separator: string): string {
  const path = []
  while (node) {
    path.push(node.rawNode.label)
    node = node.parent
  }
  return path.reverse().join(separator)
}

export { traverseWithCallback, createSelectOptions, getPathLabel }
