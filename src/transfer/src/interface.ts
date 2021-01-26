import type { MergedTheme } from '../../_mixins'
import type { TransferTheme } from '../styles'

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
  mergedSize: 'small' | 'medium' | 'large'
  disabled: boolean
  mergedTheme: MergedTheme<TransferTheme>
  srcCheckedValues: OptionValue[]
  tgtCheckedValues: OptionValue[]
  srcOpts: Option[]
  tgtOpts: Option[]
  srcCheckedStatus: CheckedStatus
  tgtCheckedStatus: CheckedStatus
  handleSrcCheckboxClick: (checked: boolean, value: OptionValue) => void
  handleTgtCheckboxClick: (checked: boolean, value: OptionValue) => void
}

export type OnUpdateValue = (value: OptionValue[]) => void
