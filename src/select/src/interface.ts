import { TreeMate } from 'treemate'
import { VNodeChild } from 'vue'

export type Options = Option[]
export type Option = BaseOption | GroupOption | IgnoredOption

export interface BaseOption {
  value: string | number
  label: string
  disabled?: boolean
  render?: (option: BaseOption, selected: boolean) => VNodeChild
  [k: string]: unknown
}

export interface GroupOption {
  type: 'group'
  label: string
  value?: string | number
  children: BaseOption[]
  render?: (option: GroupOption) => VNodeChild
  [k: string]: unknown

  /** @deprecated should use value instead */
  name?: string
}

export interface IgnoredOption {
  type: 'ignored'
  value: string | number
  [k: string]: unknown
}

export type ValueAtom = string | number
export type Value = ValueAtom | string[] | number[] | ValueAtom[]
export type OnUpdateValue = <
  T extends ValueAtom | string[] | number[] | ValueAtom[]
>(
  value: T | null
) => void
export type SelectTreeMate = TreeMate<BaseOption, GroupOption, IgnoredOption>
