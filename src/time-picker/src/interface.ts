import { type Ref } from 'vue'
import { type ScrollbarInst } from '../../_internal'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { TimePickerTheme } from '../styles'

export type ItemValue = number | 'am' | 'pm'

export interface Item {
  label: string
  value: ItemValue
  disabled: boolean
}

export interface TimePickerInjection {
  mergedThemeRef: Ref<MergedTheme<TimePickerTheme>>
  mergedClsPrefixRef: Ref<string>
}

export const timePickerInjectionKey =
  createInjectionKey<TimePickerInjection>('n-time-picker')

export interface PanelRef {
  $el: HTMLElement
  hourScrollRef?: ScrollbarInst
  minuteScrollRef?: ScrollbarInst
  secondScrollRef?: ScrollbarInst
  amPmScrollRef?: ScrollbarInst
}

export type OnUpdateValue = ((value: number, formattedValue: string) => void) &
((value: number | null, formattedValue: string | null) => void)
export type OnUpdateValueImpl = (
  value: number | null,
  formattedValue: string | null
) => void

export type OnUpdateFormattedValue = ((
  value: string,
  timestampValue: number
) => void) &
((value: string | null, timestampValue: number | null) => void)
export type OnUpdateFormattedValueImpl = (
  value: string | null,
  timestampValue: number | null
) => void

export type IsHourDisabled = (hour: number) => boolean
export type IsMinuteDisabled = (minute: number, hour: number | null) => boolean
export type IsSecondDisabled = (
  second: number,
  minute: number | null,
  hour: number | null
) => boolean

export type Size = 'small' | 'medium' | 'large'

export interface TimePickerInst {
  focus: () => void
  blur: () => void
}
