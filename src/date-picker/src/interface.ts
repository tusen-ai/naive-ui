import { InjectionKey, Ref, Slots } from 'vue'
import { VirtualListInst } from 'vueuc'
import { NLocale, NDateLocale } from '../../locales'
import type { ScrollbarInst } from '../../_internal'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled
} from '../../time-picker/src/interface'
import { MergedTheme } from '../../_mixins'
import { DatePickerTheme } from '../styles/light'
import {
  uniCalendarValidation,
  dualCalendarValidation
} from './validation-utils'

export type Value = number | [number, number]

export type DefaultTime = string | [string | undefined, string | undefined]

export type Shortcuts =
  | Record<string, number | (() => number)>
  | Record<string, [number, number] | (() => [number, number])>

export type OnUpdateValue = (
  value: number & (number | null) & [number, number] & ([number, number] | null)
) => void

export type OnUpdateValueImpl = (value: Value | null) => void

export type OnPanelUpdateValue = (
  value: number &
  (number | null) &
  [number, number] &
  ([number, number] | null),
  doUpdate: boolean
) => void

export type OnPanelUpdateValueImpl = (
  value: Value | null,
  doUpdate: boolean
) => void

export type OnClose = (disableUpdateOnClose: boolean) => void

export interface PanelRef {
  $el: HTMLElement
  // Only exists when type is month
  monthScrollRef?: ScrollbarInst | null
  yearScrollRef?: VirtualListInst | null
}

// 0 is Monday
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DatePickerInjection = {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<DatePickerTheme>>
  timePickerSizeRef: Ref<'small' | 'medium' | 'large'>
  localeRef: Ref<NLocale['DatePicker']>
  dateLocaleRef: Ref<NDateLocale>
  isDateDisabledRef: Ref<IsDateDisabled | undefined>
  rangesRef: Ref<Record<string, [number, number]> | undefined>
  closeOnSelectRef: Ref<boolean>
  updateValueOnCloseRef: Ref<boolean>
  firstDayOfWeekRef: Ref<FirstDayOfWeek | undefined>
  datePickerSlots: Slots
  scrollPickerColumns: (value?: number) => void
} & ReturnType<typeof uniCalendarValidation> &
ReturnType<typeof dualCalendarValidation>

export const datePickerInjectionKey: InjectionKey<DatePickerInjection> =
  Symbol('datePicker')

export type IsDateDisabled = IsSingleDateDisabled | IsRangeDateDisabled
export type IsSingleDateDisabled = (date: number) => boolean
export type IsRangeDateDisabled = (
  date: number,
  position: 'start' | 'end',
  value: [number, number] | null
) => boolean

export interface TimeValidator {
  isHourDisabled?: IsHourDisabled
  isMinuteDisabled?: IsMinuteDisabled
  isSecondDisabled?: IsSecondDisabled
}

export type IsTimeDisabled = IsSingleTimeDisabled | IsRangeTimeDisabled
export type IsSingleTimeDisabled = (date: number) => TimeValidator
export type IsRangeTimeDisabled = (
  date: number,
  position: 'start' | 'end',
  value: [number, number] // date must exist to have time validation
) => TimeValidator
