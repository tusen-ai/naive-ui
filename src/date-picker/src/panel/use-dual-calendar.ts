import { inject, computed, watch, ref, ExtractPropTypes } from 'vue'
import {
  addMonths,
  format,
  getYear,
  getMonth,
  startOfMonth,
  isValid,
  startOfSecond,
  startOfDay,
  set,
  getDate,
  getTime
} from 'date-fns'
import {
  dateArray,
  DateItem,
  MonthItem,
  YearItem,
  strictParse,
  yearArray,
  monthArray,
  getDefaultTime,
  pluckValueFromRange
} from '../utils'
import { usePanelCommon, usePanelCommonProps } from './use-panel-common'
import {
  datePickerInjectionKey,
  PanelChildComponentRefs,
  Shortcuts
} from '../interface'
import { VirtualListInst } from 'vueuc'
import { ScrollbarInst } from '../../../_internal'

const useDualCalendarProps = {
  ...usePanelCommonProps,
  actions: {
    type: Array,
    default: () => ['clear', 'confirm']
  }
} as const

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useDualCalendar (
  props: ExtractPropTypes<typeof useDualCalendarProps>,
  type = 'datetime'
) {
  const {
    isDateDisabledRef,
    isStartHourDisabledRef,
    isEndHourDisabledRef,
    isStartMinuteDisabledRef,
    isEndMinuteDisabledRef,
    isStartSecondDisabledRef,
    isEndSecondDisabledRef,
    isStartDateInvalidRef,
    isEndDateInvalidRef,
    isStartTimeInvalidRef,
    isEndTimeInvalidRef,
    isStartValueInvalidRef,
    isEndValueInvalidRef,
    isRangeInvalidRef,
    localeRef,
    rangesRef,
    closeOnSelectRef,
    updateValueOnCloseRef,
    firstDayOfWeekRef,
    datePickerSlots,
    scrollRangeYearMonth
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = inject(datePickerInjectionKey)!
  const validation = {
    isDateDisabled: isDateDisabledRef,
    isStartHourDisabled: isStartHourDisabledRef,
    isEndHourDisabled: isEndHourDisabledRef,
    isStartMinuteDisabled: isStartMinuteDisabledRef,
    isEndMinuteDisabled: isEndMinuteDisabledRef,
    isStartSecondDisabled: isStartSecondDisabledRef,
    isEndSecondDisabled: isEndSecondDisabledRef,
    isStartDateInvalid: isStartDateInvalidRef,
    isEndDateInvalid: isEndDateInvalidRef,
    isStartTimeInvalid: isStartTimeInvalidRef,
    isEndTimeInvalid: isEndTimeInvalidRef,
    isStartValueInvalid: isStartValueInvalidRef,
    isEndValueInvalid: isEndValueInvalidRef,
    isRangeInvalid: isRangeInvalidRef
  }
  const panelCommon = usePanelCommon(props)
  const startDatesElRef = ref<HTMLElement | null>(null)
  const endDatesElRef = ref<HTMLElement | null>(null)
  const startYearScrollbarRef = ref<ScrollbarInst | null>(null)
  const endYearScrollbarRef = ref<ScrollbarInst | null>(null)
  const startYearVlRef = ref<VirtualListInst | null>(null)
  const endYearVlRef = ref<VirtualListInst | null>(null)
  const startMonthScrollbarRef = ref<ScrollbarInst | null>(null)
  const endMonthScrollbarRef = ref<ScrollbarInst | null>(null)
  const startCalendarDateTimeRef = ref(Date.now())
  const endCalendarDateTimeRef = ref(getTime(addMonths(Date.now(), 1)))
  const nowRef = ref(Date.now())
  const isSelectingRef = ref(false)
  const memorizedStartDateTimeRef = ref<number>(0)

  const mergedDateFormatRef = computed(
    () => props.dateFormat || localeRef.value.dateFormat
  )

  const { value } = props

  const startDateInput = ref(
    Array.isArray(value)
      ? format(
        value[0],
        mergedDateFormatRef.value,
        panelCommon.dateFnsOptions.value
      )
      : ''
  )
  const endDateInputRef = ref(
    Array.isArray(value)
      ? format(
        value[1],
        mergedDateFormatRef.value,
        panelCommon.dateFnsOptions.value
      )
      : ''
  )

  if (Array.isArray(value)) {
    syncCalendarTimeWithValue(value)
  }

  // derived computed
  const selectingPhaseRef = computed(() => {
    if (isSelectingRef.value) return 'end'
    else return 'start'
  })
  const startDateArrayRef = computed(() => {
    return dateArray(
      startCalendarDateTimeRef.value,
      props.value,
      nowRef.value,
      firstDayOfWeekRef.value ?? localeRef.value.firstDayOfWeek
    )
  })
  const endDateArrayRef = computed(() => {
    return dateArray(
      endCalendarDateTimeRef.value,
      props.value,
      nowRef.value,
      firstDayOfWeekRef.value ?? localeRef.value.firstDayOfWeek
    )
  })
  const weekdaysRef = computed(() => {
    return startDateArrayRef.value.slice(0, 7).map((dateItem) => {
      const { ts } = dateItem
      return format(
        ts,
        localeRef.value.dayFormat,
        panelCommon.dateFnsOptions.value
      )
    })
  })
  const startCalendarMonthRef = computed(() => {
    return format(
      startCalendarDateTimeRef.value,
      localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const endCalendarMonthRef = computed(() => {
    return format(
      endCalendarDateTimeRef.value,
      localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const startCalendarYearRef = computed(() => {
    return format(
      startCalendarDateTimeRef.value,
      localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const endCalendarYearRef = computed(() => {
    return format(
      endCalendarDateTimeRef.value,
      localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const startTimeValueRef = computed(() => {
    const { value } = props
    if (Array.isArray(value)) return value[0]
    return null
  })
  const endTimeValueRef = computed(() => {
    const { value } = props
    if (Array.isArray(value)) return value[1]
    return null
  })
  const shortcutsRef = computed(() => {
    const { shortcuts } = props
    return shortcuts || rangesRef.value
  })
  const startYearArrayRef = computed(() => {
    return yearArray(pluckValueFromRange(props.value, 'start'), nowRef.value)
  })
  const endYearArrayRef = computed(() => {
    return yearArray(pluckValueFromRange(props.value, 'end'), nowRef.value)
  })
  const startMonthArrayRef = computed(() => {
    const startValue = pluckValueFromRange(props.value, 'start')
    return monthArray(startValue ?? Date.now(), startValue, nowRef.value)
  })
  const endMonthArrayRef = computed(() => {
    const endValue = pluckValueFromRange(props.value, 'end')
    return monthArray(endValue ?? Date.now(), endValue, nowRef.value)
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && Array.isArray(value)) {
        const [startMoment, endMoment] = value
        startDateInput.value = format(
          startMoment,
          mergedDateFormatRef.value,
          panelCommon.dateFnsOptions.value
        )
        endDateInputRef.value = format(
          endMoment,
          mergedDateFormatRef.value,
          panelCommon.dateFnsOptions.value
        )
        if (!isSelectingRef.value) {
          syncCalendarTimeWithValue(value)
        }
      } else {
        startDateInput.value = ''
        endDateInputRef.value = ''
      }
    }
  )
  function handleCalendarChange (value: number, oldValue: number): void {
    if (
      getYear(value) !== getYear(oldValue) ||
      getMonth(value) !== getMonth(oldValue)
    ) {
      panelCommon.disableTransitionOneTick()
    }
  }
  watch(startCalendarDateTimeRef, handleCalendarChange)
  watch(endCalendarDateTimeRef, handleCalendarChange)
  // change calendar
  function adjustCalendarTimes (byStartCalendarTime: boolean): void {
    const startTime = startOfMonth(startCalendarDateTimeRef.value)
    const endTime = startOfMonth(endCalendarDateTimeRef.value)
    if (startTime >= endTime) {
      if (byStartCalendarTime) {
        endCalendarDateTimeRef.value = getTime(addMonths(startTime, 1))
      } else {
        startCalendarDateTimeRef.value = getTime(addMonths(endTime, -1))
      }
    }
  }
  function startCalendarNextYear (): void {
    startCalendarDateTimeRef.value = getTime(
      addMonths(startCalendarDateTimeRef.value, 12)
    )
    adjustCalendarTimes(true)
  }
  function startCalendarPrevYear (): void {
    startCalendarDateTimeRef.value = getTime(
      addMonths(startCalendarDateTimeRef.value, -12)
    )
    adjustCalendarTimes(true)
  }
  function startCalendarNextMonth (): void {
    startCalendarDateTimeRef.value = getTime(
      addMonths(startCalendarDateTimeRef.value, 1)
    )
    adjustCalendarTimes(true)
  }
  function startCalendarPrevMonth (): void {
    startCalendarDateTimeRef.value = getTime(
      addMonths(startCalendarDateTimeRef.value, -1)
    )
    adjustCalendarTimes(true)
  }
  function endCalendarNextYear (): void {
    endCalendarDateTimeRef.value = getTime(
      addMonths(endCalendarDateTimeRef.value, 12)
    )
    adjustCalendarTimes(false)
  }
  function endCalendarPrevYear (): void {
    endCalendarDateTimeRef.value = getTime(
      addMonths(endCalendarDateTimeRef.value, -12)
    )
    adjustCalendarTimes(false)
  }
  function endCalendarNextMonth (): void {
    endCalendarDateTimeRef.value = getTime(
      addMonths(endCalendarDateTimeRef.value, 1)
    )
    adjustCalendarTimes(false)
  }
  function endCalendarPrevMonth (): void {
    endCalendarDateTimeRef.value = getTime(
      addMonths(endCalendarDateTimeRef.value, -1)
    )
    adjustCalendarTimes(false)
  }
  function onUpdateStartCalendarValue (value: number): void {
    startCalendarDateTimeRef.value = value
    adjustCalendarTimes(true)
  }

  function onUpdateEndCalendarValue (value: number): void {
    endCalendarDateTimeRef.value = value
    adjustCalendarTimes(false)
  }

  // The function is used on date panel, not the date-picker value validation
  function mergedIsDateDisabled (ts: number): boolean {
    const isDateDisabled = isDateDisabledRef.value
    if (!isDateDisabled) return false
    if (!Array.isArray(props.value)) return isDateDisabled(ts, 'start', null)
    if (selectingPhaseRef.value === 'start') {
      // before you really start to select
      return isDateDisabled(ts, 'start', null)
    } else {
      const { value: memorizedStartDateTime } = memorizedStartDateTimeRef
      // after you starting to select
      if (ts < memorizedStartDateTimeRef.value) {
        return isDateDisabled(ts, 'start', [
          memorizedStartDateTime,
          memorizedStartDateTime
        ])
      } else {
        return isDateDisabled(ts, 'end', [
          memorizedStartDateTime,
          memorizedStartDateTime
        ])
      }
    }
  }
  function resetSelectingStatus (e: MouseEvent): void {
    if (
      startDatesElRef.value?.contains(e.target as Node) ||
      endDatesElRef.value?.contains(e.target as Node)
    ) {
      // do nothing
    } else {
      isSelectingRef.value = false
    }
  }
  function syncCalendarTimeWithValue (value: [number, number] | null): void {
    if (value === null) return
    const [startMoment, endMoment] = value
    startCalendarDateTimeRef.value = startMoment
    if (startOfMonth(endMoment) <= startOfMonth(startMoment)) {
      endCalendarDateTimeRef.value = getTime(
        startOfMonth(addMonths(startMoment, 1))
      )
    } else {
      endCalendarDateTimeRef.value = getTime(startOfMonth(endMoment))
    }
  }
  function handleDateClick (dateItem: DateItem): void {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    if (!isSelectingRef.value) {
      isSelectingRef.value = true
      memorizedStartDateTimeRef.value = dateItem.ts
      changeStartEndTime(dateItem.ts)
    } else {
      isSelectingRef.value = false
      if (closeOnSelectRef.value && type === 'daterange') {
        if (updateValueOnCloseRef.value) {
          closeCalendar()
        } else {
          handleConfirmClick()
        }
      }
    }
  }
  function handleDateMouseEnter (dateItem: DateItem): void {
    if (isSelectingRef.value) {
      if (mergedIsDateDisabled(dateItem.ts)) return
      if (dateItem.ts >= memorizedStartDateTimeRef.value) {
        changeStartEndTime(memorizedStartDateTimeRef.value, dateItem.ts)
      } else {
        changeStartEndTime(dateItem.ts, memorizedStartDateTimeRef.value)
      }
    }
  }
  function handleConfirmClick (): void {
    if (isRangeInvalidRef.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar (): void {
    isSelectingRef.value = false
    if (props.active) {
      panelCommon.doClose()
    }
  }
  function changeStartDateTime (time: number): void {
    if (typeof time !== 'number') {
      time = getTime(time)
    }
    if (props.value === null) {
      panelCommon.doUpdateValue([time, time], false)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue([time, Math.max(props.value[1], time)], false)
    }
  }
  function changeEndDateTime (time: number): void {
    if (typeof time !== 'number') {
      time = getTime(time)
    }
    if (props.value === null) {
      panelCommon.doUpdateValue([time, time], false)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue([Math.min(props.value[0], time), time], false)
    }
  }
  function changeStartEndTime (startTime: number, endTime?: number): void {
    if (endTime === undefined) endTime = startTime
    if (typeof startTime !== 'number') {
      startTime = getTime(startTime)
    }

    let startDefaultTime:
    | { hours: number, minutes: number, seconds: number }
    | undefined
    let endDefaultTime:
    | { hours: number, minutes: number, seconds: number }
    | undefined
    if (type === 'datetimerange') {
      const { defaultTime } = props
      if (Array.isArray(defaultTime)) {
        startDefaultTime = getDefaultTime(defaultTime[0])
        endDefaultTime = getDefaultTime(defaultTime[1])
      } else {
        startDefaultTime = getDefaultTime(defaultTime)
        endDefaultTime = startDefaultTime
      }
    }
    if (startDefaultTime) {
      startTime = getTime(set(startTime, startDefaultTime))
    }
    if (endDefaultTime) {
      endTime = getTime(set(endTime, endDefaultTime))
    }

    panelCommon.doUpdateValue([startTime, endTime], false)
  }
  function sanitizeValue (datetime: number): number {
    if (type === 'datetimerange') {
      return getTime(startOfSecond(datetime))
    } else if (type === 'monthrange') {
      return getTime(startOfMonth(datetime))
    } else {
      // daterange
      return getTime(startOfDay(datetime))
    }
  }
  function handleStartDateInput (value: string): void {
    const date = strictParse(
      value,
      mergedDateFormatRef.value,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (!props.value) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(props.value)) {
        const newValue = set(props.value[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      startDateInput.value = value
    }
  }
  function handleEndDateInput (value: string): void {
    /** strict check when input */
    const date = strictParse(
      value,
      mergedDateFormatRef.value,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(props.value)) {
        const newValue = set(props.value[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      endDateInputRef.value = value
    }
  }
  function handleStartDateInputBlur (): void {
    const date = strictParse(
      startDateInput.value,
      mergedDateFormatRef.value,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    const { value } = props
    if (isValid(date)) {
      if (value === null) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(value)) {
        const newValue = set(value[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function handleEndDateInputBlur (): void {
    const date = strictParse(
      endDateInputRef.value,
      mergedDateFormatRef.value,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    const { value } = props
    if (isValid(date)) {
      if (value === null) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      } else if (Array.isArray(value)) {
        const newValue = set(value[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(sanitizeValue(getTime(newValue)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function refreshDisplayDateString (times?: [number, number]): void {
    // If not selected, display nothing,
    // else update datetime related string
    const { value } = props
    if (value === null || !Array.isArray(value)) {
      startDateInput.value = ''
      endDateInputRef.value = ''
      return
    }
    if (times === undefined) {
      times = value
    }
    startDateInput.value = format(
      times[0],
      mergedDateFormatRef.value,
      panelCommon.dateFnsOptions.value
    )
    endDateInputRef.value = format(
      times[1],
      mergedDateFormatRef.value,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleStartTimePickerChange (value: number | null): void {
    if (value === null) return
    changeStartDateTime(value)
  }
  function handleEndTimePickerChange (value: number | null): void {
    if (value === null) return
    changeEndDateTime(value)
  }
  function handleRangeShortcutMouseenter (shortcut: Shortcuts[string]): void {
    panelCommon.cachePendingValue()
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (!Array.isArray(shortcutValue)) return
    changeStartEndTime(...shortcutValue)
  }
  function handleRangeShortcutClick (shortcut: Shortcuts[string]): void {
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (!Array.isArray(shortcutValue)) return
    changeStartEndTime(...shortcutValue)
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }
  function handleDateRangeClick (
    dateItem: DateItem | MonthItem | YearItem,
    clickType: 'start' | 'end'
  ): void {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    const { value } = props
    if (value === null || !Array.isArray(value)) {
      const newValue = sanitizeValue(
        getTime(set(Date.now(), dateItem.dateObject))
      )
      panelCommon.doUpdateValue(
        clickType === 'start' ? [newValue, newValue] : [newValue, newValue],
        false
      )
      return
    }
    let newValue = clickType === 'start' ? value[0] : value[1]
    newValue = sanitizeValue(getTime(set(newValue, dateItem.dateObject)))
    let needScrollAll = false
    let otherDateValue = clickType === 'start' ? value[1] : value[0]
    if (clickType === 'start' && newValue > value[1]) {
      ;[newValue, otherDateValue] = [otherDateValue, newValue]
      needScrollAll = true
    }
    if (clickType === 'end' && newValue < value[0]) {
      ;[newValue, otherDateValue] = [otherDateValue, newValue]
      needScrollAll = true
    }
    panelCommon.doUpdateValue(
      clickType === 'start'
        ? [newValue, otherDateValue]
        : [otherDateValue, newValue],
      false
    )
    if (needScrollAll) {
      scrollRangeYearMonth(
        clickType === 'start' ? newValue : otherDateValue,
        'start'
      )
      scrollRangeYearMonth(
        clickType === 'start' ? otherDateValue : newValue,
        'end'
      )
    } else {
      scrollRangeYearMonth(newValue, clickType)
    }
  }
  function handleStartYearVlScroll (): void {
    startYearScrollbarRef.value?.sync()
  }
  function handleEndYearVlScroll (): void {
    endYearScrollbarRef.value?.sync()
  }
  function virtualListContainer (type: 'start' | 'end'): HTMLElement {
    if (type === 'start') {
      return startYearVlRef.value?.listElRef as HTMLElement
    } else {
      return endYearVlRef.value?.listElRef as HTMLElement
    }
  }
  function virtualListContent (type: 'start' | 'end'): HTMLElement {
    if (type === 'start') {
      return startYearVlRef.value?.itemsElRef as HTMLElement
    } else {
      return endYearVlRef.value?.itemsElRef as HTMLElement
    }
  }
  const childComponentRefs: PanelChildComponentRefs = {
    startYearVlRef,
    endYearVlRef,
    startMonthScrollbarRef,
    endMonthScrollbarRef,
    startYearScrollbarRef,
    endYearScrollbarRef
  }
  return {
    startDatesElRef,
    endDatesElRef,
    resetSelectingStatus,
    handleDateClick,
    handleDateMouseEnter,
    handleConfirmClick,
    startCalendarPrevYear,
    startCalendarPrevMonth,
    startCalendarNextYear,
    startCalendarNextMonth,
    endCalendarPrevYear,
    endCalendarPrevMonth,
    endCalendarNextMonth,
    endCalendarNextYear,
    mergedIsDateDisabled,
    changeStartEndTime,
    ranges: rangesRef,
    startCalendarMonth: startCalendarMonthRef,
    startCalendarYear: startCalendarYearRef,
    endCalendarMonth: endCalendarMonthRef,
    endCalendarYear: endCalendarYearRef,
    weekdays: weekdaysRef,
    startDateArray: startDateArrayRef,
    endDateArray: endDateArrayRef,
    startYearArray: startYearArrayRef,
    startMonthArray: startMonthArrayRef,
    endYearArray: endYearArrayRef,
    endMonthArray: endMonthArrayRef,
    handleDateRangeClick,
    handleRangeShortcutMouseenter,
    handleRangeShortcutClick,
    ...panelCommon,
    ...validation,
    ...childComponentRefs,
    // datetimerangeonly
    startDateDisplayString: startDateInput,
    endDateInput: endDateInputRef,
    timePickerSize: panelCommon.timePickerSize,
    startTimeValue: startTimeValueRef,
    endTimeValue: endTimeValueRef,
    datePickerSlots,
    shortcuts: shortcutsRef,
    startCalendarDateTime: startCalendarDateTimeRef,
    endCalendarDateTime: endCalendarDateTimeRef,
    handleFocusDetectorFocus: panelCommon.handleFocusDetectorFocus,
    handleStartTimePickerChange,
    handleEndTimePickerChange,
    handleStartDateInput,
    handleStartDateInputBlur,
    handleEndDateInput,
    handleEndDateInputBlur,
    handleStartYearVlScroll,
    handleEndYearVlScroll,
    virtualListContainer,
    virtualListContent,
    onUpdateStartCalendarValue,
    onUpdateEndCalendarValue
  }
}

export { useDualCalendar, useDualCalendarProps }
