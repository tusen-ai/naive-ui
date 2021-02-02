import { UnwrapRef } from 'vue'
import { NaiveLocale, NaiveDateLocale } from '../../locales'
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

export type OnUpdateValue = <
  T extends number &
  (number | null) &
  [number, number] &
  ([number, number] | null)
>(
  value: T
) => void

export type OnUpdateValueImpl = (value: Value | null) => void

export interface PanelRef {
  $el: HTMLElement
}

export type DatePickerInjection = {
  mergedTheme: MergedTheme<DatePickerTheme>
  timePickerSize: 'small' | 'medium' | 'large'
  locale: NaiveLocale['DatePicker']
  dateLocale: NaiveDateLocale
  value: Value | null
  isDateDisabled: IsDateDisabled
} & UnwrapRef<ReturnType<typeof uniCalendarValidation>> &
UnwrapRef<ReturnType<typeof dualCalendarValidation>>

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
