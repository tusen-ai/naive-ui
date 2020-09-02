import commonCalendarMixin from './commonCalendarMixin'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import isSameMonth from 'date-fns/isSameMonth'
import getTime from 'date-fns/getTime'
import format from 'date-fns/format'
import set from 'date-fns/set'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import isValid from 'date-fns/isValid'
import startOfHour from 'date-fns/startOfHour'
import setHours from 'date-fns/setHours'
import { dateArray, strictParse } from '../../../_utils/component/datePicker'

export default {
  mixins: [commonCalendarMixin],
  props: {
    theme: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      required: false,
      default: null
    },
    actions: {
      type: Array,
      default: () => ['now', 'clear', 'confirm']
    },
    isDateDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    isTimeDisabled: {
      type: Function,
      default: () => {
        return {
          isHourDisabled: () => false,
          isMinuteDisabled: () => false,
          isSecondDisabled: () => false
        }
      }
    }
  },
  data () {
    return {
      displayDateString: '',
      calendarDateTime: new Date(),
      currentDateTime: new Date(),
      selectedDate: null
    }
  },
  computed: {
    dateArray () {
      return dateArray(this.calendarDateTime, this.valueAsDateTime, this.currentDateTime)
    },
    calendarMonth () {
      return this.localeNamespace[format(this.calendarDateTime, 'MMM')]
    },
    calendarYear () {
      return format(this.calendarDateTime, 'yyyy')
    },
    /**
     * If value is valid return null.
     * If value is not valid, return moment(value)
     */
    valueAsDateTime () {
      if (this.value === null || this.value === undefined) return null
      return new Date(this.value)
    },
    isDateInvalid () {
      if (this.value === null) {
        return false
      }
      return this.isDateDisabled(new Date(this.value))
    },
    isTimeInvalid () {
      if (!this.value) {
        return false
      }
      const time = new Date(this.value)
      const hour = time.getHours()
      const minute = time.getMinutes()
      const second = time.getMinutes()
      return this.isHourDisabled(hour) ||
          this.isMinuteDisabled(minute, hour) ||
          this.isSecondDisabled(second, minute, hour)
    },
    isDateTimeInvalid () {
      return this.isDateInvalid || this.isTimeInvalid
    },
    currentDate () {
      if (!this.value) {
        return null
      }
      return setHours(startOfHour(new Date(this.value)), 0).getTime()
    },
    timePickerValidator () {
      return this.isTimeDisabled(this.currentDate)
    },
    isHourDisabled () {
      return this.timePickerValidator.isHourDisabled || (() => false)
    },
    isMinuteDisabled () {
      return this.timePickerValidator.isMinuteDisabled || (() => false)
    },
    isSecondDisabled () {
      return this.timePickerValidator.isSecondDisabled || (() => false)
    }
  },
  watch: {
    calendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (
        !isSameMonth(newCalendarDateTime, oldCalendarDateTime)
      ) {
        this.disableTransitionOneTick()
      }
    },
    valueAsDateTime (newValue) {
      if (newValue !== null) {
        this.displayDateString = format(newValue, this.dateFormat)
        this.calendarDateTime = newValue
      } else {
        this.displayDateString = ''
      }
    },
    isDateTimeInvalid (value) {
      this.NDatePicker.setInvalidStatus(value)
    }
  },
  created () {
    if (this.valueAsDateTime !== null) {
      this.displayDateString = format(this.valueAsDateTime, this.dateFormat)
      this.calendarDateTime = this.valueAsDateTime
    } else {
      this.displayDateString = ''
    }
    this.NDatePicker.setInvalidStatus(this.isDateTimeInvalid)
  },
  methods: {
    handleClickOutside () {
      this.closeCalendar()
    },
    handleDateInput (value) {
      const date = strictParse(value, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateTime) {
          this.$emit('input', getTime(this.adjustValue(new Date())))
        } else {
          const newDateTime = set(this.valueAsDateTime, {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.$emit('input', getTime(this.adjustValue(newDateTime)))
        }
      }
    },
    handleDateInputBlur () {
      const date = strictParse(this.displayDateString, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateTime) {
          this.$emit('input', getTime(this.adjustValue(new Date())))
        } else {
          const newDateTime = set(this.valueAsDateTime, {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.$emit('input', getTime(this.adjustValue(newDateTime)))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    clearSelectedDateTime () {
      this.$emit('input', null)
      this.displayDateString = ''
    },
    setSelectedDateTimeToNow () {
      this.$emit('input', getTime(this.adjustValue(new Date())))
      this.calendarDateTime = new Date()
    },
    handleDateClick (dateItem) {
      if (this.isDateDisabled(dateItem.timestamp)) {
        return
      }
      let newSelectedDateTime = new Date()
      if (this.valueAsDateTime !== null) {
        newSelectedDateTime = this.valueAsDateTime
      }
      newSelectedDateTime = set(newSelectedDateTime, dateItem.dateObject)
      this.selectedDate = dateItem.dateObject
      this.$emit('input', getTime(this.adjustValue(newSelectedDateTime)))
    },
    /**
     * If not selected, display nothing,
     * else update datetime related string
     */
    refreshDisplayDateString (time) {
      if (this.valueAsDateTime === null) {
        this.displayDateString = ''
        return
      }
      if (time === undefined) {
        time = this.valueAsDateTime
      }
      this.displayDateString = format(time, this.dateFormat)
    },
    handleConfirmClick () {
      if (this.isDateInvalid || this.isTimeInvalid) {
        return
      }
      this.$emit('confirm')
      this.closeCalendar()
    },
    closeCalendar () {
      if (this.active) {
        this.$emit('close')
      }
    },
    nextYear () {
      this.calendarDateTime = addYears(this.calendarDateTime, 1)
    },
    prevYear () {
      this.calendarDateTime = addYears(this.calendarDateTime, -1)
    },
    nextMonth () {
      this.calendarDateTime = addMonths(this.calendarDateTime, 1)
    },
    prevMonth () {
      this.calendarDateTime = addMonths(this.calendarDateTime, -1)
    }
  }
}
