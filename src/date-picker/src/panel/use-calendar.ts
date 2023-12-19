import {
  ref,
  computed,
  inject,
  watch,
  type ExtractPropTypes,
  type PropType
} from 'vue'
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
  startOfYear,
  startOfQuarter,
  startOfWeek,
  setQuarter,
  setYear,
  setMonth
} from 'date-fns/esm'
import type { VirtualListInst } from 'vueuc'
import type { ScrollbarInst } from '../../../_internal'
import {
  getDefaultTime,
  dateArray,
  monthArray,
  strictParse,
  yearArray,
  quarterArray
} from '../utils'
import type {
  FirstDayOfWeek,
  IsSingleDateDisabled,
  PanelChildComponentRefs,
  Shortcuts
} from '../interface'
import { datePickerInjectionKey } from '../interface'
import type { DateItem, MonthItem, YearItem, QuarterItem } from '../utils'
import { usePanelCommon, usePanelCommonProps } from './use-panel-common'
import { MONTH_ITEM_HEIGHT, START_YEAR } from '../config'

const useCalendarProps = {
  ...usePanelCommonProps,
  actions: {
    type: Array as PropType<string[]>,
    default: () => ['now', 'clear', 'confirm']
  }
} as const

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useCalendar (
  props: ExtractPropTypes<typeof useCalendarProps>,
  type: 'date' | 'datetime' | 'month' | 'year' | 'quarter' | 'week'
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
    datePickerSlots
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
  const mergedDateFormatRef = computed(
    () => props.dateFormat || localeRef.value.dateFormat
  )
  const dateInputValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? ''
      : format(props.value, mergedDateFormatRef.value)
  )
  const calendarValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? Date.now()
      : props.value
  )
  const yearVlRef = ref<VirtualListInst | null>(null)
  const yearScrollbarRef = ref<ScrollbarInst | null>(null)
  const monthScrollbarRef = ref<ScrollbarInst | null>(null)
  const nowRef = ref(Date.now())
  const dateArrayRef = computed(() => {
    return dateArray(
      calendarValueRef.value,
      props.value,
      nowRef.value,
      firstDayOfWeekRef.value ?? localeRef.value.firstDayOfWeek,
      false,
      type === 'week'
    )
  })
  const monthArrayRef = computed(() => {
    const { value } = props
    return monthArray(
      calendarValueRef.value,
      Array.isArray(value) ? null : value,
      nowRef.value
    )
  })
  const yearArrayRef = computed(() => {
    const { value } = props
    return yearArray(Array.isArray(value) ? null : value, nowRef.value)
  })
  const quarterArrayRef = computed(() => {
    const { value } = props
    return quarterArray(
      calendarValueRef.value,
      Array.isArray(value) ? null : value,
      nowRef.value
    )
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
    if (type === 'date' || type === 'datetime') {
      if (!isSameMonth(value, oldValue)) {
        panelCommon.disableTransitionOneTick()
      }
    }
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && !Array.isArray(value)) {
        dateInputValueRef.value = format(
          value,
          mergedDateFormatRef.value,
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
    if (type === 'quarter') return getTime(startOfQuarter(value))
    if (type === 'week') {
      // refer to makeWeekMatcher
      const weekStartsOn = (((firstDayOfWeekRef.value ??
        localeRef.value.firstDayOfWeek) +
        1) %
        7) as FirstDayOfWeek
      return getTime(
        startOfWeek(value, {
          weekStartsOn
        })
      )
    }
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
      mergedDateFormatRef.value,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(Date.now())),
          props.panel
        )
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(getTime(newDateTime))),
          props.panel
        )
      }
    } else {
      dateInputValueRef.value = value
    }
  }
  function handleDateInputBlur (): void {
    const date = strictParse(
      dateInputValueRef.value,
      mergedDateFormatRef.value,
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
    panelCommon.handleClearClick()
  }
  function handleNowClick (): void {
    panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), true)
    const now = Date.now()
    calendarValueRef.value = now
    panelCommon.doClose(true)
    if (
      props.panel &&
      (type === 'month' || type === 'quarter' || type === 'year')
    ) {
      panelCommon.disableTransitionOneTick()
      justifyColumnsScrollState(now)
    }
  }
  const hoveredWeekRef = ref<number | null>(null)
  function handleDateMouseEnter (
    dateItem: DateItem | MonthItem | YearItem | QuarterItem
  ): void {
    if (dateItem.type === 'date' && type === 'week') {
      hoveredWeekRef.value = sanitizeValue(getTime(dateItem.ts))
    }
  }
  function isWeekHovered (
    dateItem: DateItem | MonthItem | YearItem | QuarterItem
  ): boolean {
    if (dateItem.type === 'date' && type === 'week') {
      return sanitizeValue(getTime(dateItem.ts)) === hoveredWeekRef.value
    }
    return false
  }
  function handleDateClick (
    dateItem: DateItem | MonthItem | YearItem | QuarterItem
  ): void {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    let newValue: number
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    if (
      type === 'datetime' &&
      props.defaultTime !== null &&
      !Array.isArray(props.defaultTime)
    ) {
      const time = getDefaultTime(props.defaultTime)
      if (time) {
        newValue = getTime(set(newValue, time)) // setDate getTime(addMilliseconds(startOfDay(newValue), time))
      }
    }
    newValue = getTime(
      dateItem.type === 'quarter' && dateItem.dateObject.quarter
        ? setQuarter(
          setYear(newValue, dateItem.dateObject.year),
          dateItem.dateObject.quarter
        )
        : set(newValue, dateItem.dateObject)
    )
    panelCommon.doUpdateValue(
      sanitizeValue(newValue),
      props.panel || type === 'date' || type === 'week' || type === 'year'
    )
    switch (type) {
      case 'date':
      case 'week':
        panelCommon.doClose()
        break
      case 'year':
        if (props.panel) {
          panelCommon.disableTransitionOneTick()
        }
        panelCommon.doClose()
        break
      case 'month':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(newValue)
        break
      case 'quarter':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(newValue)
        break
    }
  }

  function handleQuickMonthClick (
    dateItem: MonthItem | YearItem | QuarterItem,
    updatePanelValue: (value: number) => void
  ): void {
    let newValue: number
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    newValue = getTime(
      dateItem.type === 'month'
        ? setMonth(newValue, dateItem.dateObject.month)
        : setYear(newValue, dateItem.dateObject.year)
    )
    updatePanelValue(newValue)
    justifyColumnsScrollState(newValue)
  }
  function onUpdateCalendarValue (value: number): void {
    calendarValueRef.value = value
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
      mergedDateFormatRef.value,
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
    props.onNextYear?.()
  }
  function prevYear (): void {
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, -1))
    props.onPrevYear?.()
  }
  function nextMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, 1))
    props.onNextMonth?.()
  }
  function prevMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, -1))
    props.onPrevMonth?.()
  }
  // For month type
  function virtualListContainer (): HTMLElement | null {
    const { value } = yearVlRef
    return value?.listElRef || null
  }
  // For month type
  function virtualListContent (): HTMLElement | null {
    const { value } = yearVlRef
    return value?.itemsElRef || null
  }
  // For month type
  function handleVirtualListScroll (e: Event): void {
    yearScrollbarRef.value?.sync()
  }
  function handleTimePickerChange (value: number | null): void {
    if (value === null) return
    panelCommon.doUpdateValue(value, props.panel)
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
    panelCommon.doUpdateValue(shortcutValue, props.panel)
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }

  function justifyColumnsScrollState (value?: number): void {
    const { value: mergedValue } = props
    if (monthScrollbarRef.value) {
      const monthIndex =
        value === undefined
          ? mergedValue === null
            ? getMonth(Date.now())
            : getMonth(mergedValue as number)
          : getMonth(value)
      monthScrollbarRef.value.scrollTo({ top: monthIndex * MONTH_ITEM_HEIGHT })
    }
    if (yearVlRef.value) {
      const yearIndex =
        (value === undefined
          ? mergedValue === null
            ? getYear(Date.now())
            : getYear(mergedValue as number)
          : getYear(value)) - START_YEAR
      yearVlRef.value.scrollTo({ top: yearIndex * MONTH_ITEM_HEIGHT })
    }
  }

  const childComponentRefs: PanelChildComponentRefs = {
    monthScrollbarRef,
    yearScrollbarRef,
    yearVlRef
  }
  return {
    dateArray: dateArrayRef,
    monthArray: monthArrayRef,
    yearArray: yearArrayRef,
    quarterArray: quarterArrayRef,
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
    ...childComponentRefs,
    // datetime only
    handleDateClick,
    handleDateInputBlur,
    handleDateInput,
    handleDateMouseEnter,
    isWeekHovered,
    handleTimePickerChange,
    clearSelectedDateTime,
    virtualListContainer,
    virtualListContent,
    handleVirtualListScroll,
    timePickerSize: panelCommon.timePickerSize,
    dateInputValue: dateInputValueRef,
    datePickerSlots,
    handleQuickMonthClick,
    justifyColumnsScrollState,
    calendarValue: calendarValueRef,
    onUpdateCalendarValue
  }
}

export { useCalendar, useCalendarProps }
