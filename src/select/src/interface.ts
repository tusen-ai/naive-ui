import { TreeMate } from 'treemate'
import { CSSProperties, VNodeChild } from 'vue'

export type SelectMixedOption =
  | SelectBaseOption
  | SelectGroupOption
  | SelectIgnoredOption

export interface SelectBaseOption<V = string | number> {
  value: V
  /** label doesn't support render function since it will be used in callbacks */
  label: string
  class?: string
  style?: string | CSSProperties
  disabled?: boolean
  render?: (option: SelectBaseOption<V>, selected: boolean) => VNodeChild
  [k: string]: unknown
}

export interface SelectGroupOptionBase {
  /** label doesn't support render function since it will be used in callbacks */
  label: string
  type: 'group'
  children: SelectBaseOption[]
  render?: (option: SelectGroupOption) => VNodeChild
  [k: string]: unknown
}

export type SelectGroupOption =
  | (SelectGroupOptionBase & {
    /** @deprecated should use key and label instead */
    name?: string
  })
  | (SelectGroupOptionBase & {
    key: string | number
  })

export interface SelectIgnoredOption {
  type: 'ignored'
  value: string | number
  [k: string]: unknown
}

export type ValueAtom = string | number
export type Value = ValueAtom | string[] | number[] | ValueAtom[]
export type OnUpdateValue = (
  value: string &
  number &
  ValueAtom &
  string[] &
  number[] &
  ValueAtom[] &
  (ValueAtom | null) &
  (string[] | null) &
  (number[] | null) &
  (ValueAtom[] | null)
) => void
export type OnUpdateValueImpl = (
  value:
  | ValueAtom
  | string[]
  | number[]
  | ValueAtom[]
  | (ValueAtom | null)
  | (string[] | null)
  | (number[] | null)
  | (ValueAtom[] | null)
) => void
export type SelectTreeMate = TreeMate<
SelectBaseOption,
SelectGroupOption,
SelectIgnoredOption
>

export type Size = 'small' | 'medium' | 'large'
