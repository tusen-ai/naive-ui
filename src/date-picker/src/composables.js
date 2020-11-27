import {
  toRef,
  inject
} from 'vue'
import {
  useKeyboard
} from 'vooks'

export function uniCalendarSetup () {
  const NDatePicker = inject('NDatePicker')
  return {
    keyboardState: useKeyboard(),
    isDateDisabled: toRef(NDatePicker, 'isDateDisabled'),
    isTimeDisabled: toRef(NDatePicker, 'isTimeDisabled'),
    isDateInvalid: toRef(NDatePicker, 'isDateInvalid'),
    isTimeInvalid: toRef(NDatePicker, 'isTimeInvalid'),
    isDateTimeInvalid: toRef(NDatePicker, 'isDateTimeInvalid'),
    isHourDisabled: toRef(NDatePicker, 'isHourDisabled'),
    isMinuteDisabled: toRef(NDatePicker, 'isMinuteDisabled'),
    isSecondDisabled: toRef(NDatePicker, 'isSecondDisabled')
  }
}

export function dualCalendarSetup () {
  const NDatePicker = inject('NDatePicker')
  return {
    keyboardState: useKeyboard(),
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
}
