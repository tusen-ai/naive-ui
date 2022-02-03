import { TreeNode } from 'treemate'
import { Ref } from 'vue'
import { TreeOptionBase } from '../../tree/src/interface'
import { createInjectionKey } from '../../_utils'

export type TreeSelectOption = Omit<
TreeOptionBase,
'checkboxDisabled' | 'isLeaf' | 'children'
> & {
  children?: TreeSelectOption[]
  [k: string]: unknown
}

export type TreeSelectTmNode = TreeNode<TreeSelectOption>

export type OnUpdateValue = (
  value: string &
  number &
    (string | number) &
  string[] &
  number[] &
  Array<string | number> &
  null,
  option: TreeSelectOption &
  null &
  TreeSelectOption[] &
  Array<TreeSelectOption | null>
) => void

export type OnUpdateValueImpl = (
  value:
  | string
  | number
  | (string | number)
  | string[]
  | number[]
  | Array<string | number>
  | null,
  option: TreeSelectOption | null | Array<TreeSelectOption | null>
) => void

export type Value = string | number | Array<string | number> | null

export interface TreeSelectInjection {
  pendingNodeKeyRef: Ref<string | number | null>
}

export const treeSelectInjectionKey =
  createInjectionKey<TreeSelectInjection>('n-tree-select')
