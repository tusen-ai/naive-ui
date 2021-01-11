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
  const panelCommon = usePanelCommon(props)
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
  const dateArrayRef = computed(() => {
    return dateArray(calendarDateTimeRef.value, props.value, nowRef.value)
  })
  const calendarMonthRef = computed(() => {
    return locale[format(calendarDateTimeRef.value, 'MMM')]
  })
  const calendarYearRef = computed(() => {
    return format(calendarDateTimeRef.value, 'yyyy')
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
  watch(toRef(props, 'value'), (value) => {
    if (value !== null) {
      displayDateStringRef.value = format(value, props.dateFormat)
      calendarDateTimeRef.value = value
    } else {
      displayDateStringRef.value = ''
    }
  })
  function sanitizeValue (value) {
    if (type === 'datetime') return startOfSecond(value)
    if (type === 'date') return startOfDay(value)
  }
  function mergedIsDateDisabled (ts) {
    const {
      isDateDisabled: { value: isDateDisabled }
    } = validation
    if (!isDateDisabled) return false
    return isDateDisabled(ts) === true
  }
  function handleDateInput (value) {
    const date = strictParse(value, props.dateFormat, new Date())
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(new Date())))
      } else {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(newDateTime)))
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
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(new Date())))
      } else {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(getTime(sanitizeValue(newDateTime)))
      }
    } else {
      refreshDisplayDateString()
    }
  }
  function clearSelectedDateTime () {
    panelCommon.doUpdateValue(null)
    displayDateStringRef.value = ''
  }
  function handleNowClick () {
    panelCommon.doUpdateValue(getTime(sanitizeValue(new Date())))
    calendarDateTimeRef.value = new Date()
  }
  function handleDateClick (dateItem) {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    let newValue = new Date()
    if (props.value !== null) {
      newValue = props.value
    } else {
      newValue = new Date()
    }
    newValue = set(newValue, dateItem.dateObject)
    selectedDateRef.value = dateItem.dateObject
    panelCommon.doUpdateValue(getTime(sanitizeValue(newValue)))
  }
  function refreshDisplayDateString (time) {
    // If not selected, display nothing,
    // else update datetime related string
    if (props.value === null) {
      displayDateStringRef.value = ''
      return
    }
    if (time === undefined) {
      time = props.value
    }
    displayDateStringRef.value = format(time, props.dateFormat)
  }
  function handleConfirmClick () {
    if (validation.isDateInvalid.value || validation.isTimeInvalid.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar () {
    if (props.active) {
      panelCommon.doClose()
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
  function handleTimePickerChange (value) {
    panelCommon.doUpdateValue(value)
  }
  return {
    selfRef: panelCommon.selfRef,
    locale: panelCommon.locale,
    NDatePicker,
    dateArray: dateArrayRef,
    calendarYear: calendarYearRef,
    calendarMonth: calendarMonthRef,
    weekdays: panelCommon.weekdays,
    transitionDisabled: panelCommon.transitionDisabled,
    mergedIsDateDisabled,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth,
    handleNowClick,
    handleClearClick: panelCommon.handleClearClick,
    handleConfirmClick,
    handleFocusDetectorFocus: panelCommon.handleFocusDetectorFocus,
    ...validation,
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

useCalendar.components = usePanelCommon.components

useCalendar.props = {
  ...usePanelCommon.props,
  value: {
    type: Number,
    default: null
  },
  actions: {
    type: Array,
    default: () => ['now', 'clear', 'confirm']
  }
}

export { useCalendar }
