import type { Ref, Slots, UnwrapNestedRefs } from 'vue'
import type { VirtualListInst } from 'vueuc'
import type { NDateLocale, NLocale } from '../../locales'
import type { ScrollbarInst } from '../../_internal'
import type {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled
} from '../../time-picker/src/interface'
import type { TimePickerProps } from '../../time-picker/src/TimePicker'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { DatePickerTheme } from '../styles/light'
import type { ButtonProps } from '../../button'
import type {
  dualCalendarValidation,
  uniCalendarValidation
} from './validation-utils'

export type Value = number | [number, number]

export type DefaultTime = string | [string | undefined, string | undefined]

export type FormattedValue = string | [string, string]

export type NowButtonProps = Pick<ButtonProps, 'size' | 'onClick'>

export type ClearButtonProps = Pick<ButtonProps, 'size' | 'onClick'>

export type ConfirmButtonProps = Pick<
  ButtonProps,
  'size' | 'onClick' | 'type' | 'disabled'
>

export type Shortcuts =
  | Record<string, number | (() => number)>
  | Record<
    string,
    | [number, number]
    | readonly [number, number]
    | (() => [number, number] | readonly [number, number])
  >

export type OnUpdateValue = (
  value: number &
    (number | null) &
    [number, number] &
    ([number, number] | null),
  formattedValue: string &
    (string | null) &
    [string, string] &
    ([string, string] | null)
) => void

export type OnConfirm = OnUpdateValue

export type OnConfirmImpl = OnUpdateValueImpl

export type OnUpdateFormattedValue = (
  value: string &
    (string | null) &
    [string, string] &
    ([string, string] | null),
  timestampValue: number &
    (number | null) &
    [number, number] &
    ([number, number] | null)
) => void

export type OnUpdateFormattedValueImpl = (
  value: string | [string, string] | null,
  timestampValue: number | [number, number] | null
) => void

export type OnUpdateValueImpl = (
  value: Value | null,
  formattedValue: string | [string, string] | null
) => void

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

export interface RangePanelChildComponentRefs {
  startYearScrollbarRef: Ref<ScrollbarInst | null>
  endYearScrollbarRef: Ref<ScrollbarInst | null>
  startMonthScrollbarRef: Ref<ScrollbarInst | null>
  endMonthScrollbarRef: Ref<ScrollbarInst | null>
  startYearVlRef: Ref<VirtualListInst | null>
  endYearVlRef: Ref<VirtualListInst | null>
}

export interface PanelChildComponentRefs {
  monthScrollbarRef: Ref<ScrollbarInst | null> // Only exists when type is month
  yearScrollbarRef: Ref<ScrollbarInst | null>
  // year, virtual scroll
  yearVlRef: Ref<VirtualListInst | null>
}

export interface PanelRef
  extends Partial<
    UnwrapNestedRefs<PanelChildComponentRefs & RangePanelChildComponentRefs>
  > {
  $el: HTMLElement
}

// 0 is Monday
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DatePickerInjection = {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<DatePickerTheme>>
  timePickerSizeRef: Ref<'small' | 'medium' | 'large'>
  timePickerPropsRef: Ref<
    undefined | TimePickerProps | [TimePickerProps, TimePickerProps]
  >
  localeRef: Ref<NLocale['DatePicker']>
  dateLocaleRef: Ref<NDateLocale>
  isDateDisabledRef: Ref<IsDateDisabled | undefined>
  rangesRef: Ref<Record<string, [number, number]> | undefined>
  closeOnSelectRef: Ref<boolean>
  updateValueOnCloseRef: Ref<boolean>
  firstDayOfWeekRef: Ref<FirstDayOfWeek | undefined>
  monthFormatRef: Ref<string>
  yearFormatRef: Ref<string>
  quarterFormatRef: Ref<string>
  datePickerSlots: Slots
  yearRangeRef: Ref<[number, number]>
} & ReturnType<typeof uniCalendarValidation> &
ReturnType<typeof dualCalendarValidation>

export const datePickerInjectionKey
  = createInjectionKey<DatePickerInjection>('n-date-picker')

export type IsDateDisabled = IsSingleDateDisabled | IsRangeDateDisabled

export type IsSingleDateDisabledDetail =
  | {
    type: 'date'
    year: number
    month: number
    date: number
  }
  | {
    type: 'month'
    year: number
    month: number
  }
  | {
    type: 'year'
    year: number
  }
  | {
    type: 'quarter'
    year: number
    quarter: number
  }
  | {
    type: 'input'
  }

export type IsSingleDateDisabled = (
  timestamp: number,
  detail: IsSingleDateDisabledDetail
) => boolean
export type IsRangeDateDisabled = (
  timestamp: number,
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
