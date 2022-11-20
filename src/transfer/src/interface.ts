import { Ref, VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { TransferTheme } from '../styles'

export type OptionValue = string | number
export interface Option {
  label: string
  value: OptionValue
  disabled?: boolean
}

export type Filter = (
  pattern: string,
  option: Option,
  from: 'source' | 'target'
) => boolean

export interface RenderLabelProps {
  option: Option
}

export type TransferRenderTargetLabel = (props: RenderLabelProps) => VNodeChild
export type TransferRenderSourceLabel = (props: RenderLabelProps) => VNodeChild

export interface RenderListProps {
  onCheck: (checkedValueList: OptionValue[]) => void
  checkedOptions: Option[]
  pattern: string
}

export type TransferRenderSourceList = (props: RenderListProps) => VNodeChild

export interface TransferInjection {
  targetValueSetRef: Ref<Set<OptionValue>>
  mergedClsPrefixRef: Ref<string>
  disabledRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<TransferTheme>>
  targetOptionsRef: Ref<Option[]>
  canNotSelectAnythingRef: Ref<boolean>
  canBeClearedRef: Ref<boolean>
  allCheckedRef: Ref<boolean>
  srcOptionsLengthRef: Ref<number>
  handleItemCheck: (checked: boolean, value: OptionValue) => void
  renderSourceLabelRef: Ref<TransferRenderSourceLabel | undefined>
  renderTargetLabelRef: Ref<TransferRenderTargetLabel | undefined>
  showSelectedRef: Ref<boolean>
}

export const transferInjectionKey =
  createInjectionKey<TransferInjection>('n-transfer')

export type OnUpdateValue = (value: OptionValue[]) => void
