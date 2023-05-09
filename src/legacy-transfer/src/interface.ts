import type { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { LegacyTransferTheme } from '../styles'

export type OptionValue = string | number
export interface Option {
  label: string
  value: OptionValue
  disabled?: boolean
}

export interface CheckedStatus {
  checked: boolean
  indeterminate: boolean
  disabled?: boolean
}

export type Filter = (
  pattern: string,
  option: Option,
  from: 'source' | 'target'
) => boolean

export interface TransferInjection {
  mergedClsPrefixRef: Ref<string>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  disabledRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<LegacyTransferTheme>>
  srcCheckedValuesRef: Ref<OptionValue[]>
  tgtCheckedValuesRef: Ref<OptionValue[]>
  srcOptsRef: Ref<Option[]>
  tgtOptsRef: Ref<Option[]>
  srcCheckedStatusRef: Ref<CheckedStatus>
  tgtCheckedStatusRef: Ref<CheckedStatus>
  handleSrcCheckboxClick: (checked: boolean, value: OptionValue) => void
  handleTgtCheckboxClick: (checked: boolean, value: OptionValue) => void
}

export const transferInjectionKey =
  createInjectionKey<TransferInjection>('n-transfer')

export type OnUpdateValue = (value: OptionValue[]) => void
