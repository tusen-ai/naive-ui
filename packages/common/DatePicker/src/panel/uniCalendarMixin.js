import moment from 'moment'
import commonCalendarMixin from './commonCalendarMixin'
import { setDate } from '../utils'

export default {
  mixins: [commonCalendarMixin],
  props: {
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
      calendarDateTime: moment(),
      currentDateTime: moment()
    }
  },
  computed: {
    /**
     * If value is valid return null.
     * If value is not valid, return moment(value)
     */
    valueAsMoment () {
      if (this.value === null || this.value === undefined) return null
      const newSelectedDateTime = moment(this.value)
      if (newSelectedDateTime.isValid()) {
        return newSelectedDateTime
      } else {
        return null
      }
    }
  },
  watch: {
    calendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (newCalendarDateTime.isValid() && oldCalendarDateTime) {
        if (
          newCalendarDateTime.year() !== oldCalendarDateTime.year() ||
          newCalendarDateTime.month() !== oldCalendarDateTime.month()
        ) {
          this.banTransitionOneTick()
        }
      }
    },
    valueAsMoment (newValue) {
      if (newValue !== null) {
        this.displayDateString = newValue.format(this.dateFormat)
        this.calendarDateTime = moment(this.valueAsMoment)
      } else {
        this.displayDateString = ''
      }
    }
  },
  created () {
    if (this.valueAsMoment !== null) {
      this.displayDateString = this.valueAsMoment.format(this.dateFormat)
      this.calendarDateTime = moment(this.valueAsMoment)
    } else {
      this.displayDateString = ''
    }
  },
  methods: {
    handleClickOutside () {
      this.closeCalendar()
    },
    setValue (newSelectedDateTime) {
      if (newSelectedDateTime === null || newSelectedDateTime === undefined) {
        this.$emit('input', null)
      } else if (newSelectedDateTime.isValid()) {
        const adjustedDateTime = this.adjustValue(newSelectedDateTime)
        if (this.valueAsMoment === null || adjustedDateTime.valueOf() !== this.valueAsMoment.valueOf()) {
          this.refreshDisplayDateString(adjustedDateTime)
          this.$emit('input', adjustedDateTime.valueOf())
        }
      }
    },
    handleDateInput (value) {
      const date = moment(value, this.dateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMoment) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.$emit('input', this.adjustValue(newValue).valueOf())
        } else {
          const newValue = this.valueAsMoment
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.$emit('input', this.adjustValue(newValue).valueOf())
        }
      } else {
        // do nothing
      }
    },
    handleDateInputBlur () {
      const date = moment(this.displayDateString, this.dateValidateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMoment) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.$emit('input', this.adjustValue(newValue).valueOf())
        } else {
          const newValue = this.valueAsMoment
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.$emit('input', this.adjustValue(newValue).valueOf())
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
      this.$emit('input', this.adjustValue(moment()).valueOf())
      this.calendarDateTime = moment()
    },
    handleDateClick (dateItem) {
      // console.log(dateItem)
      let newSelectedDateTime = moment()
      if (this.valueAsMoment !== null) {
        newSelectedDateTime = moment(this.valueAsMoment)
      }
      newSelectedDateTime = setDate(newSelectedDateTime, dateItem)
      // console.log(newSelectedDateTime.format('YYYY MM DD'))
      this.$emit('input', this.adjustValue(newSelectedDateTime).valueOf())
    },
    /**
     * If not selected, display nothing,
     * else update datetime related string
     */
    refreshDisplayDateString (time) {
      if (this.valueAsMoment === null) {
        this.displayDateString = ''
        return
      }
      if (time === undefined) {
        time = this.valueAsMoment
      }
      this.displayDateString = time.format(this.dateFormat)
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
      this.calendarDateTime = moment(this.calendarDateTime).add(1, 'year')
    },
    prevYear () {
      this.calendarDateTime = moment(this.calendarDateTime).subtract(1, 'year')
    },
    nextMonth () {
      this.calendarDateTime = moment(this.calendarDateTime).add(1, 'month')
    },
    prevMonth () {
      this.calendarDateTime = moment(this.calendarDateTime).subtract(1, 'month')
    }
  }
}
