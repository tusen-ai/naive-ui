import type { Ref, UnwrapNestedRefs } from 'vue'
import type { ScrollbarInst } from '../../_internal'
import type { MergedTheme } from '../../_mixins'
import type { TimePickerTheme } from '../styles'
import { createInjectionKey } from '../../_utils'

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

export const timePickerInjectionKey
  = createInjectionKey<TimePickerInjection>('n-time-picker')

export type TimePickerType = 'time' | 'timerange'

export interface PanelChildComponentRefs {
  hourScrollRef: Ref<ScrollbarInst | null>
  minuteScrollRef: Ref<ScrollbarInst | null>
  secondScrollRef: Ref<ScrollbarInst | null>
  amPmScrollRef: Ref<ScrollbarInst | null>
}

export interface RangePanelChildComponentRefs {
  startHourScrollRef: Ref<ScrollbarInst | null>
  startMinuteScrollRef: Ref<ScrollbarInst | null>
  startSecondScrollRef: Ref<ScrollbarInst | null>
  startAmPmScrollRef: Ref<ScrollbarInst | null>
  endHourScrollRef: Ref<ScrollbarInst | null>
  endMinuteScrollRef: Ref<ScrollbarInst | null>
  endSecondScrollRef: Ref<ScrollbarInst | null>
  endAmPmScrollRef: Ref<ScrollbarInst | null>
}

export interface PanelRef
  extends Partial<
    UnwrapNestedRefs<PanelChildComponentRefs & RangePanelChildComponentRefs>
  > {
  $el: HTMLElement
}

export type Value = number | null
export type RangeValue = [number, number] | null

export type OnUpdateValue = ((value: number, formattedValue: string) => void)
  & ((value: number | null, formattedValue: string | null) => void)
export type OnUpdateValueImpl = (
  value: number | null,
  formattedValue: string | null
) => void

export type OnUpdateRangeValue = ((
  value: [number, number],
  formattedValue: [string, string]
) => void)
& ((
  value: [number, number] | null,
  formattedValue: [string, string] | null
) => void)
export type OnUpdateRangeValueImpl = (
  value: [number, number] | null,
  formattedValue: [string, string] | null
) => void

export type OnUpdateFormattedValue = ((
  value: string,
  timestampValue: number
) => void)
& ((value: string | null, timestampValue: number | null) => void)
export type OnUpdateFormattedValueImpl = (
  value: string | null,
  timestampValue: number | null
) => void

export type OnUpdateRangeFormattedValue = ((
  value: [string, string],
  timestampValue: [number, number]
) => void)
& ((
  value: [string, string] | null,
  timestampValue: [number, number] | null
) => void)
export type OnUpdateRangeFormattedValueImpl = (
  value: [string, string] | null,
  timestampValue: [number, number] | null
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
