import { toRef, inject, computed, watch, ref } from 'vue'
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
import { warn } from '../../../_utils'
import { dateArray, strictParse } from '../utils'
import { usePanelCommon } from './use-panel-common'

function useDualCalendar (props, type = 'datetime') {
  const NDatePicker = inject('NDatePicker')
  const { locale } = NDatePicker
  const calendar = usePanelCommon(props)
  const validation = {
    isDateDisabled: toRef(NDatePicker, 'isDateDisabled'),
    isTimeDisabled: toRef(NDatePicker, 'isTimeDisabled'),
    isStartHourDisabled: toRef(NDatePicker, 'isStartHourDisabled'),
    isEndHourDisabled: toRef(NDatePicker, 'isEndHourDisabled'),
    isStartMinuteDisabled: toRef(NDatePicker, 'isStartMinuteDisabled'),
    isEndMinuteDisabled: toRef(NDatePicker, 'isEndMinuteDisabled'),
    isStartSecondDisabled: toRef(NDatePicker, 'isStartSecondDisabled'),
    isEndSecondDisabled: toRef(NDatePicker, 'isEndSecondDisabled'),
    isStartDateInvalid: toRef(NDatePicker, 'isStartDateInvalid'),
    isEndDateInvalid: toRef(NDatePicker, 'isEndDateInvalid'),
    isStartTimeInvalid: toRef(NDatePicker, 'isStartTimeInvalid'),
    isEndTimeInvalid: toRef(NDatePicker, 'isEndTimeInvalid'),
    isStartValueInvalid: toRef(NDatePicker, 'isStartValueInvalid'),
    isEndValueInvalid: toRef(NDatePicker, 'isEndValueInvalid'),
    isRangeInvalid: toRef(NDatePicker, 'isRangeInvalid')
  }
  const startDatesRef = ref(null)
  const endDatesRef = ref(null)

  const { value, dateFormat } = props

  const startDateDisplayStringRef = ref(
    value === null ? '' : format(value[0], dateFormat)
  )
  const endDateDisplayStringRef = ref(
    value === null ? '' : format(value[1], dateFormat)
  )
  syncCalendarTimeWithValue(value)

  const startCalendarDateTimeRef = ref(new Date())
  const endCalendarDateTimeRef = ref(addMonths(new Date(), 1))
  const nowRef = ref(new Date())
  const isSelectingRef = ref(false)
  const memorizedStartDateTimeRef = ref(null)

  // derived computed
  const timeFormatRef = computed(() => {
    return /(H|h|K|k|m|s).*(H|h|K|k|m|s)/.exec(props.format)[0]
  })
  const valueAsDateArrayRef = computed(() => {
    const { value } = props
    if (value === null || value === undefined) return null
    const startMoment = new Date(value[0])
    const endMoment = new Date(value[1])
    // If value is invalid return null.
    // If value is valid, return Date(value)
    if (isValid(startMoment) && isValid(endMoment)) {
      return [startMoment, endMoment]
    } else return null
  })
  const selectingPhaseRef = computed(() => {
    if (isSelectingRef.value) return 'end'
    else return 'start'
  })
  const startDateArrayRef = computed(() => {
    return dateArray(
      startCalendarDateTimeRef.value,
      valueAsDateArrayRef.value,
      nowRef.value
    )
  })
  const endDateArrayRef = computed(() => {
    return dateArray(
      endCalendarDateTimeRef.value,
      this.valueAsDateArray,
      this.now
    )
  })
  const startCalendarMonthRef = computed(() => {
    return locale[format(startCalendarDateTimeRef.value, 'MMM')]
  })
  const endCalendarMonthRef = computed(() => {
    return locale[format(endCalendarDateTimeRef.value, 'MMM')]
  })
  const startCalendarYearRef = computed(() => {
    return format(startCalendarDateTimeRef.value, 'yyyy')
  })
  const endCalendarYearRef = computed(() => {
    return format(endCalendarDateTimeRef.value, 'yyyy')
  })
  const startTimeValueRef = computed(() => {
    const { value } = props
    if (value !== null) return value[0]
    return null
  })
  const endTimeValueRef = computed(() => {
    const { value } = props
    if (value !== null) return value[1]
    return null
  })
  // watch
  watch(toRef(props, 'active'), (value) => {
    if (value) {
      if (type === 'datetimerange') {
        calendar.memorizedValue.value = props.value
        syncCalendarTimeWithValue(props.value)
      } else if (type === 'daterange') {
      }
    } else {
      isSelectingRef.value = false
      if (type === 'datetimerange') {
        if (validation.isRangeInvalid.value) {
          calendar.doUpdateValue(calendar.memorizedValue.value)
        }
      } else if (type === 'daterange') {
      }
    }
  })
  watch(toRef(props, 'value'), (value) => {
    if (value !== null) {
      const [startMoment, endMoment] = value
      const { dateFormat } = props
      startDateDisplayStringRef.value = format(startMoment, dateFormat)
      endDateDisplayStringRef.value = format(endMoment, dateFormat)
      if (!isSelectingRef.value) {
        syncCalendarTimeWithValue(value)
      }
    } else {
      startDateDisplayStringRef.value = ''
      endDateDisplayStringRef.value = ''
    }
  })
  function handleCalendarChange (value, oldValue) {
    if (isValid(value) && oldValue) {
      if (
        getYear(value) !== getYear(oldValue) ||
        getMonth(value) !== getMonth(oldValue)
      ) {
        calendar.disableTransitionOneTick()
      }
    }
  }
  watch(startCalendarDateTimeRef, handleCalendarChange)
  watch(endCalendarDateTimeRef, handleCalendarChange)
  // change calendar
  function adjustCalendarTimes (byStartCalendarTime) {
    const startTime = startOfMonth(startCalendarDateTimeRef.value)
    const endTime = startOfMonth(endCalendarDateTimeRef.value)
    if (startTime >= endTime) {
      if (byStartCalendarTime) {
        endCalendarDateTimeRef.value = addMonths(startTime, 1)
      } else {
        startCalendarDateTimeRef.value = addMonths(endTime, -1)
      }
    }
  }
  function startCalendarNextYear () {
    startCalendarDateTimeRef.value = addMonths(
      startCalendarDateTimeRef.value,
      12
    )
    adjustCalendarTimes(true)
  }
  function startCalendarPrevYear () {
    startCalendarDateTimeRef.value = addMonths(
      startCalendarDateTimeRef.value,
      -12
    )
    adjustCalendarTimes(true)
  }
  function startCalendarNextMonth () {
    startCalendarDateTimeRef.value = addMonths(
      startCalendarDateTimeRef.value,
      1
    )
    adjustCalendarTimes(true)
  }
  function startCalendarPrevMonth () {
    startCalendarDateTimeRef.value = addMonths(
      startCalendarDateTimeRef.value,
      -1
    )
    adjustCalendarTimes(true)
  }
  function endCalendarNextYear () {
    endCalendarDateTimeRef.value = addMonths(endCalendarDateTimeRef.value, 12)
    adjustCalendarTimes(false)
  }
  function endCalendarPrevYear () {
    endCalendarDateTimeRef.value = addMonths(endCalendarDateTimeRef.value, -12)
    adjustCalendarTimes(false)
  }
  function endCalendarNextMonth () {
    endCalendarDateTimeRef.value = addMonths(endCalendarDateTimeRef.value, 1)
    adjustCalendarTimes(false)
  }
  function endCalendarPrevMonth () {
    endCalendarDateTimeRef.value = addMonths(endCalendarDateTimeRef.value, -1)
    adjustCalendarTimes(false)
  }
  function isCalendarDateDisabled (timestamp) {
    const { isDateDisabled } = props
    if (!isDateDisabled) return false
    if (selectingPhaseRef.value === 'start') {
      return isDateDisabled(timestamp, 'start', props.value)
    } else {
      if (timestamp < props.value[1]) {
        return isDateDisabled(timestamp, 'start', props.value)
      } else {
        return isDateDisabled(timestamp, 'end', props.value)
      }
    }
  }
  function resetSelectingStatus (e) {
    if (startDatesRef.contains(e.target) || endDatesRef.contains(e.target)) {
      // do nothing
    } else {
      isSelectingRef.value = false
    }
  }
  function syncCalendarTimeWithValue (value) {
    if (value === null) return
    const [startMoment, endMoment] = value
    startCalendarDateTimeRef.value = new Date(startMoment)
    if (startOfMonth(endMoment) <= startOfMonth(startMoment)) {
      endCalendarDateTimeRef.value = startOfMonth(addMonths(startMoment, 1))
    } else {
      endCalendarDateTimeRef.value = startOfMonth(endMoment)
    }
  }
  function handleDateClick (dateItem) {
    if (isCalendarDateDisabled(dateItem.timestamp)) {
      return
    }
    if (!isSelectingRef.value) {
      isSelectingRef.value = true
      memorizedStartDateTimeRef.value = dateItem.timestamp
      changeStartEndTime(dateItem.timestamp)
    } else {
      isSelectingRef.value = false
    }
  }
  function handleDateMouseEnter (dateItem) {
    if (isSelectingRef.value) {
      if (isCalendarDateDisabled(dateItem.timestamp)) return
      if (dateItem.timestamp >= memorizedStartDateTimeRef.value) {
        changeStartEndTime(memorizedStartDateTimeRef.value, dateItem.timestamp)
      } else {
        changeStartEndTime(dateItem.timestamp, memorizedStartDateTimeRef.value)
      }
    }
  }
  function handleConfirmClick () {
    if (validation.isRangeInvalid.value) {
      return
    }
    calendar.doConfirm()
    closeCalendar()
  }
  function closeCalendar () {
    isSelectingRef.value = false
    if (props.active) {
      calendar.doClose()
    }
  }
  function changeStartDateTime (time) {
    if (typeof time !== 'number') {
      time = getTime(time)
    }
    if (props.value === null) {
      calendar.doUpdateValue([time, time])
    } else {
      calendar.doUpdateValue([time, Math.max(props.value[1], time)])
    }
  }
  function changeEndDateTime (time) {
    if (typeof time !== 'number') {
      time = getTime(time)
    }
    if (props.value === null) {
      calendar.doUpdateValue([time, time])
    } else {
      calendar.doUpdateValue([Math.min(props.value[0], time), time])
    }
  }
  function changeStartEndTime (startTime, endTime) {
    if (endTime === undefined) endTime = startTime
    if (typeof startTime !== 'number') {
      startTime = getTime(startTime)
    }
    if (typeof endTime !== 'number') {
      endTime = getTime(endTime)
    }
    calendar.doUpdateValue([startTime, endTime])
  }
  function adjustValue (datetime) {
    if (type === 'datetimerange') {
      return startOfSecond(datetime)
    }
    if (type === 'daterange') return startOfDay(datetime)
  }
  function handleStartDateInput (value) {
    const date = strictParse(value, props.dateFormat, new Date())
    if (isValid(date)) {
      if (!this.valueAsDateArray) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        this.changeStartDateTime(this.adjustValue(newValue))
      } else {
        const newValue = set(this.valueAsDateArray[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        this.changeStartDateTime(this.adjustValue(newValue))
      }
    }
  }
  function handleEndDateInput (value) {
    /** strict check when input */
    const date = strictParse(value, this.dateFormat, new Date())
    if (isValid(date)) {
      if (!this.valueAsDateArray) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        this.changeEndDateTime(this.adjustValue(newValue))
      } else {
        const newValue = set(this.valueAsDateArray[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        this.changeEndDateTime(this.adjustValue(newValue))
      }
    } else {
      // do nothing
    }
  }
  function handleStartDateInputBlur () {
    const date = strictParse(
      startDateDisplayStringRef.value,
      props.dateFormat,
      new Date()
    )
    const { value } = props
    if (isValid(date)) {
      if (value === null) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(adjustValue(newValue))
      } else {
        const newValue = set(value[0], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeStartDateTime(adjustValue(newValue))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function handleEndDateInputBlur () {
    const date = strictParse(
      endDateDisplayStringRef.value,
      props.dateFormat,
      new Date()
    )
    const { value } = props
    if (isValid(date)) {
      if (value === null) {
        const newValue = set(new Date(), {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(adjustValue(newValue))
      } else {
        const newValue = set(value[1], {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        changeEndDateTime(adjustValue(newValue))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function refreshDisplayDateString (times) {
    // If not selected, display nothing,
    // else update datetime related string
    const { value } = props
    if (value === null) {
      startDateDisplayStringRef.value = ''
      endDateDisplayStringRef.value = ''
      return
    }
    const { dateFormat } = props
    if (times === undefined) {
      times = value
    }
    startDateDisplayStringRef.value = format(times[0], dateFormat)
    endDateDisplayStringRef.value = format(times[1], dateFormat)
  }
  function handleStartTimePickerChange (value) {
    changeStartDateTime(value)
  }
  function handleEndTimePickerChange (value) {
    changeEndDateTime(value)
  }
  return {
    resetSelectingStatus,
    handleDateClick,
    handleDateMouseEnter,
    handlePanelKeyDown: calendar.handlePanelKeyDown,
    handlePanelFocus: calendar.handlePanelFocus,
    handleConfirmClick,
    startCalendarPrevYear,
    startCalendarPrevMonth,
    startCalendarNextYear,
    startCalendarNextMonth,
    endCalendarPrevYear,
    endCalendarPrevMonth,
    endCalendarNextMonth,
    endCalendarNextYear,
    isCalendarDateDisabled,
    startCalendarMonth: startCalendarMonthRef,
    startCalendarYear: startCalendarYearRef,
    endCalendarMonth: endCalendarMonthRef,
    endCalendarYear: endCalendarYearRef,
    weekdays: calendar.weekdays,
    startDateArray: startDateArrayRef,
    endDateArray: endDateArrayRef,
    ...validation,
    // datetimerangeonly
    startDateDisplayString: startDateDisplayStringRef,
    endDateDisplayString: endDateDisplayStringRef,
    timePickerSize: calendar.timePickerSize,
    startTimeValue: startTimeValueRef,
    endTimeValue: endTimeValueRef,
    timeFormat: timeFormatRef,
    handleStartTimePickerChange,
    handleEndTimePickerChange,
    handleStartDateInput,
    handleStartDateInputBlur,
    handleEndDateInput,
    handleEndDateInputBlur
  }
}

useDualCalendar.props = {
  ...usePanelCommon.props,
  value: {
    validator (value) {
      if (value === null) return true
      if (Array.isArray(value)) {
        if (value.length === 2) {
          if (typeof value[0] === 'number' && typeof value[1] === 'number') {
            return value[1] >= value[0]
          } else {
            if (__DEV__) {
              warn(
                'date-picker/datetimerange',
                'Start time should be no later than end time.'
              )
            }
          }
        }
      }
      return false
    },
    required: true,
    default: null
  },
  actions: {
    type: Array,
    default: () => ['clear', 'confirm']
  }
}

useDualCalendar.components = usePanelCommon.components

export { useDualCalendar }
