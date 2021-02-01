import { TreeMate } from 'treemate'
import { CSSProperties, VNodeChild } from 'vue'

export type SelectMixedOption =
  | SelectOption
  | SelectGroupOption
  | SelectIgnoredOption
export interface SelectOption {
  value: string | number
  label: string
  class?: string
  style?: string | CSSProperties
  disabled?: boolean
  render?: (option: SelectOption, selected: boolean) => VNodeChild
  [k: string]: unknown
}

interface SelectGroupOptionBase {
  label: string
  type: 'group'
  children: SelectOption[]
  render?: (option: SelectGroupOption) => VNodeChild
  [k: string]: unknown
}

export type SelectGroupOption =
  | (SelectGroupOptionBase & {
    /** @deprecated should use value instead */
    name?: string
  })
  | (SelectGroupOptionBase & {
    value?: string | number
  })

export interface SelectIgnoredOption {
  type: 'ignored'
  value: string | number
  [k: string]: unknown
}

export type ValueAtom = string | number
export type Value = ValueAtom | string[] | number[] | ValueAtom[]
export type OnUpdateValue = <
  T extends ValueAtom &
  string[] &
  number[] &
  ValueAtom[] &
  (ValueAtom | null) &
  (string[] | null) &
  (number[] | null) &
  (ValueAtom[] | null)
>(
  value: T
) => void
export type OnUpdateValueImpl = <
  T extends
  | ValueAtom
  | string[]
  | number[]
  | ValueAtom[]
  | (ValueAtom | null)
  | (string[] | null)
  | (number[] | null)
  | (ValueAtom[] | null)
>(
  value: T
) => void
export type SelectTreeMate = TreeMate<
SelectOption,
SelectGroupOption,
SelectIgnoredOption
>
