import type { CheckStrategy, TreeNode } from 'treemate'
import type { CSSProperties, Ref, Slots, VNode, VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { NLocale } from '../../locales'
import type { CascaderTheme } from '../styles'
import { createInjectionKey } from '../../_utils'

export type ValueAtom = string | number
export type Value = ValueAtom | ValueAtom[]

export type Key = ValueAtom

export interface CascaderOption {
  label?: string
  value?: ValueAtom
  disabled?: boolean
  children?: CascaderOption[]
  [key: string]: unknown
}

export type ExpandTrigger = 'hover' | 'click'

export type TmNode = TreeNode<CascaderOption>

export type Filter = (
  pattern: string,
  option: CascaderOption,
  path: CascaderOption[]
) => boolean

export type OnLoad = (option: CascaderOption) => Promise<void>

export type OnUpdateValue = (
  value: string &
    number &
    string[] &
    number[] &
    Array<string | number> &
    (string | null) &
    (number | null) &
    (string[] | null) &
    (number[] | null) &
    (Array<string | number> | null),
  option: null &
    CascaderOption &
    CascaderOption[] &
    Array<CascaderOption | null>,
  path: null & CascaderOption[] & Array<CascaderOption[] | null>
) => void

export type OnUpdateValueImpl = (
  value: Value | null,
  option: CascaderOption | null | Array<CascaderOption | null>,
  path: Array<CascaderOption[] | null> | CascaderOption[] | null
) => void

export type MenuModel = TmNode[][]

export interface CascaderInjection {
  slots: Slots
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<CascaderTheme>>
  mergedValueRef: Ref<Value | null>
  checkedKeysRef: Ref<Key[]>
  indeterminateKeysRef: Ref<Key[]>
  hoverKeyPathRef: Ref<Key[]>
  mergedCheckStrategyRef: Ref<CheckStrategy>
  multipleRef: Ref<boolean>
  keyboardKeyRef: Ref<Key | null>
  hoverKeyRef: Ref<Key | null>
  remoteRef: Ref<boolean>
  loadingKeySetRef: Ref<Set<Key>>
  expandTriggerRef: Ref<ExpandTrigger>
  isMountedRef: Ref<boolean>
  cascadeRef: Ref<boolean>
  onLoadRef: Ref<((value: CascaderOption) => Promise<void>) | undefined>
  localeRef: Ref<NLocale['Cascader']>
  virtualScrollRef: Ref<boolean>
  optionHeightRef: Ref<string>
  labelFieldRef: Ref<string>
  showCheckboxRef: Ref<boolean>
  getColumnStyleRef: Ref<
    ((detail: { level: number }) => string | CSSProperties) | undefined
  >
  renderPrefixRef: Ref<
    | ((info: {
      option: CascaderOption
      checked: boolean
      node: VNode | null
    }) => VNodeChild)
    | undefined
  >
  renderSuffixRef: Ref<
    | ((info: {
      option: CascaderOption
      checked: boolean
      node: VNode | null
    }) => VNodeChild)
    | undefined
  >
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
  renderLabelRef: Ref<
    ((option: CascaderOption, checked: boolean) => VNodeChild) | undefined
  >
  clearPattern: () => void
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

export const cascaderInjectionKey
  = createInjectionKey<CascaderInjection>('n-cascader')

export interface CascaderInst {
  focus: () => void
  blur: () => void
  getCheckedData: () => { keys: Key[], options: Array<CascaderOption | null> }
  getIndeterminateData: () => {
    keys: Key[]
    options: Array<CascaderOption | null>
  }
}
