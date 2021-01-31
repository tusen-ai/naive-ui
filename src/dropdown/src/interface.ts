import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'

export type Key = string | number

// Aligned with MenuItem props, has some redundant fields
export interface DropdownOption {
  key: Key
  disabled?: boolean
  label?: string
  icon?: () => VNodeChild
  children?: Array<DropdownOption | DropdownGroup>
  [key: string]: unknown
  /** @deprecated */
  title?: string | (() => VNodeChild)
  /** @deprecated */
  extra?: string | (() => VNodeChild)
}

export interface DropdownGroup {
  key: Key
  type: 'group'
  label?: string
  icon?: () => VNodeChild
  children: Array<DropdownOption | DropdownGroup>
  [key: string]: unknown
  /** @deprecated */
  title?: string | (() => VNodeChild)
}

export interface DropdownIgnoredOption {
  key: Key
  type: 'ignored' | 'divider'
  [key: string]: unknown
}

export interface DropdownDividerOption {
  key: Key
  type: 'divider'
  [key: string]: unknown
}

export type TmNode = TreeNode<
DropdownOption,
DropdownGroup,
DropdownIgnoredOption
>

export type OnUpdateValue = <T extends string & number & (string | number)>(
  value: T,
  option: DropdownOption
) => void
export type OnUpdateKeys = <
  T extends string[] & number[] & Array<string | number>
>(
  keys: T
) => void

export type OnUpdateValueImpl = <T extends string | number | (string | number)>(
  value: T,
  option: DropdownOption
) => void
export type OnUpdateKeysImpl = <
  T extends string[] | number[] | Array<string | number>
>(
  keys: T
) => void
