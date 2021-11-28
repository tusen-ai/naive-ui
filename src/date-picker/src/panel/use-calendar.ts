import { ref, computed, inject, watch, ExtractPropTypes, PropType } from 'vue'
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
  startOfSecond,
  startOfMonth,
  startOfYear
} from 'date-fns'
import { dateArray, monthArray, strictParse, yearArray } from '../utils'
import { usePanelCommon } from './use-panel-common'
import {
  IsSingleDateDisabled,
  datePickerInjectionKey,
  Shortcuts
} from '../interface'
import type { DateItem, MonthItem, YearItem } from '../utils'
import { VirtualListInst } from 'vueuc'
import { ScrollbarInst } from '../../../_internal'

const useCalendarProps = {
  ...usePanelCommon.props,
  actions: {
    type: Array as PropType<string[]>,
    default: () => ['now', 'clear', 'confirm']
  }
} as const

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useCalendar (
  props: ExtractPropTypes<typeof useCalendarProps>,
  type: 'date' | 'datetime' | 'month' | 'year'
) {
  const panelCommon = usePanelCommon(props)
  const {
    isValueInvalidRef,
    isDateDisabledRef,
    isDateInvalidRef,
    isTimeInvalidRef,
    isDateTimeInvalidRef,
    isHourDisabledRef,
    isMinuteDisabledRef,
    isSecondDisabledRef,
    localeRef,
    firstDayOfWeekRef,
    datePickerSlots,
    scrollYearMonth
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = inject(datePickerInjectionKey)!
  const validation = {
    isValueInvalid: isValueInvalidRef,
    isDateDisabled: isDateDisabledRef,
    isDateInvalid: isDateInvalidRef,
    isTimeInvalid: isTimeInvalidRef,
    isDateTimeInvalid: isDateTimeInvalidRef,
    isHourDisabled: isHourDisabledRef,
    isMinuteDisabled: isMinuteDisabledRef,
    isSecondDisabled: isSecondDisabledRef
  }
  const dateInputValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? ''
      : format(props.value, props.dateFormat)
  )
  const calendarValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? Date.now()
      : props.value
  )
  const yearScrollRef = ref<VirtualListInst | null>(null)
  const monthScrollRef = ref<ScrollbarInst | null>(null)
  const scrollbarInstRef = ref<ScrollbarInst | null>(null)
  const nowRef = ref(Date.now())
  const dateArrayRef = computed(() => {
    return dateArray(
      calendarValueRef.value,
      props.value,
      nowRef.value,
      firstDayOfWeekRef.value ?? localeRef.value.firstDayOfWeek
    )
  })
  const monthArrayRef = computed(() => {
    return monthArray(calendarValueRef.value, props.value, nowRef.value)
  })
  const yearArrayRef = computed(() => {
    return yearArray(calendarValueRef.value, props.value, nowRef.value)
  })
  const weekdaysRef = computed(() => {
    return dateArrayRef.value.slice(0, 7).map((dateItem) => {
      const { ts } = dateItem
      return format(
        ts,
        localeRef.value.dayFormat,
        panelCommon.dateFnsOptions.value
      )
    })
  })
  const calendarMonthRef = computed(() => {
    return format(
      calendarValueRef.value,
      localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const calendarYearRef = computed(() => {
    return format(
      calendarValueRef.value,
      localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  watch(calendarValueRef, (value, oldValue) => {
    if (!isSameMonth(value, oldValue)) {
      panelCommon.disableTransitionOneTick()
    }
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && !Array.isArray(value)) {
        dateInputValueRef.value = format(
          value,
          props.dateFormat,
          panelCommon.dateFnsOptions.value
        )
        calendarValueRef.value = value
      } else {
        dateInputValueRef.value = ''
      }
    }
  )
  function sanitizeValue (value: number): number {
    if (type === 'datetime') return getTime(startOfSecond(value))
    if (type === 'month') return getTime(startOfMonth(value))
    if (type === 'year') return getTime(startOfYear(value))
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
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), false)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(getTime(newDateTime))),
          false
        )
      }
    } else {
      dateInputValueRef.value = value
    }
  }
  function handleDateInputBlur (): void {
    const date = strictParse(
      dateInputValueRef.value,
      props.dateFormat,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), false)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(getTime(newDateTime))),
          false
        )
      }
    } else {
      deriveDateInputValue()
    }
  }
  function clearSelectedDateTime (): void {
    panelCommon.doUpdateValue(null, true)
    dateInputValueRef.value = ''
    panelCommon.doClose(true)
  }
  function handleNowClick (): void {
    panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), true)
    calendarValueRef.value = Date.now()
    panelCommon.doClose(true)
  }
  function handleDateClick (dateItem: DateItem | MonthItem | YearItem): void {
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
    panelCommon.doUpdateValue(
      sanitizeValue(newValue),
      type === 'date' || type === 'year'
    )
    if (type === 'date') {
      panelCommon.doClose()
    } else if (type === 'month') {
      panelCommon.disableTransitionOneTick()
      scrollYearMonth(newValue)
    } else if (type === 'year') {
      panelCommon.doClose()
    }
  }
  function deriveDateInputValue (time?: number): void {
    // If not selected, display nothing,
    // else update datetime related string
    if (props.value === null || Array.isArray(props.value)) {
      dateInputValueRef.value = ''
      return
    }
    if (time === undefined) {
      time = props.value
    }
    dateInputValueRef.value = format(
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
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, 1))
  }
  function prevYear (): void {
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, -1))
  }
  function nextMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, 1))
  }
  function prevMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, -1))
  }
  // For month type
  function virtualListContainer (): HTMLElement {
    const { value } = yearScrollRef
    return value?.listElRef as HTMLElement
  }
  // For month type
  function virtualListContent (): HTMLElement {
    const { value } = yearScrollRef
    return value?.itemsElRef as HTMLElement
  }
  // For month type
  function handleVirtualListScroll (e: Event): void {
    scrollbarInstRef.value?.sync()
  }
  function handleTimePickerChange (value: number | null): void {
    if (value === null) return
    panelCommon.doUpdateValue(value, false)
  }
  function handleSingleShortcutMouseenter (shortcut: Shortcuts[string]): void {
    panelCommon.cachePendingValue()
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (typeof shortcutValue !== 'number') return
    panelCommon.doUpdateValue(shortcutValue, false)
  }
  function handleSingleShortcutClick (shortcut: Shortcuts[string]): void {
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (typeof shortcutValue !== 'number') return
    panelCommon.doUpdateValue(shortcutValue, false)
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }
  return {
    dateArray: dateArrayRef,
    monthArray: monthArrayRef,
    yearArray: yearArrayRef,
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
    handleSingleShortcutMouseenter,
    handleSingleShortcutClick,
    ...validation,
    ...panelCommon,
    // datetime only
    handleDateClick,
    handleDateInputBlur,
    handleDateInput,
    handleTimePickerChange,
    clearSelectedDateTime,
    virtualListContainer,
    virtualListContent,
    handleVirtualListScroll,
    timePickerSize: panelCommon.timePickerSize,
    dateInputValue: dateInputValueRef,
    datePickerSlots,
    monthScrollRef,
    yearScrollRef,
    scrollbarInstRef
  }
}

useCalendar.props = useCalendarProps

export { useCalendar }
