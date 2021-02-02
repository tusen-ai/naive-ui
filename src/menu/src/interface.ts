import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'

export type Key = string | number

export interface MenuOptionBase {
  key: Key
  disabled?: boolean
  icon?: () => VNodeChild
  children?: Array<MenuOption | MenuGroupOption>
  extra?: string
  [key: string]: unknown
}

export interface MenuGroupOptionBase extends MenuOptionBase {
  type: 'group'
  children: Array<MenuOption | MenuGroupOption>
}

export type MenuOption =
  | (MenuOptionBase & {
    /** @deprecated */
    title: string | (() => VNodeChild)
  })
  | (MenuOptionBase & { label: string | (() => VNodeChild) })

export type MenuGroupOption =
  | (MenuGroupOptionBase & {
    /** @deprecated */
    title: string | (() => VNodeChild)
  })
  | (MenuGroupOptionBase & { label: string | (() => VNodeChild) })

export type TmNode = TreeNode<MenuOption, MenuGroupOption>

export type OnUpdateValue = <T extends string & number & (string | number)>(
  value: T,
  item: MenuOption
) => void
export type OnUpdateKeys = <
  T extends string[] & number[] & Array<string | number>
>(
  keys: T
) => void

export type OnUpdateValueImpl = <T extends string | number | (string | number)>(
  value: T,
  item: MenuOption
) => void
export type OnUpdateKeysImpl = <
  T extends string[] | number[] | Array<string | number>
>(
  keys: T
) => void
