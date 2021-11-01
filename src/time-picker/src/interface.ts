import { InjectionKey, Ref } from 'vue'
import { ScrollbarInst } from '../../_internal'
import type { MergedTheme } from '../../_mixins'
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

export const timePickerInjectionKey: InjectionKey<TimePickerInjection> =
  Symbol('timePicker')

export interface PanelRef {
  $el: HTMLElement
  hourScrollRef?: ScrollbarInst
  minuteScrollRef?: ScrollbarInst
  secondScrollRef?: ScrollbarInst
  amPmScrollRef?: ScrollbarInst
}

export type OnUpdateValue = <T extends number & (number | null)>(
  value: T
) => void
export type OnUpdateValueImpl = (value: number | null) => void

export type IsHourDisabled = (hour: number) => boolean
export type IsMinuteDisabled = (minute: number, hour: number | null) => boolean
export type IsSecondDisabled = (
  second: number,
  minute: number | null,
  hour: number | null
) => boolean

export type Size = 'small' | 'medium' | 'large'
