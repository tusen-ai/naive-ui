import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'
import {
  MenuOption,
  MenuGroupOption,
  MenuDividerOption,
  MenuIgnoredOption,
  MenuRenderOption
} from '../../menu/src/interface'

export type Key = string | number

// Aligned with MenuOption props, has some redundant fields
export type DropdownOption = MenuOption
export type DropdownGroupOption = MenuGroupOption
export type DropdownDividerOption = MenuDividerOption
export type DropdownRenderOption = MenuRenderOption
export type DropdownMixedOption =
  | DropdownOption
  | DropdownGroupOption
  | DropdownDividerOption
  | DropdownRenderOption

export type DropdownIgnoredOption = MenuIgnoredOption

export type DropdownIntersectionOption = DropdownOption & DropdownGroupOption

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
