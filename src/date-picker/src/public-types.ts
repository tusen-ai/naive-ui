import type { ExtractPublicPropTypes } from '../../_utils'
import type { datePickerProps } from './props'

export interface DatePickerInst {
  focus: () => void
  blur: () => void
}

export type DatePickerProps = ExtractPublicPropTypes<typeof datePickerProps>

export type DatePickerClearSlotOnClear = () => void
export interface DatePickerClearSlotProps {
  onClear: DatePickerClearSlotOnClear
  text: string
}

export type DatePickerNowSlotOnNow = () => void
export interface DatePickerNowSlotProps {
  onNow: DatePickerNowSlotOnNow
  text: string
}

export type DatePickerConfirmSlotOnConfirm = () => void
export interface DatePickerConfirmSlotProps {
  onConfirm: DatePickerConfirmSlotOnConfirm
  disabled: boolean
  text: string
}
