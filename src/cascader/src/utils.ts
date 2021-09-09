import type { TmNode, CascaderOption } from './interface'
import type { SelectBaseOption } from '../../select/src/interface'

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
  checkStrategyIsChild: boolean
): Array<SelectBaseOption & { path: CascaderOption[] }> {
  const selectOptions: Array<SelectBaseOption & { path: CascaderOption[] }> = []
  const path: CascaderOption[] = []
  traverseWithCallback(
    tmNodes,
    (tmNode) => {
      if (tmNode.isLeaf || !checkStrategyIsChild) {
        if (tmNode.disabled) return
        const { rawNode } = tmNode
        path.push(rawNode)
        selectOptions.push({
          label: path.map((rawNodeInPath) => rawNodeInPath.label).join('/'),
          value: tmNode.key,
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

function getPathLabel (
  node: TmNode | null,
  separator: string,
  labelField: string
): string {
  const path: string[] = []
  while (node) {
    path.push((node.rawNode as any)[labelField])
    node = node.parent
  }
  return path.reverse().join(separator)
}

export { traverseWithCallback, createSelectOptions, getPathLabel }
