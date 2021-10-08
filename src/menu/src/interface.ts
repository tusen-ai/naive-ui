import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'

export type Key = string | number

export interface MenuOptionSharedPart {
  key?: Key
  disabled?: boolean
  icon?: () => VNodeChild
  children?: Array<MenuOption | MenuGroupOption>
  extra?: string | (() => VNodeChild)
  [key: string]: unknown
  /** @deprecated */
  titleExtra?: string | (() => VNodeChild)
}

export interface MenuGroupOptionBase extends MenuOptionSharedPart {
  type: 'group'
  children?: Array<MenuOption | MenuGroupOption>
}

export type MenuOption =
  | (MenuOptionSharedPart & {
    /** @deprecated */
    title?: string | (() => VNodeChild)
  })
  | (MenuOptionSharedPart & { label?: string | (() => VNodeChild) })

export type MenuGroupOption =
  | (MenuGroupOptionBase & {
    /** @deprecated */
    title?: string | (() => VNodeChild)
  })
  | (MenuGroupOptionBase & { label?: string | (() => VNodeChild) })

export type TmNode = TreeNode<MenuOption, MenuGroupOption>

export type OnUpdateValue = (
  value: string & number & (string | number),
  item: MenuOption
) => void

export type OnUpdateKeys = (
  keys: string[] & number[] & Array<string | number>
) => void

export type OnUpdateValueImpl = (
  value: string | number | (string | number),
  item: MenuOption
) => void

export type OnUpdateKeysImpl = (
  keys: string[] | number[] | Array<string | number>
) => void
