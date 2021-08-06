import { InjectionKey, Ref } from 'vue'
import { TreeOptionBase } from '../../tree/src/interface'
import { TreeNode } from 'treemate'

export type TreeSelectOption = Omit<
TreeOptionBase,
'checkboxDisabled' | 'isLeaf' | 'children'
> & {
  children?: TreeSelectOption[]
  [k: string]: unknown
}

export interface BaseOption {
  key: string
  isLeaf: Boolean
  level: number
  rawNode: TreeSelectOption
  children?: BaseOption[]
  parent?: BaseOption[]
}

export type TmNode = TreeNode<BaseOption>

export type OnUpdateValue = (
  value: string &
  number &
  (string | number) &
  string[] &
  number[] &
  Array<string | number> &
  null
) => void

export type OnUpdateValueImpl = (
  value:
  | string
  | number
  | (string | number)
  | string[]
  | number[]
  | Array<string | number>
  | null
) => void

export type Value = string | number | Array<string | number> | null

export interface TreeSelectInjection {
  pendingNodeKeyRef: Ref<string | number | null>
}

export const treeSelectInjectionKey: InjectionKey<TreeSelectInjection> =
  Symbol('tree-select')
