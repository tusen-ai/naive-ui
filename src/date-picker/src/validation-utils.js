import { computed, toRef } from 'vue'
import { getHours, getMinutes, getSeconds } from 'date-fns'

export function uniCalendarValidation (props) {
  // date, datetime
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled, value } = props
    if (value === null) return undefined
    return isTimeDisabled && isTimeDisabled(props.value)
  })
  const isHourDisabledRef = computed(() => {
    return timePickerValidatorRef.value?.isHourDisabled
  })
  const isMinuteDisabledRef = computed(() => {
    return timePickerValidatorRef.value?.isMinuteDisabled
  })
  const isSecondDisabledRef = computed(() => {
    return timePickerValidatorRef.value?.isSecondDisabled
  })
  const isDateInvalidRef = computed(() => {
    const { value, type, isDateDisabled } = props
    if (
      value === null ||
      !['date', 'datetime'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value)
  })
  const isTimeInvalidRef = computed(() => {
    const { value, type } = props
    if (value === null || !(type !== 'datetime')) return false
    const time = new Date(value)
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getMinutes()
    return (
      (isHourDisabledRef.value ? isHourDisabledRef.value(hour) : false) ||
      (isMinuteDisabledRef.value
        ? isMinuteDisabledRef.value(minute, hour)
        : false) ||
      (isSecondDisabledRef.value
        ? isSecondDisabledRef.value(second, minute, hour)
        : false)
    )
  })
  const isDateTimeInvalidRef = computed(() => {
    return isDateInvalidRef.value || isTimeInvalidRef.value
  })
  const isValueInvalidRef = computed(() => {
    const { type } = props
    if (type === 'date') return isDateInvalidRef.value
    if (type === 'datetime') return isDateTimeInvalidRef.value
    return false
  })
  return {
    isValueInvalid: isValueInvalidRef,
    isDateInvalid: isDateInvalidRef,
    isTimeInvalid: isTimeInvalidRef,
    isDateTimeInvalid: isDateTimeInvalidRef,
    isHourDisabled: isHourDisabledRef,
    isMinuteDisabled: isMinuteDisabledRef,
    isSecondDisabled: isSecondDisabledRef
  }
}

export function dualCalendarValidation (props) {
  // daterange, datetimerange
  const timePickerValidatorRef = computed(() => {
    const { value, isTimeDisabled } = props
    if (value === null || !isTimeDisabled) return [undefined, undefined]
    return [
      isTimeDisabled && isTimeDisabled(value[0], 'start', value),
      isTimeDisabled && isTimeDisabled(value[0], 'end', value)
    ]
  })
  const isHourDisabledRef = computed(() => {
    return [
      timePickerValidatorRef.value[0]?.isHourDisabled,
      timePickerValidatorRef.value[1]?.isHourDisabled
    ]
  })
  const isMinuteDisabledRef = computed(() => {
    return [
      timePickerValidatorRef.value[0]?.isMinuteDisabled,
      timePickerValidatorRef.value[1]?.isMinuteDisabled
    ]
  })
  const isSecondDisabledRef = computed(() => {
    return [
      timePickerValidatorRef.value[0]?.isSecondDisabled,
      timePickerValidatorRef.value[1]?.isSecondDisabled
    ]
  })
  const timeValidator = {
    isStartHourDisabled: toRef(isHourDisabledRef.value, '0'),
    isEndHourDisabled: toRef(isHourDisabledRef.value, '1'),
    isStartMinuteDisabled: toRef(isMinuteDisabledRef.value, '0'),
    isEndMinuteDisabled: toRef(isMinuteDisabledRef.value, '1'),
    isStartSecondDisabled: toRef(isSecondDisabledRef.value, '0'),
    isEndSecondDisabled: toRef(isSecondDisabledRef.value, '1')
  }
  const isDateInvalidRef = computed(() => {
    const { value, type, isDateDisabled } = props
    if (
      value === null ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return [
      isDateDisabled(value[0], 'start', value),
      isDateDisabled(value[0], 'end', value)
    ]
  })
  const isTimeInvalidRef = computed(() => {
    const { value, type } = props
    if (value === null || type !== 'datetimerange') return false
    const startHours = getHours(value[0])
    const startMinutes = getMinutes(value[0])
    const startSeconds = getSeconds(value[0])
    const endHours = getHours(value[1])
    const endMinutes = getMinutes(value[1])
    const endSeconds = getSeconds(value[1])
    const {
      isStartHourDisabled,
      isStartMinuteDisabled,
      isStartSecondDisabled,
      isEndHourDisabled,
      isEndMinuteDisabled,
      isEndSecondDisabled
    } = timeValidator
    const startTimeInvalid =
      (isStartHourDisabled.value
        ? isStartHourDisabled.value(startHours)
        : false) ||
      (isStartMinuteDisabled.value
        ? isStartMinuteDisabled.value(startMinutes, startHours)
        : false) ||
      (isStartSecondDisabled.value
        ? isStartSecondDisabled.value(startSeconds, startMinutes, startHours)
        : false)
    const endTimeInvalid =
      (isEndHourDisabled.value ? isEndHourDisabled.value(endHours) : false) ||
      (isEndMinuteDisabled.value
        ? isEndMinuteDisabled.value(endMinutes, endHours)
        : false) ||
      (isEndSecondDisabled.value
        ? isEndSecondDisabled.value(endSeconds, endMinutes, endHours)
        : false)
    return [startTimeInvalid, endTimeInvalid]
  })
  const isValueInvalidRef = computed(() => {
    return [
      isDateInvalidRef.value[0] || isTimeInvalidRef.value[0],
      isDateInvalidRef.value[1] || isTimeInvalidRef.value[1]
    ]
  })
  const isRangeInvalidRef = computed(() => {
    return isValueInvalidRef.value[0] || isValueInvalidRef.value[1]
  })
  return {
    ...timeValidator,
    isStartDateInvalid: toRef(isDateInvalidRef.value, '0'),
    isEndDateInvalid: toRef(isDateInvalidRef.value, '1'),
    isStartTimeInvalid: toRef(isTimeInvalidRef.value, '0'),
    isEndTimeInvalid: toRef(isTimeInvalidRef.value, '1'),
    isStartValueInvalid: toRef(isValueInvalidRef.value, '0'),
    isEndValueInvalid: toRef(isValueInvalidRef.value, '1'),
    isRangeInvalid: isRangeInvalidRef
  }
}
