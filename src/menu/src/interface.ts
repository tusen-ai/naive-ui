import { TreeNode } from 'treemate'
import { VNodeChild, HTMLAttributes } from 'vue'

export type Key = string | number

export type MenuOptionProps = HTMLAttributes

export interface MenuOptionSharedPart {
  key?: Key
  disabled?: boolean
  icon?: () => VNodeChild
  children?: Array<MenuOption | MenuGroupOption>
  extra?: string | (() => VNodeChild)
  props?: HTMLAttributes
  [key: string]: unknown
  /** @deprecated */
  titleExtra?: string | (() => VNodeChild)
}

export interface MenuIgnoredOption extends MenuOptionSharedPart {
  type: 'ignored' | 'divider'
}

export interface MenuDividerOption extends MenuOptionSharedPart {
  type: 'divider'
}

export interface MenuRenderOption extends MenuOptionSharedPart {
  type: 'render'
  render: () => VNodeChild
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
  | MenuRenderOption

export type MenuGroupOption =
  | (MenuGroupOptionBase & {
    /** @deprecated */
    title?: string | (() => VNodeChild)
  })
  | (MenuGroupOptionBase & { label?: string | (() => VNodeChild) })

export type MenuMixedOption = MenuOption | MenuGroupOption | MenuIgnoredOption

export type TmNode = TreeNode<MenuOption, MenuGroupOption, MenuIgnoredOption>

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
