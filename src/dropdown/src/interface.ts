import type { TreeNode } from 'treemate'
import type { HTMLAttributes, VNode, VNodeChild } from 'vue'
import type {
  MenuOption,
  MenuGroupOption,
  MenuDividerOption,
  MenuIgnoredOption,
  MenuRenderOption,
  MenuNodeProps
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

export type RenderOption = (info: {
  node: VNode
  option: DropdownOption & DropdownGroupOption
}) => VNodeChild

export type RenderOptionImpl = (info: {
  node: VNode
  option: DropdownOption | DropdownGroupOption
}) => VNodeChild

export type NodeProps = MenuNodeProps
export type DropdownMenuProps = (
  option: DropdownOption | undefined,
  options: Array<DropdownOption | DropdownGroupOption>
) => HTMLAttributes & Record<string, string | number | undefined>
