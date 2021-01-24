import { TreeMate } from 'treemate'

export type Options = Option[]
export type Option = BaseOption | GroupOption | IgnoredOption

export interface BaseOption {
  value: string | number
  label: string
  disabled?: boolean
  [k: string]: any
}

export interface GroupOption {
  label: string
  name: string
  type: 'group'
  children: BaseOption[]
  [k: string]: any
}

export interface IgnoredOption {
  ignored: true
  value: string | number
  [k: string]: any
}

export type ValueAtom = string | number
export type Value = ValueAtom | string[] | number[] | ValueAtom[]
export type OnUpdateValue = <
  T extends ValueAtom | string[] | number[] | ValueAtom[]
>(
  value: T | null
) => void
export type SelectTreeMate = TreeMate<BaseOption, GroupOption, IgnoredOption>
