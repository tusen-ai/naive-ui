import { type SelectBaseOption } from '../../select/src/interface'
import { type TreeSelectTmNode } from './interface'

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
