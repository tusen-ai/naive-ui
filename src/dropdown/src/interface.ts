import { TreeNode } from 'treemate'
import { VNodeChild, HTMLAttributes } from 'vue'
import { MenuOption, MenuGroupOption } from '../../menu/src/interface'

export type Key = string | number

export type DropdownOptionProps = HTMLAttributes

// Aligned with MenuOption props, has some redundant fields
export type DropdownOption = MenuOption & { props?: HTMLAttributes }
export type DropdownGroupOption = MenuGroupOption & {
  props?: HTMLAttributes
}
export interface DropdownIgnoredOption {
  key: Key
  type: 'ignored' | 'divider'
  props?: HTMLAttributes
  [key: string]: unknown
}

export type DropdownMixedOption =
  | DropdownOption
  | DropdownGroupOption
  | DropdownIgnoredOption

export type DropdownIntersectionOption = DropdownOption &
DropdownGroupOption &
DropdownIgnoredOption

export interface DropdownDividerOption {
  key: Key
  type: 'divider'
  [key: string]: unknown
}

export type TmNode = TreeNode<
DropdownOption,
DropdownGroupOption,
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

export type RenderLabelImpl = (option: DropdownMixedOption) => VNodeChild

export type RenderLabel = (option: DropdownIntersectionOption) => VNodeChild

export type RenderIconImpl = (option: DropdownMixedOption) => VNodeChild

export type RenderIcon = (option: DropdownIntersectionOption) => VNodeChild
