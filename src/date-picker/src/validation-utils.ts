/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { computed, Ref } from 'vue'
import { getHours, getMinutes, getSeconds } from 'date-fns/esm'
import type { DatePickerSetupProps } from './DatePicker'
import type {
  IsRangeTimeDisabled,
  IsSingleTimeDisabled,
  IsSingleDateDisabled,
  Value
} from './interface'
import { isNumber } from 'lodash'
// eslint-disable-next-line import/no-cycle
import { isRangeValue } from './utils'

export function uniCalendarValidation (
  props: DatePickerSetupProps,
  mergedValueRef: Ref<Value>
) {
  // date, datetime
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props as {
      isTimeDisabled?: IsSingleTimeDisabled
    }
    const { value } = mergedValueRef
    if (!isNumber(value)) return undefined
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
      isRangeValue(value) ||
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
    if (
      value === null ||
      !(type !== 'datetime') ||
      Array.isArray(value) ||
      isRangeValue(value)
    ) {
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
    isValueInvalidRef,
    isDateInvalidRef,
    // datetime only
    isTimeInvalidRef,
    isDateTimeInvalidRef,
    isHourDisabledRef,
    isMinuteDisabledRef,
    isSecondDisabledRef
  }
}

export function dualCalendarValidation (
  props: DatePickerSetupProps,
  mergedValueRef: Ref<Value>
) {
  // daterange, datetimerange
  const timePickerValidatorRef = computed(() => {
    const { isTimeDisabled } = props as { isTimeDisabled?: IsRangeTimeDisabled }
    const { value } = mergedValueRef
    if (!isRangeValue(value) || !isTimeDisabled) {
      return { from: undefined, to: undefined }
    }
    return {
      from: isTimeDisabled?.(value.from, 'start', value),
      to: isTimeDisabled?.(value.to, 'end', value)
    }
  })

  const timeValidator = {
    isStartHourDisabledRef: computed(
      () => timePickerValidatorRef.value.from?.isHourDisabled
    ),
    isEndHourDisabledRef: computed(
      () => timePickerValidatorRef.value.to?.isHourDisabled
    ),
    isStartMinuteDisabledRef: computed(
      () => timePickerValidatorRef.value.from?.isMinuteDisabled
    ),
    isEndMinuteDisabledRef: computed(
      () => timePickerValidatorRef.value.to?.isMinuteDisabled
    ),
    isStartSecondDisabledRef: computed(
      () => timePickerValidatorRef.value.from?.isSecondDisabled
    ),
    isEndSecondDisabledRef: computed(
      () => timePickerValidatorRef.value.to?.isSecondDisabled
    )
  }
  const isStartDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !isRangeValue(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value.from, 'start', value)
  })
  const isEndDateInvalidRef = computed(() => {
    const { type, isDateDisabled } = props
    const { value } = mergedValueRef
    if (
      value === null ||
      !isRangeValue(value) ||
      !['daterange', 'datetimerange'].includes(type) ||
      !isDateDisabled
    ) {
      return false
    }
    return isDateDisabled(value.to, 'end', value)
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
      isStartHourDisabledRef,
      isStartMinuteDisabledRef,
      isStartSecondDisabledRef
    } = timeValidator
    const startTimeInvalid =
      (isStartHourDisabledRef.value
        ? isStartHourDisabledRef.value(startHours)
        : false) ||
      (isStartMinuteDisabledRef.value
        ? isStartMinuteDisabledRef.value(startMinutes, startHours)
        : false) ||
      (isStartSecondDisabledRef.value
        ? isStartSecondDisabledRef.value(startSeconds, startMinutes, startHours)
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
      isEndHourDisabledRef,
      isEndMinuteDisabledRef,
      isEndSecondDisabledRef
    } = timeValidator
    const endTimeInvalid =
      (isEndHourDisabledRef.value
        ? isEndHourDisabledRef.value(endHours)
        : false) ||
      (isEndMinuteDisabledRef.value
        ? isEndMinuteDisabledRef.value(endMinutes, endHours)
        : false) ||
      (isEndSecondDisabledRef.value
        ? isEndSecondDisabledRef.value(endSeconds, endMinutes, endHours)
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
    isStartDateInvalidRef,
    isEndDateInvalidRef,
    isStartTimeInvalidRef,
    isEndTimeInvalidRef,
    isStartValueInvalidRef,
    isEndValueInvalidRef,
    isRangeInvalidRef
  }
}
