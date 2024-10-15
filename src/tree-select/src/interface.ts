import type { TreeMate, TreeNode } from 'treemate'
import type { HTMLAttributes, Ref, VNodeChild } from 'vue'
import type { TreeOption, TreeOptionBase } from '../../tree/src/interface'
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
      Array<TreeSelectOption | null>,
  meta:
    | {
      node: TreeSelectOption
      action: 'select' | 'unselect'
    }
    | {
      node: TreeSelectOption | null
      action: 'delete'
    }
    | {
      node: null
      action: 'clear'
    }
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
  option: TreeSelectOption | null | Array<TreeSelectOption | null>,
  meta:
    | {
      node: TreeSelectOption
      action: 'select' | 'unselect'
    }
    | {
      node: TreeSelectOption | null
      action: 'delete'
    }
    | {
      node: null
      action: 'clear'
    }
) => void

export type OnUpdateIndeterminateKeysImpl = (
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
  dataTreeMate: Ref<TreeMate<TreeOption>>
}

export const treeSelectInjectionKey
  = createInjectionKey<TreeSelectInjection>('n-tree-select')

export type TreeSelectRenderTag = (props: {
  option: TreeSelectOption
  handleClose: () => void
}) => VNodeChild

export interface TreeSelectRenderProps {
  option: TreeSelectOption
  checked: boolean
  selected: boolean
}

export type TreeSelectRenderTreePart = ({
  option,
  checked,
  selected
}: TreeSelectRenderProps) => VNodeChild

export type TreeSelectRenderLabel = TreeSelectRenderTreePart

export type TreeSelectRenderPrefix = TreeSelectRenderTreePart

export type TreeSelectRenderSuffix = TreeSelectRenderTreePart

export type TreeSelectNodeProps = (info: {
  option: TreeSelectOption
}) => HTMLAttributes & Record<string, unknown>

export interface TreeSelectInst {
  getCheckedData: () => {
    keys: Array<string | number>
    options: Array<TreeSelectOption | null>
  }
  getIndeterminateData: () => {
    keys: Array<string | number>
    options: Array<TreeSelectOption | null>
  }
  focus: () => void
  focusInput: () => void
  blur: () => void
  blurInput: () => void
}
