import { TreeNode } from 'treemate'
import type { MergedTheme } from '../../_mixins'
import type { NLocale } from '../../locales'
import type { CascaderTheme } from '../styles'
import { InjectionKey, Ref } from 'vue'

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
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<CascaderTheme>>
  mergedValueRef: Ref<Value | null>
  checkedKeysRef: Ref<Key[]>
  indeterminateKeysRef: Ref<Key[]>
  hoverKeyPathRef: Ref<Key[]>
  leafOnlyRef: Ref<boolean>
  multipleRef: Ref<boolean>
  keyboardKeyRef: Ref<Key | null>
  hoverKeyRef: Ref<Key | null>
  remoteRef: Ref<boolean>
  loadingKeySetRef: Ref<Set<Key>>
  expandTriggerRef: Ref<ExpandTrigger>
  isMountedRef: Ref<boolean>
  cascadeRef: Ref<boolean>
  onLoadRef: Ref<((value: BaseOption) => Promise<void>) | undefined>
  localeRef: Ref<NLocale['Cascader']>
  virtualScrollRef: Ref<boolean>
  optionHeightRef: Ref<string>
  syncCascaderMenuPosition: () => void
  syncSelectMenuPosition: () => void
  updateKeyboardKey: (value: Key | null) => void
  updateHoverKey: (value: Key | null) => void
  addLoadingKey: (value: Key) => void
  deleteLoadingKey: (value: Key) => void
  doCheck: (value: Key) => void
  doUncheck: (value: Key) => void
  closeMenu: (returnFocus?: boolean) => void
  handleSelectMenuClickOutside: (e: MouseEvent) => void
  handleCascaderMenuClickOutside: (e: MouseEvent) => void
}

export interface CascaderSubmenuInstance {
  scroll: (index: number, elSize: number) => void
}

export interface CascaderMenuExposedMethods {
  scroll: (depth: number, index: number, elSize: number) => void
  showErrorMessage: (label: string) => void
}

export type CascaderMenuInstance = {
  $el: HTMLElement
} & CascaderMenuExposedMethods

export interface SelectMenuInstance {
  prev: () => void
  next: () => void
  enter: () => boolean
}

export const cascaderInjectionKey: InjectionKey<CascaderInjection> = Symbol(
  'cascader'
)
