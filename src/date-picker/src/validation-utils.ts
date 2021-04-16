/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { computed, ComputedRef } from 'vue'
import { getHours, getMinutes, getSeconds } from 'date-fns'
import type { DatePickerSetupProps } from './DatePicker'
import {
  IsRangeTimeDisabled,
  IsSingleTimeDisabled,
  IsSingleDateDisabled
} from './interface'

export function uniCalendarValidation (
  props: DatePickerSetupProps,
  mergedValueRef: ComputedRef<number | [number, number] | null>
) {
  // date, datetime
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props as {
      isTimeDisabled?: IsSingleTimeDisabled
    }
    const { value } = mergedValueRef
    if (value === null || Array.isArray(value)) return undefined
    return isTimeDisabled?.(value)
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
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      Array.isArray(value) ||
      !['date', 'datetime'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return (isDateDisabled as IsSingleDateDisabled)(value)
  })
  const isTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !(type !== 'datetime') || Array.isArray(value)) {
      return false
    }
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
    // date & datetime
    isValueInvalid: isValueInvalidRef,
    isDateInvalid: isDateInvalidRef,
    // datetime only
    isTimeInvalid: isTimeInvalidRef,
    isDateTimeInvalid: isDateTimeInvalidRef,
    isHourDisabled: isHourDisabledRef,
    isMinuteDisabled: isMinuteDisabledRef,
    isSecondDisabled: isSecondDisabledRef
  }
}

export function dualCalendarValidation (
  props: DatePickerSetupProps,
  mergedValueRef: ComputedRef<number | [number, number] | null>
) {
  // daterange, datetimerange
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props as { isTimeDisabled?: IsRangeTimeDisabled }
    const { value } = mergedValueRef
    if (!Array.isArray(value) || !isTimeDisabled) {
      return [undefined, undefined]
    }
    return [
      isTimeDisabled?.(value[0], 'start', value),
      isTimeDisabled?.(value[1], 'end', value)
    ]
  })
  const timeValidator = {
    isStartHourDisabled: computed(
      () => timePickerValidatorRef.value[0]?.isHourDisabled
    ),
    isEndHourDisabled: computed(
      () => timePickerValidatorRef.value[1]?.isHourDisabled
    ),
    isStartMinuteDisabled: computed(
      () => timePickerValidatorRef.value[0]?.isMinuteDisabled
    ),
    isEndMinuteDisabled: computed(
      () => timePickerValidatorRef.value[1]?.isMinuteDisabled
    ),
    isStartSecondDisabled: computed(
      () => timePickerValidatorRef.value[0]?.isSecondDisabled
    ),
    isEndSecondDisabled: computed(
      () => timePickerValidatorRef.value[1]?.isSecondDisabled
    )
  }
  const isStartDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !Array.isArray(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value[0], 'start', value)
  })
  const isEndDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !Array.isArray(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value[1], 'end', value)
  })
  const isStartTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
      return false
    }
    const startHours = getHours(value[0])
    const startMinutes = getMinutes(value[0])
    const startSeconds = getSeconds(value[0])
    const {
      isStartHourDisabled,
      isStartMinuteDisabled,
      isStartSecondDisabled
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
    return startTimeInvalid
  })
  const isEndTimeInvalidRef = computed(() => {
    const { type } = props
    const { value } = mergedValueRef
    if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
      return false
    }
    const endHours = getHours(value[1])
    const endMinutes = getMinutes(value[1])
    const endSeconds = getSeconds(value[1])
    const {
      isEndHourDisabled,
      isEndMinuteDisabled,
      isEndSecondDisabled
    } = timeValidator
    const endTimeInvalid =
      (isEndHourDisabled.value ? isEndHourDisabled.value(endHours) : false) ||
      (isEndMinuteDisabled.value
        ? isEndMinuteDisabled.value(endMinutes, endHours)
        : false) ||
      (isEndSecondDisabled.value
        ? isEndSecondDisabled.value(endSeconds, endMinutes, endHours)
        : false)
    return endTimeInvalid
  })
  const isStartValueInvalidRef = computed(() => {
    return isStartDateInvalidRef.value || isStartTimeInvalidRef.value
  })
  const isEndValueInvalidRef = computed(() => {
    return isEndDateInvalidRef.value || isEndTimeInvalidRef.value
  })
  const isRangeInvalidRef = computed(() => {
    return isStartValueInvalidRef.value || isEndValueInvalidRef.value
  })
  return {
    ...timeValidator,
    isStartDateInvalid: isStartDateInvalidRef,
    isEndDateInvalid: isEndDateInvalidRef,
    isStartTimeInvalid: isStartTimeInvalidRef,
    isEndTimeInvalid: isEndTimeInvalidRef,
    isStartValueInvalid: isStartValueInvalidRef,
    isEndValueInvalid: isEndValueInvalidRef,
    isRangeInvalid: isRangeInvalidRef
  }
}
