import { TreeNode } from 'treemate'
import { MenuOption, MenuGroupOption } from '../../menu/src/interface'

export type Key = string | number

// Aligned with MenuItem props, has some redundant fields
export type DropdownOption = MenuOption
export type DropdownGroupOption = MenuGroupOption
export interface DropdownIgnoredOption {
  key: Key
  type: 'ignored' | 'divider'
  [key: string]: unknown
}
export type DropdownMixedOption =
  | DropdownOption
  | DropdownGroupOption
  | DropdownIgnoredOption

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
