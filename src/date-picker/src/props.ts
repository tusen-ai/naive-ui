import type { PropType } from 'vue'
import type { FollowerPlacement } from 'vueuc'
import type { ThemeProps } from '../../_mixins'
import type { MaybeArray } from '../../_utils'
import type { FormValidationStatus } from '../../form/src/interface'
import type { TimePickerProps } from '../../time-picker'
import type { DatePickerTheme } from '../styles'
import type { DatePickerType } from './config'
import type {
  DefaultTime,
  FirstDayOfWeek,
  FormattedValue,
  IsDateDisabled,
  IsTimeDisabled,
  OnConfirm,
  OnUpdateFormattedValue,
  OnUpdateValue,
  Shortcuts,
  Value
} from './interface'
import { useTheme } from '../../_mixins'
import { useAdjustedTo } from '../../_utils'

export const datePickerProps = {
  ...(useTheme.props as ThemeProps<DatePickerTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clearable: Boolean,
  updateValueOnClose: Boolean,
  calendarDayFormat: String,
  calendarHeaderYearFormat: String,
  calendarHeaderMonthFormat: String,
  calendarHeaderMonthYearSeparator: {
    type: String,
    default: ' '
  },
  calendarHeaderMonthBeforeYear: {
    type: Boolean,
    default: undefined
  },
  defaultValue: [Number, Array] as PropType<Value | null>,
  defaultFormattedValue: [String, Array] as PropType<FormattedValue | null>,
  defaultTime: [Number, String, Array] as PropType<DefaultTime>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  value: [Number, Array] as PropType<Value | null>,
  formattedValue: [String, Array] as PropType<FormattedValue | null>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },
  valueFormat: String,
  separator: String,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
  dateFormat: String,
  timerPickerFormat: String,
  actions: Array as PropType<Array<'clear' | 'confirm' | 'now'> | null>,
  shortcuts: Object as PropType<Shortcuts>,
  isDateDisabled: Function as PropType<IsDateDisabled>,
  isTimeDisabled: Function as PropType<IsTimeDisabled>,
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  panel: Boolean,
  ranges: Object as PropType<Record<string, [number, number]>>,
  firstDayOfWeek: Number as PropType<FirstDayOfWeek>,
  inputReadonly: Boolean,
  closeOnSelect: Boolean,
  status: String as PropType<FormValidationStatus>,
  timePickerProps: [Object, Array] as PropType<
    TimePickerProps | [TimePickerProps, TimePickerProps]
  >,
  onClear: Function as PropType<() => void>,
  onConfirm: Function as PropType<OnConfirm>,
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  monthFormat: { type: String, default: 'M' },
  yearFormat: { type: String, default: 'y' },
  quarterFormat: { type: String, default: '\'Q\'Q' },
  yearRange: {
    type: Array as unknown as PropType<[number, number]>,
    default: (): [number, number] => [1901, 2100]
  },
  'onUpdate:show': [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  'onUpdate:formattedValue': [Function, Array] as PropType<
    MaybeArray<OnUpdateFormattedValue>
  >,
  onUpdateFormattedValue: [Function, Array] as PropType<
    MaybeArray<OnUpdateFormattedValue>
  >,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onFocus: [Function, Array] as PropType<(e: FocusEvent) => void>,
  onBlur: [Function, Array] as PropType<(e: FocusEvent) => void>,
  onNextMonth: Function as PropType<() => void>,
  onPrevMonth: Function as PropType<() => void>,
  onNextYear: Function as PropType<() => void>,
  onPrevYear: Function as PropType<() => void>,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const
