import type { TmNode, CascaderOption } from './interface'
import type { SelectBaseOption } from '../../select/src/interface'

function getRawNodePath (tmNodes: TmNode[]): CascaderOption[]
function getRawNodePath (tmNodes: TmNode[] | undefined): CascaderOption[] | null
function getRawNodePath (
  tmNodes: TmNode[] | undefined
): CascaderOption[] | null {
  if (!tmNodes) return null
  return tmNodes.map((tmNode) => tmNode.rawNode)
}

export { getRawNodePath }

function createSelectOptions (
  tmNodes: TmNode[],
  checkStrategyIsChild: boolean,
  labelField: string,
  separator: string
): Array<
  SelectBaseOption & { rawNode: CascaderOption, path: CascaderOption[] }
  > {
  const selectOptions: Array<
  SelectBaseOption & { rawNode: CascaderOption, path: CascaderOption[] }
  > = []
  const path: CascaderOption[] = []
  function traverse (_tmNodes: TmNode[]): void {
    for (const tmNode of _tmNodes) {
      if (tmNode.disabled) continue
      const { rawNode } = tmNode
      path.push(rawNode)
      if (tmNode.isLeaf || !checkStrategyIsChild) {
        selectOptions.push({
          label: getPathLabel(tmNode, separator, labelField),
          value: tmNode.key,
          rawNode: tmNode.rawNode,
          path: Array.from(path)
        })
      }
      if (!tmNode.isLeaf && tmNode.children) {
        traverse(tmNode.children)
      }
      path.pop()
    }
  }
  traverse(tmNodes)
  return selectOptions
}

function getPathLabel (
  node: TmNode | null,
  separator: string,
  labelField: string
): string {
  const path: string[] = []
  while (node) {
    path.push((node.rawNode as any)[labelField] as string)
    node = node.parent
  }
  return path.reverse().join(separator)
}

export { createSelectOptions, getPathLabel }
