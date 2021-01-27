import { ref, computed, inject, watch, toRef, ExtractPropTypes } from 'vue'
import {
  addMonths,
  addYears,
  isSameMonth,
  getTime,
  format,
  set,
  getYear,
  getMonth,
  getDate,
  isValid,
  startOfDay,
  startOfSecond
} from 'date-fns'
import { dateArray, strictParse } from '../utils'
import { usePanelCommon } from './use-panel-common'
import { DatePickerInjection, Value, IsSingleDateDisabled } from '../interface'
import type { DateItem } from '../utils'

const useCalendarProps = {
  ...usePanelCommon.props,
  actions: {
    type: Array,
    default: () => ['now', 'clear', 'confirm']
  }
} as const

function ensureValidValue (value: Value | null): number {
  if (Array.isArray(value) || value === null) return Date.now()
  return value
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useCalendar (
  props: ExtractPropTypes<typeof useCalendarProps>,
  type: 'date' | 'datetime'
) {
  const panelCommon = usePanelCommon(props)
  const NDatePicker = inject<DatePickerInjection>(
    'NDatePicker'
  ) as DatePickerInjection
  const validation = {
    isDateDisabled: computed(() => NDatePicker.isDateDisabled),
    isDateInvalid: computed(() => NDatePicker.isDateInvalid),
    isTimeInvalid: computed(() => NDatePicker.isTimeInvalid),
    isDateTimeInvalid: computed(() => NDatePicker.isDateTimeInvalid),
    isHourDisabled: computed(() => NDatePicker.isHourDisabled),
    isMinuteDisabled: computed(() => NDatePicker.isMinuteDisabled),
    isSecondDisabled: computed(() => NDatePicker.isSecondDisabled)
  }
  const displayDateStringRef = ref(
    props.value === null || Array.isArray(props.value)
      ? ''
      : format(props.value, props.dateFormat)
  )
  const calendarDateTimeRef = ref(
    props.value === null || Array.isArray(props.value)
      ? Date.now()
      : props.value
  )
  const nowRef = ref(Date.now())
  const dateArrayRef = computed(() => {
    return dateArray(
      calendarDateTimeRef.value,
      ensureValidValue(props.value),
      nowRef.value
    )
  })
  const weekdaysRef = computed(() => {
    return dateArrayRef.value.slice(0, 7).map((dateItem) => {
      const { ts } = dateItem
      return format(
        ts,
        NDatePicker.locale.dayFormat,
        panelCommon.dateFnsOptions.value
      )
    })
  })
  const calendarMonthRef = computed(() => {
    return format(
      calendarDateTimeRef.value,
      NDatePicker.locale.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const calendarYearRef = computed(() => {
    return format(
      calendarDateTimeRef.value,
      NDatePicker.locale.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  watch(calendarDateTimeRef, (value, oldValue) => {
    if (!isSameMonth(value, oldValue)) {
      panelCommon.disableTransitionOneTick()
    }
  })
  watch(toRef(props, 'active'), (value) => {
    if (value) {
      panelCommon.memorizedValue.value = props.value
    } else {
      if (validation.isTimeInvalid.value || validation.isDateInvalid.value) {
        panelCommon.doUpdateValue(panelCommon.memorizedValue.value)
      }
    }
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && !Array.isArray(value)) {
        displayDateStringRef.value = format(
          value,
          props.dateFormat,
          panelCommon.dateFnsOptions.value
        )
        calendarDateTimeRef.value = value
      } else {
        displayDateStringRef.value = ''
      }
    }
  )
  function sanitizeValue (value: number): number {
    if (type === 'datetime') return getTime(startOfSecond(value))
    return getTime(startOfDay(value))
  }
  function mergedIsDateDisabled (ts: number): boolean {
    const {
      isDateDisabled: { value: isDateDisabled }
    } = validation
    if (!isDateDisabled) return false
    return (isDateDisabled as IsSingleDateDisabled)(ts)
  }
  function handleDateInput (value: string): void {
    const date = strictParse(
      value,
      props.dateFormat,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())))
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(getTime(newDateTime))))
      }
    }
  }
  function handleDateInputBlur (): void {
    const date = strictParse(
      displayDateStringRef.value,
      props.dateFormat,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())))
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(getTime(newDateTime))))
      }
    } else {
      deriveDateInputValue()
    }
  }
  function clearSelectedDateTime (): void {
    panelCommon.doUpdateValue(null)
    displayDateStringRef.value = ''
  }
  function handleNowClick (): void {
    panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())))
    calendarDateTimeRef.value = Date.now()
  }
  function handleDateClick (dateItem: DateItem): void {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    let newValue: number
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    newValue = getTime(set(newValue, dateItem.dateObject))
    panelCommon.doUpdateValue(getTime(sanitizeValue(newValue)))
  }
  function deriveDateInputValue (time?: number): void {
    // If not selected, display nothing,
    // else update datetime related string
    if (props.value === null || Array.isArray(props.value)) {
      displayDateStringRef.value = ''
      return
    }
    if (time === undefined) {
      time = props.value
    }
    displayDateStringRef.value = format(
      time,
      props.dateFormat,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleConfirmClick (): void {
    if (validation.isDateInvalid.value || validation.isTimeInvalid.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar (): void {
    if (props.active) {
      panelCommon.doClose()
    }
  }
  function nextYear (): void {
    calendarDateTimeRef.value = getTime(addYears(calendarDateTimeRef.value, 1))
  }
  function prevYear (): void {
    calendarDateTimeRef.value = getTime(addYears(calendarDateTimeRef.value, -1))
  }
  function nextMonth (): void {
    calendarDateTimeRef.value = getTime(addMonths(calendarDateTimeRef.value, 1))
  }
  function prevMonth (): void {
    calendarDateTimeRef.value = getTime(
      addMonths(calendarDateTimeRef.value, -1)
    )
  }
  function handleTimePickerChange (value: number): void {
    panelCommon.doUpdateValue(value)
  }
  return {
    NDatePicker,
    dateArray: dateArrayRef,
    calendarYear: calendarYearRef,
    calendarMonth: calendarMonthRef,
    weekdays: weekdaysRef,
    mergedIsDateDisabled,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth,
    handleNowClick,
    handleConfirmClick,
    ...validation,
    ...panelCommon,
    // datetime only
    handleDateClick,
    handleDateInputBlur,
    handleDateInput,
    handleTimePickerChange,
    clearSelectedDateTime,
    timePickerSize: panelCommon.timePickerSize,
    displayDateString: displayDateStringRef
  }
}

useCalendar.props = useCalendarProps

export { useCalendar }
