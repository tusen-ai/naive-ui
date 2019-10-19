// import moment from 'moment'
import { isValid, getMonth, getYear, getTime, format, addMonths, startOfMonth } from 'date-fns'
import { dateArray } from '../utils'

import commonCalendarMixin from './commonCalendarMixin'

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
      validator (value) {
        if (value === null) return true
        if (Array.isArray(value)) {
          if (value.length === 2) {
            if (typeof value[0] === 'number' && typeof value[1] === 'number') {
              return value[1] >= value[0]
            }
          }
        }
        return false
      },
      required: true,
      default: null
    },
    debug: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => ['clear', 'confirm']
    }
  },
  data () {
    return {
      startDateDisplayString: '',
      endDateDisplayString: '',
      startCalendarDateTime: new Date(),
      endCalendarDateTime: addMonths(new Date(), 1),
      currentDateTime: new Date(),
      calendar: [],
      isSelecting: false,
      startDateTime: null,
      memorizedStartDateTime: null,
      endDateTime: null
    }
  },
  computed: {
    startDateArray () {
      return dateArray(this.startCalendarDateTime, this.valueAsDateArray, this.currentDateTime)
    },
    endDateArray () {
      return dateArray(this.endCalendarDateTime, this.valueAsDateArray, this.currentDateTime)
    },
    startCalendarMonth () {
      return format(this.startCalendarDateTime, 'MMMM')
    },
    endCalendarMonth () {
      return format(this.endCalendarDateTime, 'MMMM')
    },
    startCalendarYear () {
      return format(this.startCalendarDateTime, 'yyyy')
    },
    endCalendarYear () {
      return format(this.endCalendarDateTime, 'yyyy')
    },
    startTimeValue () {
      if (this.value !== null) return this.value[0]
      else return null
    },
    endTimeValue () {
      if (this.value !== null) return this.value[1]
      else return null
    },
    /**
     * If value is valid return null.
     * If value is not valid, return moment(value)
     */
    valueAsDateArray () {
      if (this.value === null || this.value === undefined) return null
      const startMoment = new Date(this.value[0])
      const endMoment = new Date(this.value[1])
      if (isValid(startMoment) && isValid(startMoment)) {
        return [startMoment, endMoment]
      } else return null
    }
  },
  watch: {
    startCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (isValid(newCalendarDateTime) && oldCalendarDateTime) {
        if (
          getYear(newCalendarDateTime) !== getYear(oldCalendarDateTime) ||
          getMonth(newCalendarDateTime) !== getMonth(oldCalendarDateTime)
        ) {
          this.banTransitionOneTick()
        }
      }
    },
    endCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (isValid(newCalendarDateTime) && oldCalendarDateTime) {
        if (
          getYear(newCalendarDateTime) !== getYear(oldCalendarDateTime) ||
          getMonth(newCalendarDateTime) !== getMonth(oldCalendarDateTime)
        ) {
          this.banTransitionOneTick()
        }
      }
    }
  },
  methods: {
    resetSelectingStatus (e) {
      if (this.$refs.startDates.contains(e.target) || this.$refs.endDates.contains(e.target)) {
        // do nothing
      } else {
        this.isSelecting = false
      }
    },
    handleClickOutside () {
      this.closeCalendar()
    },
    syncCalendarTimeWithValue (value) {
      // console.log('syncCalendarTimeWithValue', value)
      if (value === null) return
      const [startMoment, endMoment] = value
      this.startCalendarDateTime = new Date(startMoment)
      if (startOfMonth(endMoment) <= startOfMonth(startMoment)) {
        this.endCalendarDateTime = startOfMonth(addMonths(startMoment, 1))
      } else {
        this.endCalendarDateTime = startOfMonth(endMoment)
      }
    },
    handleDateClick (dateItem) {
      if (!this.isSelecting) {
        this.isSelecting = true
        this.memorizedStartDateTime = dateItem.timestamp
        this.changeStartEndTime(dateItem.timestamp)
      } else {
        this.isSelecting = false
      }
    },
    handleDateMouseEnter (dateItem) {
      if (this.isSelecting) {
        if (dateItem.timestamp >= this.memorizedStartDateTime) {
          this.changeStartEndTime(this.memorizedStartDateTime, dateItem.timestamp)
        } else {
          this.changeStartEndTime(dateItem.timestamp, this.memorizedStartDateTime)
        }
      }
    },
    handleConfirmClick () {
      this.$emit('confirm')
      this.closeCalendar()
    },
    closeCalendar () {
      this.isSelecting = false
      if (this.active) {
        this.$emit('close')
      }
    },
    changeStartDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
      } else {
        this.$emit('input', [time, Math.max(this.value[1], time)])
      }
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
      } else {
        this.$emit('input', [Math.min(this.value[0], time), time])
      }
    },
    changeStartEndTime (startTime, endTime) {
      if (endTime === undefined) endTime = startTime
      if (typeof startTime !== 'number') {
        startTime = getTime(startTime)
      }
      if (typeof endTime !== 'number') {
        endTime = getTime(endTime)
      }
      this.$emit('input', [startTime, endTime])
    },
    /** change calendar time */
    adjustCalendarTimes (byStartCalendarTime) {
      const startTime = startOfMonth(this.startCalendarDateTime)
      const endTime = startOfMonth(this.endCalendarDateTime)
      if (startTime >= endTime) {
        if (byStartCalendarTime) {
          this.endCalendarDateTime = addMonths(startTime, 1)
        } else {
          this.startCalendarDateTime = addMonths(endTime, -1)
        }
      }
    },
    startCalendarNextYear () {
      this.startCalendarDateTime = addMonths(this.startCalendarDateTime, 1)
      this.adjustCalendarTimes(true)
    },
    startCalendarPrevYear () {
      this.startCalendarDateTime = addMonths(this.startCalendarDateTime, -1)
      this.adjustCalendarTimes(true)
    },
    startCalendarNextMonth () {
      this.startCalendarDateTime = addMonths(this.startCalendarDateTime, 1)
      this.adjustCalendarTimes(true)
    },
    startCalendarPrevMonth () {
      this.startCalendarDateTime = addMonths(this.startCalendarDateTime, -1)
      this.adjustCalendarTimes(true)
    },
    endCalendarNextYear () {
      this.endCalendarDateTime = addMonths(this.endCalendarDateTime, 1)
      this.adjustCalendarTimes(false)
    },
    endCalendarPrevYear () {
      this.endCalendarDateTime = addMonths(this.endCalendarDateTime, -1)
      this.adjustCalendarTimes(false)
    },
    endCalendarNextMonth () {
      this.endCalendarDateTime = addMonths(this.endCalendarDateTime, 1)
      this.adjustCalendarTimes(false)
    },
    endCalendarPrevMonth () {
      this.endCalendarDateTime = addMonths(this.endCalendarDateTime, -1)
      this.adjustCalendarTimes(false)
    }
  }
}
