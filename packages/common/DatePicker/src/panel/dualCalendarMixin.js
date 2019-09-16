import moment from 'moment'
import commonCalendarMixin from './commonCalendarMixin'

export default {
  mixins: [commonCalendarMixin],
  props: {
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
      startCalendarDateTime: moment(),
      endCalendarDateTime: moment().add(1, 'month'),
      currentDateTime: moment(),
      calendar: [],
      isSelecting: false,
      startDateTime: null,
      memorizedStartDateTime: null,
      endDateTime: null
    }
  },
  computed: {
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
    valueAsMomentArray () {
      if (this.value === null || this.value === undefined) return null
      const startMoment = moment(this.value[0])
      const endMoment = moment(this.value[1])
      if (startMoment.isValid() && endMoment.isValid()) {
        return [startMoment, endMoment]
      } else return null
    }
  },
  watch: {
    startCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (newCalendarDateTime.isValid() && oldCalendarDateTime) {
        if (
          newCalendarDateTime.year() !== oldCalendarDateTime.year() ||
          newCalendarDateTime.month() !== oldCalendarDateTime.month()
        ) {
          this.banTransitionOneTick()
        }
      }
    },
    endCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (newCalendarDateTime.isValid() && oldCalendarDateTime) {
        if (
          newCalendarDateTime.year() !== oldCalendarDateTime.year() ||
          newCalendarDateTime.month() !== oldCalendarDateTime.month()
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
      if (value === null) return
      const [startMoment, endMoment] = value
      this.startCalendarDateTime = moment(startMoment)
      if (moment(endMoment).startOf('month').valueOf() <= moment(startMoment).startOf('month').valueOf()) {
        this.endCalendarDateTime = moment(startMoment).add(1, 'month').startOf('month')
      } else {
        this.endCalendarDateTime = moment(endMoment).startOf('month')
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
        time = time.valueOf()
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
      } else {
        this.$emit('input', [time, Math.max(this.value[1], time)])
      }
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = time.valueOf()
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
        startTime = startTime.valueOf()
      }
      if (typeof endTime !== 'number') {
        endTime = endTime.valueOf()
      }
      this.$emit('input', [startTime, endTime])
    },
    /** change calendar time */
    adjustCalendarTimes (byStartCalendarTime) {
      const startTime = this.startCalendarDateTime.startOf('month').valueOf()
      const endTime = this.endCalendarDateTime.startOf('month').valueOf()
      if (startTime >= endTime) {
        if (byStartCalendarTime) {
          this.endCalendarDateTime = moment(startTime).add(1, 'month')
        } else {
          this.startCalendarDateTime = moment(endTime).subtract(1, 'month')
        }
      }
    },
    startCalendarNextYear () {
      this.startCalendarDateTime = moment(this.startCalendarDateTime).add(1, 'year')
      this.adjustCalendarTimes(true)
    },
    startCalendarPrevYear () {
      this.startCalendarDateTime = moment(this.startCalendarDateTime).subtract(1, 'year')
      this.adjustCalendarTimes(true)
    },
    startCalendarNextMonth () {
      this.startCalendarDateTime = moment(this.startCalendarDateTime).add(1, 'month')
      this.adjustCalendarTimes(true)
    },
    startCalendarPrevMonth () {
      this.startCalendarDateTime = moment(this.startCalendarDateTime).subtract(1, 'month')
      this.adjustCalendarTimes(true)
    },
    endCalendarNextYear () {
      this.endCalendarDateTime = moment(this.endCalendarDateTime).add(1, 'year')
      this.adjustCalendarTimes(false)
    },
    endCalendarPrevYear () {
      this.endCalendarDateTime = moment(this.endCalendarDateTime).subtract(1, 'year')
      this.adjustCalendarTimes(false)
    },
    endCalendarNextMonth () {
      this.endCalendarDateTime = moment(this.endCalendarDateTime).add(1, 'month')
      this.adjustCalendarTimes(false)
    },
    endCalendarPrevMonth () {
      this.endCalendarDateTime = moment(this.endCalendarDateTime).subtract(1, 'month')
      this.adjustCalendarTimes(false)
    }
  }
}
