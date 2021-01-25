import { ScrollbarRef } from '../../scrollbar'
import type { MergedTheme } from '../../_mixins'
import type { TimePickerTheme } from '../styles'

export interface TimePickerInjection {
  mergedTheme: MergedTheme<TimePickerTheme>
}

export interface PanelRef {
  $el: HTMLElement
  hourScrollRef?: ScrollbarRef
  minuteScrollRef?: ScrollbarRef
  secondScrollRef?: ScrollbarRef
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
