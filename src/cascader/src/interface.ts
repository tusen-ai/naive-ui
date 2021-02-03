import { TreeNode } from 'treemate'
import type { MergedTheme } from '../../_mixins'
import type { NLocale } from '../../locales'
import type { CascaderTheme } from '../styles'

export type ValueAtom = string | number
export type Value = ValueAtom | ValueAtom[]

export type Key = ValueAtom

export interface BaseOption {
  label: string
  value: ValueAtom
  disabled?: boolean
  children?: BaseOption[]
}

export type ExpandTrigger = 'hover' | 'click'

export type TmNode = TreeNode<BaseOption>

export type Filter = (
  pattern: string,
  option: BaseOption,
  path: BaseOption[]
) => boolean

export type OnLoad = (option: BaseOption) => Promise<void>

export type OnUpdateValue = <
  T extends string &
  number &
  string[] &
  number[] &
  Array<string | number> &
  (string | null) &
  (number | null) &
  (string[] | null) &
  (number[] | null) &
  (Array<string | number> | null)
>(
  value: T
) => void

export type OnUpdateValueImpl = (value: Value | null) => void

export type MenuModel = TmNode[][]

export interface CascaderInjection {
  mergedTheme: MergedTheme<CascaderTheme>
  mergedValue: Value | null
  checkedKeys: Key[]
  indeterminateKeys: Key[]
  hoverKeyPath: Key[]
  leafOnly: boolean
  multiple: boolean
  keyboardKey: Key | null
  hoverKey: Key | null
  remote: boolean
  loadingKeySet: Set<Key>
  expandTrigger: ExpandTrigger
  isMounted: boolean
  cascade: boolean
  syncCascaderMenuPosition: () => void
  syncSelectMenuPosition: () => void
  updateKeyboardKey: (value: Key | null) => void
  updateHoverKey: (value: Key | null) => void
  addLoadingKey: (value: Key) => void
  deleteLoadingKey: (value: Key) => void
  onLoad?: (value: BaseOption) => Promise<void>
  doCheck: (value: Key) => void
  doUncheck: (value: Key) => void
  closeMenu: () => void
  handleSelectMenuClickOutside: (e: MouseEvent) => void
  handleCascaderMenuClickOutside: (e: MouseEvent) => void
  locale: NLocale['Cascader']
}

export interface CascaderSubmenuInstance {
  scroll: (index: number, elSize: number) => void
}

export interface CascaderMenuInstance {
  scroll: (depth: number, index: number, elSize: number) => void
  showErrorMessage: (label: string) => void
}

export interface SelectMenuInstance {
  prev: () => void
  next: () => void
  enter: () => boolean
}
