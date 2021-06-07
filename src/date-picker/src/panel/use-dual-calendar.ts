import { inject, computed, watch, ref, ExtractPropTypes } from 'vue'
import {
  addMonths,
  format,
  getTime,
  getYear,
  getMonth,
  startOfMonth,
  isValid,
  startOfSecond,
  startOfDay,
  set,
  getDate
} from 'date-fns'
import { dateArray, DateItem, strictParse } from '../utils'
import { usePanelCommon } from './use-panel-common'
import { datePickerInjectionKey } from '../interface'
import type { Value } from '../interface'

const useDualCalendarProps = {
  ...usePanelCommon.props,
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
    rangesRef
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
  const startCalendarDateTimeRef = ref(Date.now())
  const endCalendarDateTimeRef = ref(getTime(addMonths(Date.now(), 1)))
  const nowRef = ref(Date.now())
  const isSelectingRef = ref(false)
  const memorizedStartDateTimeRef = ref<number>(0)

  const { value, dateFormat } = props

  const startDateInput = ref(
    Array.isArray(value)
      ? format(value[0], dateFormat, panelCommon.dateFnsOptions.value)
      : ''
  )
  const endDateInputRef = ref(
    Array.isArray(value)
      ? format(value[1], dateFormat, panelCommon.dateFnsOptions.value)
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
      localeRef.value.firstDayOfWeek
    )
  })
  const endDateArrayRef = computed(() => {
    return dateArray(
      endCalendarDateTimeRef.value,
      props.value,
      nowRef.value,
      localeRef.value.firstDayOfWeek
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
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && Array.isArray(value)) {
        const [startMoment, endMoment] = value
        const { dateFormat } = props
        startDateInput.value = format(
          startMoment,
          dateFormat,
          panelCommon.dateFnsOptions.value
        )
        endDateInputRef.value = format(
          endMoment,
          dateFormat,
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
  let cachedValue: Value | null = null
  let cached = false
  function cachePendingValue (): void {
    cachedValue = props.value
    cached = true
  }
  function clearPendingValue (): void {
    cached = false
  }
  function restorePendingValue (): void {
    if (cached) {
      panelCommon.doUpdateValue(cachedValue, false)
      cached = false
    }
  }
  function changeStartEndTime (startTime: number, endTime?: number): void {
    if (endTime === undefined) endTime = startTime
    if (typeof startTime !== 'number') {
      startTime = getTime(startTime)
    }
    if (typeof endTime !== 'number') {
      endTime = getTime(endTime)
    }
    panelCommon.doUpdateValue([startTime, endTime], false)
  }
  function sanitizeValue (datetime: number): number {
    if (type === 'datetimerange') {
      return getTime(startOfSecond(datetime))
    } else {
      // daterange
      return getTime(startOfDay(datetime))
    }
  }
  function handleStartDateInput (value: string): void {
    const date = strictParse(
      value,
      props.dateFormat,
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
      props.dateFormat,
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
      props.dateFormat,
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
      props.dateFormat,
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
    const { dateFormat } = props
    if (times === undefined) {
      times = value
    }
    startDateInput.value = format(
      times[0],
      dateFormat,
      panelCommon.dateFnsOptions.value
    )
    endDateInputRef.value = format(
      times[1],
      dateFormat,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleStartTimePickerChange (value: number): void {
    changeStartDateTime(value)
  }
  function handleEndTimePickerChange (value: number): void {
    changeEndDateTime(value)
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
    cachePendingValue,
    clearPendingValue,
    restorePendingValue,
    ranges: rangesRef,
    startCalendarMonth: startCalendarMonthRef,
    startCalendarYear: startCalendarYearRef,
    endCalendarMonth: endCalendarMonthRef,
    endCalendarYear: endCalendarYearRef,
    weekdays: weekdaysRef,
    startDateArray: startDateArrayRef,
    endDateArray: endDateArrayRef,
    ...panelCommon,
    ...validation,
    // datetimerangeonly
    startDateDisplayString: startDateInput,
    endDateInput: endDateInputRef,
    timePickerSize: panelCommon.timePickerSize,
    startTimeValue: startTimeValueRef,
    endTimeValue: endTimeValueRef,
    handleFocusDetectorFocus: panelCommon.handleFocusDetectorFocus,
    handleStartTimePickerChange,
    handleEndTimePickerChange,
    handleStartDateInput,
    handleStartDateInputBlur,
    handleEndDateInput,
    handleEndDateInputBlur
  }
}

useDualCalendar.props = useDualCalendarProps

export { useDualCalendar }
