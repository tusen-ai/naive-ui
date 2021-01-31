import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'

export type Key = string | number

// Aligned with Dropdown props, has some redundant
export interface MenuItem {
  key: Key
  disabled?: boolean
  label?: string
  icon?: () => VNodeChild
  children?: Array<MenuItem | MenuItemGroup>
  [key: string]: unknown
  /** @deprecated */
  title?: string | (() => VNodeChild)
  /** @deprecated */
  extra?: string | (() => VNodeChild)
}

export interface MenuItemGroup {
  key: Key
  type: 'group'
  label?: string
  icon?: () => VNodeChild
  children: Array<MenuItem | MenuItemGroup>
  [key: string]: unknown
  /** @deprecated */
  title?: string | (() => VNodeChild)
}

export type TmNode = TreeNode<MenuItem, MenuItemGroup>

export type OnUpdateValue = <T extends string & number & (string | number)>(
  value: T,
  item: MenuItem
) => void
export type OnUpdateKeys = <
  T extends string[] & number[] & Array<string | number>
>(
  keys: T
) => void

export type OnUpdateValueImpl = <T extends string | number | (string | number)>(
  value: T,
  item: MenuItem
) => void
export type OnUpdateKeysImpl = <
  T extends string[] | number[] | Array<string | number>
>(
  keys: T
) => void
