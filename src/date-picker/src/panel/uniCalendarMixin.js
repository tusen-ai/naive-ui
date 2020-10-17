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
  isValid
} from 'date-fns'
import { dateArray, strictParse } from '../../../_utils/component/datePicker'
import commonCalendarMixin from './commonCalendarMixin'

export default {
  mixins: [
    commonCalendarMixin
  ],
  props: {
    value: {
      type: Number,
      required: false,
      default: null
    },
    actions: {
      type: Array,
      default: () => ['now', 'clear', 'confirm']
    }
  },
  data () {
    return {
      displayDateString: '',
      calendarDateTime: new Date(),
      now: new Date(),
      selectedDate: null
    }
  },
  computed: {
    dateArray () {
      return dateArray(this.calendarDateTime, this.valueAsDateTime, this.now)
    },
    calendarMonth () {
      return this.localeNs[format(this.calendarDateTime, 'MMM')]
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
    }
  },
  created () {
    if (this.valueAsDateTime !== null) {
      this.displayDateString = format(this.valueAsDateTime, this.dateFormat)
      this.calendarDateTime = this.valueAsDateTime
    } else {
      this.displayDateString = ''
    }
  },
  methods: {
    isCalendarDateDisabled (timestamp) {
      const {
        isDateDisabled
      } = this
      if (!isDateDisabled) return false
      return isDateDisabled(timestamp)
    },
    handleDateInput (value) {
      const date = strictParse(value, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateTime) {
          this.doUpdateValue(getTime(this.adjustValue(new Date())))
        } else {
          const newDateTime = set(this.valueAsDateTime, {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.doUpdateValue(getTime(this.adjustValue(newDateTime)))
        }
      }
    },
    handleDateInputBlur () {
      const date = strictParse(this.displayDateString, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateTime) {
          this.doUpdateValue(getTime(this.adjustValue(new Date())))
        } else {
          const newDateTime = set(this.valueAsDateTime, {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.doUpdateValue(getTime(this.adjustValue(newDateTime)))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    clearSelectedDateTime () {
      this.doUpdateValue(null)
      this.displayDateString = ''
    },
    setSelectedDateTimeToNow () {
      this.doUpdateValue(getTime(this.adjustValue(new Date())))
      this.calendarDateTime = new Date()
    },
    handleDateClick (dateItem) {
      if (this.isCalendarDateDisabled(dateItem.timestamp)) {
        return
      }
      let newSelectedDateTime = new Date()
      if (this.valueAsDateTime !== null) {
        newSelectedDateTime = this.valueAsDateTime
      }
      newSelectedDateTime = set(newSelectedDateTime, dateItem.dateObject)
      this.selectedDate = dateItem.dateObject
      this.doUpdateValue(getTime(this.adjustValue(newSelectedDateTime)))
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
      this.doConfirm()
      this.closeCalendar()
    },
    closeCalendar () {
      if (this.active) {
        this.doClose()
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
