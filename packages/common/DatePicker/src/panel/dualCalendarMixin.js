// import moment from 'moment'
import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'
import getTime from 'date-fns/getTime'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import startOfMonth from 'date-fns/startOfMonth'
import isValid from 'date-fns/isValid'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'
import { dateArray } from '../../../../utils/dateUtils'
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
            } else {
              console.error(
                '[naive-ui/date-picker/datetimerange]: Start time should be no later than end time.'
              )
            }
          }
        }
        return false
      },
      required: true,
      default: null
    },
    actions: {
      type: Array,
      default: () => ['clear', 'confirm']
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
          hourDisabled: () => false,
          minuteDisabled: () => false,
          secondDisabled: () => false
        }
      }
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
      memorizedStartDateTime: null
    }
  },
  computed: {
    selectingPhase () {
      if (this.isSelecting) return 'end'
      else return 'start'
    },
    startDateArray () {
      return dateArray(
        this.startCalendarDateTime,
        this.valueAsDateArray,
        this.currentDateTime
      )
    },
    endDateArray () {
      return dateArray(
        this.endCalendarDateTime,
        this.valueAsDateArray,
        this.currentDateTime
      )
    },
    startCalendarMonth () {
      return this.localeNamespace[format(this.startCalendarDateTime, 'MMM')]
    },
    endCalendarMonth () {
      return this.localeNamespace[format(this.endCalendarDateTime, 'MMM')]
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
      if (isValid(startMoment)) {
        return [startMoment, endMoment]
      } else return null
    },
    isStartHourDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'start', this.value)
      const isStartHourDisabled = (isTimeDisabled && isTimeDisabled.isHourDisabled)
      return function (...args) {
        if (!isStartHourDisabled) return false
        return isStartHourDisabled(...args)
      }
    },
    isStartMinuteDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'start', this.value)
      const isStartMinuteDisabled = (isTimeDisabled && isTimeDisabled.isMinuteDisabled)
      return function (...args) {
        if (!isStartMinuteDisabled) return false
        return isStartMinuteDisabled(...args)
      }
    },
    isStartSecondDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'start', this.value)
      const isStartSecondDisabled = (isTimeDisabled && isTimeDisabled.isSecondDisabled)
      return function (...args) {
        if (!isStartSecondDisabled) return false
        return isStartSecondDisabled(...args)
      }
    },
    isEndHourDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'end', this.value)
      const isEndHourDisabled = (isTimeDisabled && isTimeDisabled.isHourDisabled)
      return function (...args) {
        if (!isEndHourDisabled) return false
        return isEndHourDisabled(...args)
      }
    },
    isEndMinuteDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'end', this.value)
      const isEndMinuteDisabled = (isTimeDisabled && isTimeDisabled.isMinuteDisabled)
      return function (...args) {
        if (!isEndMinuteDisabled) return false
        return isEndMinuteDisabled(...args)
      }
    },
    isEndSecondDisabled () {
      if (this.value === null) return () => false
      const isTimeDisabled = this.isTimeDisabled(this.value[0], 'end', this.value)
      const isEndSecondDisabled = (isTimeDisabled && isTimeDisabled.isSecondDisabled)
      return function (...args) {
        if (!isEndSecondDisabled) return false
        return isEndSecondDisabled(...args)
      }
    },
    isRangeInvalid () {
      if (this.value === null) return false
      return this.isStartValueInvalid || this.isEndValueInvalid
    },
    isStartValueInvalid () {
      if (this.value === null) return false
      return this.isStartDateInvalid || this.isStartTimeInvalid
    },
    isStartDateInvalid () {
      if (this.value === null) return false
      return this.isDateDisabled(this.value[0], 'start', this.value)
    },
    isStartTimeInvalid () {
      if (this.value === null) return false
      if (this.type === 'daterange') return false
      const hours = getHours(this.value[0])
      const minutes = getMinutes(this.value[0])
      const seconds = getSeconds(this.value[0])
      return this.isStartHourDisabled(hours) ||
        this.isStartMinuteDisabled(minutes, hours) ||
        this.isStartSecondDisabled(seconds, minutes, hours)
    },
    isEndValueInvalid () {
      if (this.value === null) return false
      return this.isEndDateInvalid || this.isEndTimeInvalid
    },
    isEndDateInvalid () {
      if (this.value === null) return false
      return this.isDateDisabled(this.value[1], 'end', this.value)
    },
    isEndTimeInvalid () {
      if (this.value === null) return false
      if (this.type === 'daterange') return false
      const hours = getHours(this.value[1])
      const minutes = getMinutes(this.value[1])
      const seconds = getSeconds(this.value[1])
      return this.isStartHourDisabled(hours) ||
        this.isStartMinuteDisabled(minutes, hours) ||
        this.isStartSecondDisabled(seconds, minutes, hours)
    }
  },
  watch: {
    startCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (isValid(newCalendarDateTime) && oldCalendarDateTime) {
        if (
          getYear(newCalendarDateTime) !== getYear(oldCalendarDateTime) ||
          getMonth(newCalendarDateTime) !== getMonth(oldCalendarDateTime)
        ) {
          this.disableTransitionOneTick()
        }
      }
    },
    endCalendarDateTime (newCalendarDateTime, oldCalendarDateTime) {
      if (isValid(newCalendarDateTime) && oldCalendarDateTime) {
        if (
          getYear(newCalendarDateTime) !== getYear(oldCalendarDateTime) ||
          getMonth(newCalendarDateTime) !== getMonth(oldCalendarDateTime)
        ) {
          this.disableTransitionOneTick()
        }
      }
    },
    isStartValueInvalid (value) {
      this.NDatePicker.setStartInvalidStatus(value)
    },
    isEndValueInvalid (value) {
      this.NDatePicker.setEndInvalidStatus(value)
    }
  },
  mounted () {
    this.NDatePicker.setStartInvalidStatus(this.isStartValueInvalid)
    this.NDatePicker.setEndInvalidStatus(this.isEndValueInvalid)
  },
  methods: {
    isCalendarDateDisabled (timestamp) {
      if (this.value === null) return false
      if (this.selectingPhase === 'start') {
        return this.isDateDisabled(timestamp, 'start', this.value)
      } else {
        if (timestamp < this.value[1]) {
          return this.isDateDisabled(timestamp, 'start', this.value)
        } else {
          return this.isDateDisabled(timestamp, 'end', this.value)
        }
      }
    },
    resetSelectingStatus (e) {
      if (
        this.$refs.startDates.contains(e.target) ||
        this.$refs.endDates.contains(e.target)
      ) {
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
      this.startCalendarDateTime = new Date(startMoment)
      if (startOfMonth(endMoment) <= startOfMonth(startMoment)) {
        this.endCalendarDateTime = startOfMonth(addMonths(startMoment, 1))
      } else {
        this.endCalendarDateTime = startOfMonth(endMoment)
      }
    },
    handleDateClick (dateItem) {
      if (this.isCalendarDateDisabled(dateItem.timestamp)) {
        return
      }
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
        if (this.isCalendarDateDisabled(dateItem.timestamp)) return
        if (dateItem.timestamp >= this.memorizedStartDateTime) {
          this.changeStartEndTime(
            this.memorizedStartDateTime,
            dateItem.timestamp
          )
        } else {
          this.changeStartEndTime(
            dateItem.timestamp,
            this.memorizedStartDateTime
          )
        }
      }
    },
    handleConfirmClick () {
      if (this.isRangeInvalid) {
        return
      }
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
