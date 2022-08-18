import { TreeNode } from 'treemate'
import { VNodeChild, HTMLAttributes } from 'vue'

export type Key = string | number

export interface MenuOptionSharedPart {
  key?: Key
  disabled?: boolean
  icon?: () => VNodeChild
  children?: Array<
  MenuOption | MenuGroupOption | MenuDividerOption | MenuSpacerOption
  >
  extra?: string | (() => VNodeChild)
  props?: HTMLAttributes
  [key: string]: unknown
  /** @deprecated */
  titleExtra?: string | (() => VNodeChild)
}

/**
 * @private
 */
export type MenuIgnoredOption =
  | MenuDividerOption
  | MenuSpacerOption
  | MenuRenderOption

export interface MenuSpacerOption {
  type: 'spacer'
  key?: Key
  props?: HTMLAttributes
  [key: string]: unknown
}

export interface MenuDividerOption {
  type: 'divider'
  key?: Key
  props?: HTMLAttributes
  [key: string]: unknown
}

export interface MenuRenderOption {
  type: 'render'
  key?: Key
  props?: HTMLAttributes
  render?: () => VNodeChild
  [key: string]: unknown
}

export interface MenuGroupOptionBase extends MenuOptionSharedPart {
  type: 'group'
  children: Array<MenuOption | MenuDividerOption | MenuSpacerOption>
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

export type MenuMixedOption =
  | MenuDividerOption
  | MenuSpacerOption
  | MenuOption
  | MenuGroupOption

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

export type MenuNodeProps = (
  option: MenuOption | MenuGroupOption
) => HTMLAttributes & Record<string, string | number | undefined>

export interface MenuInst {
  showOption: (key?: Key) => void
}
