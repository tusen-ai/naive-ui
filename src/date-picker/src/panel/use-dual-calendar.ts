import { inject, computed, watch, ref, type ExtractPropTypes } from 'vue'
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
  getTime,
  startOfQuarter
} from 'date-fns/esm'
import type { VirtualListInst } from 'vueuc'
import {
  dateArray,
  type DateItem,
  type MonthItem,
  type YearItem,
  strictParse,
  yearArray,
  monthArray,
  getDefaultTime,
  pluckValueFromRange,
  type QuarterItem,
  quarterArray
} from '../utils'
import { usePanelCommon, usePanelCommonProps } from './use-panel-common'
import {
  datePickerInjectionKey,
  type RangePanelChildComponentRefs,
  type Shortcuts
} from '../interface'
import type { ScrollbarInst } from '../../../_internal'
import { MONTH_ITEM_HEIGHT, START_YEAR } from '../config'

const useDualCalendarProps = {
  ...usePanelCommonProps,
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  actions: {
    type: Array,
    default: () => ['clear', 'confirm']
  }
} as const

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useDualCalendar (
  props: ExtractPropTypes<typeof useDualCalendarProps>,
  type:
  | 'daterange'
  | 'datetimerange'
  | 'monthrange'
  | 'quarterrange'
  | 'yearrange'
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
    datePickerSlots
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
  const { value } = props
  const defaultCalendarStartTime =
    props.defaultCalendarStartTime ??
    (Array.isArray(value) && typeof value[0] === 'number'
      ? value[0]
      : Date.now())
  const startCalendarDateTimeRef = ref(defaultCalendarStartTime)
  const endCalendarDateTimeRef = ref(
    props.defaultCalendarEndTime ??
      (Array.isArray(value) && typeof value[1] === 'number'
        ? value[1]
        : getTime(addMonths(defaultCalendarStartTime, 1)))
  )
  adjustCalendarTimes(true)
  const nowRef = ref(Date.now())
  const isSelectingRef = ref(false)
  const memorizedStartDateTimeRef = ref<number>(0)

  const mergedDateFormatRef = computed(
    () => props.dateFormat || localeRef.value.dateFormat
  )

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
  const startQuarterArrayRef = computed(() => {
    const startValue = pluckValueFromRange(props.value, 'start')
    return quarterArray(startValue ?? Date.now(), startValue, nowRef.value)
  })
  const endQuarterArrayRef = computed(() => {
    const endValue = pluckValueFromRange(props.value, 'end')
    return quarterArray(endValue ?? Date.now(), endValue, nowRef.value)
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
    if (type === 'daterange' || type === 'datetimerange') {
      if (
        getYear(value) !== getYear(oldValue) ||
        getMonth(value) !== getMonth(oldValue)
      ) {
        panelCommon.disableTransitionOneTick()
      }
    }
  }
  watch(startCalendarDateTimeRef, handleCalendarChange)
  watch(endCalendarDateTimeRef, handleCalendarChange)
  // change calendar
  function adjustCalendarTimes (byStartCalendarTime: boolean): void {
    const startTime = startOfMonth(startCalendarDateTimeRef.value)
    const endTime = startOfMonth(endCalendarDateTimeRef.value)
    if (props.bindCalendarMonths || startTime >= endTime) {
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
  // for daterange & datetimerange
  function handleDateClick (dateItem: DateItem): void {
    if (!isSelectingRef.value) {
      isSelectingRef.value = true
      memorizedStartDateTimeRef.value = dateItem.ts
      changeStartEndTime(dateItem.ts, dateItem.ts, 'done')
    } else {
      isSelectingRef.value = false
      const { value } = props
      if (props.panel && Array.isArray(value)) {
        changeStartEndTime(value[0], value[1], 'done')
      } else {
        if (closeOnSelectRef.value && type === 'daterange') {
          if (updateValueOnCloseRef.value) {
            closeCalendar()
          } else {
            handleConfirmClick()
          }
        }
      }
    }
  }
  function handleDateMouseEnter (dateItem: DateItem): void {
    if (isSelectingRef.value) {
      if (mergedIsDateDisabled(dateItem.ts)) return
      if (dateItem.ts >= memorizedStartDateTimeRef.value) {
        changeStartEndTime(
          memorizedStartDateTimeRef.value,
          dateItem.ts,
          'wipPreview'
        )
      } else {
        changeStartEndTime(
          dateItem.ts,
          memorizedStartDateTimeRef.value,
          'wipPreview'
        )
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
      panelCommon.doUpdateValue([time, time], props.panel)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue(
        [time, Math.max(props.value[1], time)],
        props.panel
      )
    }
  }
  function changeEndDateTime (time: number): void {
    if (typeof time !== 'number') {
      time = getTime(time)
    }
    if (props.value === null) {
      panelCommon.doUpdateValue([time, time], props.panel)
    } else if (Array.isArray(props.value)) {
      panelCommon.doUpdateValue(
        [Math.min(props.value[0], time), time],
        props.panel
      )
    }
  }
  function changeStartEndTime (
    startTime: number,
    endTime: number,
    source: 'shortcutPreview' | 'wipPreview' | 'done'
  ): void {
    if (typeof startTime !== 'number') {
      startTime = getTime(startTime)
    }

    if (source !== 'shortcutPreview') {
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
    }

    panelCommon.doUpdateValue(
      [startTime, endTime],
      props.panel && source === 'done'
    )
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
    changeStartEndTime(shortcutValue[0], shortcutValue[1], 'shortcutPreview')
  }
  function handleRangeShortcutClick (shortcut: Shortcuts[string]): void {
    const shortcutValue = panelCommon.getShortcutValue(shortcut)
    if (!Array.isArray(shortcutValue)) return
    changeStartEndTime(shortcutValue[0], shortcutValue[1], 'done')
    panelCommon.clearPendingValue()
    handleConfirmClick()
  }
  function justifyColumnsScrollState (
    value: [number, number],
    type: 'start' | 'end'
  ): void
  function justifyColumnsScrollState (): void
  function justifyColumnsScrollState (
    value?: [number, number] | undefined,
    type?: 'start' | 'end' | undefined
  ): void {
    const mergedValue = value === undefined ? props.value : value
    if (value === undefined || type === 'start') {
      if (startMonthScrollbarRef.value) {
        const monthIndex = !Array.isArray(mergedValue)
          ? getMonth(Date.now())
          : getMonth(mergedValue[0])
        startMonthScrollbarRef.value.scrollTo({
          debounce: false,
          index: monthIndex,
          elSize: MONTH_ITEM_HEIGHT
        })
      }
      if (startYearVlRef.value) {
        const yearIndex =
          (!Array.isArray(mergedValue)
            ? getYear(Date.now())
            : getYear(mergedValue[0])) - START_YEAR
        startYearVlRef.value.scrollTo({ index: yearIndex, debounce: false })
      }
    }
    if (value === undefined || type === 'end') {
      if (endMonthScrollbarRef.value) {
        const monthIndex = !Array.isArray(mergedValue)
          ? getMonth(Date.now())
          : getMonth(mergedValue[1])
        endMonthScrollbarRef.value.scrollTo({
          debounce: false,
          index: monthIndex,
          elSize: MONTH_ITEM_HEIGHT
        })
      }
      if (endYearVlRef.value) {
        const yearIndex =
          (!Array.isArray(mergedValue)
            ? getYear(Date.now())
            : getYear(mergedValue[1])) - START_YEAR
        endYearVlRef.value.scrollTo({ index: yearIndex, debounce: false })
      }
    }
  }
  // only for monthrange
  function handleColItemClick (
    dateItem: MonthItem | QuarterItem | YearItem,
    clickType: 'start' | 'end'
  ): void {
    const { value } = props
    const noCurrentValue = !Array.isArray(value)
    const itemTs =
      dateItem.type === 'year' && type !== 'yearrange'
        ? noCurrentValue
          ? set(dateItem.ts, {
            month: getMonth(
              type === 'quarterrange'
                ? startOfQuarter(new Date())
                : new Date()
            )
          }).valueOf()
          : set(dateItem.ts, {
            month: getMonth(
              type === 'quarterrange'
                ? startOfQuarter(value[clickType === 'start' ? 0 : 1])
                : value[clickType === 'start' ? 0 : 1]
            )
          }).valueOf()
        : dateItem.ts
    if (noCurrentValue) {
      const partialValue = sanitizeValue(itemTs)
      const nextValue: [number, number] = [partialValue, partialValue]
      panelCommon.doUpdateValue(nextValue, props.panel)
      justifyColumnsScrollState(nextValue, 'start')
      justifyColumnsScrollState(nextValue, 'end')
      panelCommon.disableTransitionOneTick()
      return
    }
    const nextValue: [number, number] = [value[0], value[1]]
    let otherPartsChanged = false
    if (clickType === 'start') {
      nextValue[0] = sanitizeValue(itemTs)
      if (nextValue[0] > nextValue[1]) {
        nextValue[1] = nextValue[0]
        otherPartsChanged = true
      }
    } else {
      nextValue[1] = sanitizeValue(itemTs)
      if (nextValue[0] > nextValue[1]) {
        nextValue[0] = nextValue[1]
        otherPartsChanged = true
      }
    }
    panelCommon.doUpdateValue(nextValue, props.panel)
    switch (type) {
      case 'monthrange':
      case 'quarterrange':
        panelCommon.disableTransitionOneTick()
        if (otherPartsChanged) {
          justifyColumnsScrollState(nextValue, 'start')
          justifyColumnsScrollState(nextValue, 'end')
        } else {
          justifyColumnsScrollState(nextValue, clickType)
        }
        break
      case 'yearrange':
        panelCommon.disableTransitionOneTick()
        justifyColumnsScrollState(nextValue, 'start')
        justifyColumnsScrollState(nextValue, 'end')
    }
  }
  function handleStartYearVlScroll (): void {
    startYearScrollbarRef.value?.sync()
  }
  function handleEndYearVlScroll (): void {
    endYearScrollbarRef.value?.sync()
  }
  function virtualListContainer (type: 'start' | 'end'): HTMLElement | null {
    if (type === 'start') {
      return startYearVlRef.value?.listElRef || null
    } else {
      return endYearVlRef.value?.listElRef || null
    }
  }
  function virtualListContent (type: 'start' | 'end'): HTMLElement | null {
    if (type === 'start') {
      return startYearVlRef.value?.itemsElRef || null
    } else {
      return endYearVlRef.value?.itemsElRef || null
    }
  }
  const childComponentRefs: RangePanelChildComponentRefs = {
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
    handleDateClick,
    handleColItemClick,
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
    startQuarterArray: startQuarterArrayRef,
    endYearArray: endYearArrayRef,
    endMonthArray: endMonthArrayRef,
    endQuarterArray: endQuarterArrayRef,
    isSelecting: isSelectingRef,
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
    justifyColumnsScrollState,
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
