// import moment from 'moment'
import commonCalendarMixin from './commonCalendarMixin'
import { isValid, getDate, getMonth, getYear, getTime, isSameMonth, format, addMonths, addYears, set } from 'date-fns'
import { dateArray, strictParse } from '../../../../utils/dateUtils'

// import { setYMD } from '../utils'

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
    debug: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => ['now', 'confirm']
    }
  },
  data () {
    return {
      displayDateString: '',
      calendarDateTime: new Date(), // moment(),
      currentDateTime: new Date() // moment()
    }
  },
  computed: {
    dateArray () {
      return dateArray(this.calendarDateTime, this.valueAsDateTime, this.currentDateTime)
    },
    calendarMonth () {
      return format(this.calendarDateTime, 'MMM', 'Invalid Month')
    },
    calendarYear () {
      return format(this.calendarDateTime, 'y', 'Invalid Year')
    },
    /**
     * If value is valid return null.
     * If value is not valid, return moment(value)
     */
    valueAsDateTime () {
      if (this.value === null || this.value === undefined) return null
      return new Date(this.value)
      // const newSelectedDateTime = new Date(this.value)
      // return new
      // if (newSelectedDateTime.isValid()) {
      //   return newSelectedDateTime
      // } else {
      //   return null
      // }
    }
  },
  watch: {
    calendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      // if (newCalendarDateTime.isValid() && oldCalendarDateTime) {
      if (
        !isSameMonth(newCalendarDateTime, oldCalendarDateTime)
      // newCalendarDateTime.year() !== oldCalendarDateTime.year() ||
      // newCalendarDateTime.month() !== oldCalendarDateTime.month()
      ) {
        this.banTransitionOneTick()
      }
      // }
    },
    valueAsDateTime (newValue) {
      if (newValue !== null) {
        this.displayDateString = format(newValue, this.dateFormat) // newValue.format(this.dateFormat)
        this.calendarDateTime = newValue
      } else {
        this.displayDateString = ''
      }
    }
  },
  created () {
    if (this.valueAsDateTime !== null) {
      this.displayDateString = format(this.valueAsDateTime, this.dateFormat) // this.valueAsDateTime.format(this.dateFormat)
      this.calendarDateTime = this.valueAsDateTime
    } else {
      this.displayDateString = ''
    }
  },
  methods: {
    handleClickOutside () {
      this.closeCalendar()
    },
    // setValue (newSelectedDateTime) {
    //   if (newSelectedDateTime === null || newSelectedDateTime === undefined) {
    //     this.$emit('input', null)
    //   } else {
    //     const adjustedDateTime = this.adjustValue(newSelectedDateTime)
    //     if (this.valueAsDateTime === null || adjustedDateTime.valueOf() !== this.valueAsDateTime.valueOf()) {
    //       this.refreshDisplayDateString(adjustedDateTime)
    //       this.$emit('input', adjustedDateTime.valueOf())
    //     }
    //   }
    // },
    handleDateInput (value) {
      const date = strictParse(value, this.dateFormat, new Date())// moment(value, this.dateFormat, true)
      // console.log('handle date input', value)
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
      // if (date.isValid()) {
      //   if (!this.valueAsDateTime) {
      //     const newValue = moment()
      //     newValue.year(date.year())
      //     newValue.month(date.month())
      //     newValue.date(date.date())
      //     this.$emit('input', this.adjustValue(newValue).valueOf())
      //   } else {
      //     const newValue = this.valueAsDateTime
      //     newValue.year(date.year())
      //     newValue.month(date.month())
      //     newValue.date(date.date())
      //     this.$emit('input', this.adjustValue(newValue).valueOf())
      //   }
      // } else {
      //   // do nothing
      // }
    },
    handleDateInputBlur () {
      const date = strictParse(this.displayDateString, this.dateFormat, new Date())
      // console.log('blur', this.displayDateString, date)
      // const date = moment(this.displayDateString, this.dateValidateFormat, true)
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
        // if (!this.valueAsDateTime) {
        //   const newValue = moment()
        //   newValue.year(date.year())
        //   newValue.month(date.month())
        //   newValue.date(date.date())
        //   this.$emit('input', this.adjustValue(newValue).valueOf())
        // } else {
        //   const newValue = this.valueAsDateTime
        //   newValue.year(date.year())
        //   newValue.month(date.month())
        //   newValue.date(date.date())
        //   this.$emit('input', this.adjustValue(newValue).valueOf())
        // }
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
      this.calendarDateTime = new Date() // moment()
    },
    handleDateClick (dateItem) {
      // console.log(dateItem)
      let newSelectedDateTime = new Date()
      if (this.valueAsDateTime !== null) {
        newSelectedDateTime = this.valueAsDateTime
      }
      newSelectedDateTime = set(newSelectedDateTime, dateItem.dateObject)
      // console.log(newSelectedDateTime.format('YYYY MM DD'))
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
