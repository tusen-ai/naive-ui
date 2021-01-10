import { ref, computed, inject, watch, toRef } from 'vue'
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

function useCalendar (props, type) {
  const calendar = usePanelCommon(props)
  const NDatePicker = inject('NDatePicker')
  const { locale } = NDatePicker
  const validation = {
    isDateDisabled: toRef(NDatePicker, 'isDateDisabled'),
    isTimeDisabled: toRef(NDatePicker, 'isTimeDisabled'),
    isDateInvalid: toRef(NDatePicker, 'isDateInvalid'),
    isTimeInvalid: toRef(NDatePicker, 'isTimeInvalid'),
    isDateTimeInvalid: toRef(NDatePicker, 'isDateTimeInvalid'),
    isHourDisabled: toRef(NDatePicker, 'isHourDisabled'),
    isMinuteDisabled: toRef(NDatePicker, 'isMinuteDisabled'),
    isSecondDisabled: toRef(NDatePicker, 'isSecondDisabled')
  }
  const displayDateStringRef = ref(
    props.value === null ? '' : format(props.value, props.dateFormat)
  )
  const calendarDateTimeRef = ref(
    props.value === null ? new Date() : props.value
  )
  const nowRef = ref(new Date())
  const selectedDateRef = ref(null)
  const valueAsDateTimeRef = computed(() => {
    const { value } = props
    if (value === null || value === undefined) return null
    return new Date(value)
  })
  const dateArrayRef = computed(() => {
    return dateArray(
      calendarDateTimeRef.value,
      valueAsDateTimeRef.value,
      nowRef.value
    )
  })
  const calendarMonthRef = computed(() => {
    return locale[format(calendarDateTimeRef.value, 'MMM')]
  })
  const calendarYearRef = computed(() => {
    return format(calendarDateTimeRef.value, 'yyyy')
  })
  const timeFormat = computed(() => {
    return /(H|h|K|k|m|s).*(H|h|K|k|m|s)/.exec(props.format)[0]
  })
  watch(calendarDateTimeRef, (value, oldValue) => {
    if (!isSameMonth(value, oldValue)) {
      calendar.disableTransitionOneTick()
    }
  })
  watch(toRef(props, 'active'), (value) => {
    if (value) {
      calendar.memorizedValue.value = props.value
    } else {
      if (validation.isTimeInvalid.value || validation.isDateInvalid.value) {
        calendar.doUpdateValue(calendar.memorizedValue.value)
      }
    }
  })
  watch(toRef(props, 'value'), (value) => {
    if (value !== null) {
      displayDateStringRef.value = format(value, props.dateFormat)
      calendarDateTimeRef.value = value
    } else {
      displayDateStringRef.value = ''
    }
  })
  function adjustValue (value) {
    if (type === 'datetime') return startOfSecond(value)
    if (type === 'date') return startOfDay(value)
  }
  function isCalendarDateDisabled (timestamp) {
    const { isDateDisabled } = this
    if (!isDateDisabled) return false
    return isDateDisabled(timestamp)
  }
  function handleDateInput (value) {
    const date = strictParse(value, props.dateFormat, new Date())
    if (isValid(date)) {
      if (!valueAsDateTimeRef.value) {
        calendar.doUpdateValue(getTime(adjustValue(new Date())))
      } else {
        const newDateTime = set(valueAsDateTimeRef.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        calendar.doUpdateValue(getTime(adjustValue(newDateTime)))
      }
    }
  }
  function handleDateInputBlur () {
    const date = strictParse(
      displayDateStringRef.value,
      props.dateFormat,
      new Date()
    )
    if (isValid(date)) {
      if (!valueAsDateTimeRef.value) {
        calendar.doUpdateValue(getTime(adjustValue(new Date())))
      } else {
        const newDateTime = set(valueAsDateTimeRef.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        calendar.doUpdateValue(getTime(adjustValue(newDateTime)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function clearSelectedDateTime () {
    calendar.doUpdateValue(null)
    displayDateStringRef.value = ''
  }
  function setSelectedDateTimeToNow () {
    calendar.doUpdateValue(getTime(adjustValue(new Date())))
    calendarDateTimeRef.value = new Date()
  }
  function handleDateClick (dateItem) {
    if (isCalendarDateDisabled(dateItem.timestamp)) {
      return
    }
    let newSelectedDateTime = new Date()
    if (valueAsDateTimeRef.value !== null) {
      newSelectedDateTime = valueAsDateTimeRef.value
    }
    newSelectedDateTime = set(newSelectedDateTime, dateItem.dateObject)
    selectedDateRef.value = dateItem.dateObject
    calendar.doUpdateValue(getTime(adjustValue(newSelectedDateTime)))
  }
  /**
   * If not selected, display nothing,
   * else update datetime related string
   */
  function refreshDisplayDateString (time) {
    if (valueAsDateTimeRef.value === null) {
      displayDateStringRef.value = ''
      return
    }
    if (time === undefined) {
      time = valueAsDateTimeRef.value
    }
    displayDateStringRef.value = format(time, props.dateFormat)
  }
  function handleConfirmClick () {
    if (validation.isDateInvalid || validation.isTimeInvalid.value) {
      return
    }
    calendar.doConfirm()
    closeCalendar()
  }
  function closeCalendar () {
    if (props.active) {
      calendar.doClose()
    }
  }
  function nextYear () {
    calendarDateTimeRef.value = addYears(calendarDateTimeRef.value, 1)
  }
  function prevYear () {
    calendarDateTimeRef.value = addYears(calendarDateTimeRef.value, -1)
  }
  function nextMonth () {
    calendarDateTimeRef.value = addMonths(calendarDateTimeRef.value, 1)
  }
  function prevMonth () {
    calendarDateTimeRef.value = addMonths(calendarDateTimeRef.value, -1)
  }
  return {
    dateArray: dateArrayRef,
    calendarYear: calendarYearRef,
    calendarMonth: calendarMonthRef,
    setSelectedDateTimeToNow,
    handleDateClick,
    handleDateInputBlur,
    handleDateInput,
    clearSelectedDateTime,
    timeFormat,
    handleConfirmClick,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth
  }
}

useCalendar.components = usePanelCommon.components

useCalendar.props = {
  value: {
    type: Number,
    default: undefined
  },
  actions: {
    type: Array,
    default: () => ['now', 'clear', 'confirm']
  },
  ...usePanelCommon
}

export { useCalendar }
