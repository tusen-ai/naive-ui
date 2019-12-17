// import moment from 'moment'
import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'
import getTime from 'date-fns/getTime'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import startOfMonth from 'date-fns/startOfMonth'
import isValid from 'date-fns/isValid'
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
    },
    dateDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    timeDisabled: {
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
      startDateTime: null,
      memorizedStartDateTime: null,
      endDateTime: null,
      startHourDisabled: () => true,
      startMinuteDisabled: () => true,
      startSecondDisabled: () => true,
      endHourDisabled: () => true,
      endMinuteDisabled: () => true,
      endSecondDisabled: () => true,
      isErrorStartTime: false,
      isErrorEndTime: false,
      isErrorStartDate: false,
      isErrorEndDate: false
      // currentDate: []
    }
  },
  computed: {
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
      if (isValid(startMoment)) {
        return [startMoment, endMoment]
      } else return null
    },
    isStartHourDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'start')
        let startHourDisabled = (timeDisabled && timeDisabled.hourDisabled) || function () { return false }
        return function (hour) {
          return startHourDisabled(hour)
        }
      }
    },
    isStartMinuteDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'start')
        let startMinuteDisabled = (timeDisabled && timeDisabled.minuteDisabled) || function () { return false }
        return function (minute, selectedHour) {
          return startMinuteDisabled(minute, selectedHour)
        }
      }
    },
    isStartSecondDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'start')
        let startSecondDisabled = (timeDisabled && timeDisabled.secondDisabled) || function () { return false }
        return function (second, selectedMinute, selectedHour) {
          return startSecondDisabled(second, selectedMinute, selectedHour)
        }
      }
    },
    isEndHourDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'end')
        let endHourDisabled = (timeDisabled && timeDisabled.hourDisabled) || function () { return false }
        return function (hour) {
          return endHourDisabled(hour)
        }
      }
    },
    isEndMinuteDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'end')
        let endMinuteDisabled = (timeDisabled && timeDisabled.minuteDisabled) || function () { return false }
        return function (minute, selectedHour) {
          return endMinuteDisabled(minute, selectedHour)
        }
      }
    },
    isEndSecondDisabled () {
      return function (val) {
        let timeDisabled = this.timeDisabled(this.currentDate, 'end')
        let endSecondDisabled = (timeDisabled && timeDisabled.secondDisabled) || function () { return false }
        return function (second, selectedMinute, selectedHour) {
          return endSecondDisabled(second, selectedMinute, selectedHour)
        }
      }
    },
    currentDate () {
      if (!this.value) {
        return this.value
      }
      let date = []
      this.value.forEach((item, index) => {
        if (item) {
          date[index] = new Date(new Date(item).toLocaleDateString()).getTime()
        }
      })
      return date
    },
    isErrorDateTime () {
      return this.isErrorStartTime || this.isErrorEndTime ||
      this.isErrorStartDate || this.isErrorEndDate
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
  mounted () {
    this.checkDate(this.value)
    this.checkInitTime()
    this.$emit('checkValue', this.isErrorDateTime)
  },
  methods: {
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
      if (this.dateDisabled(dateItem.timestamp)) {
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
      if (this.isErrorDateTime) {
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
      this.checkDate([startTime, endTime])
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
    },
    checkStartTime (isErrorValue) {
      this.isErrorStartTime = isErrorValue
      this.$emit('checkValue', this.isErrorStartTime || this.isErrorEndTime)
    },
    checkEndTime (isErrorValue) {
      this.isErrorEndTime = isErrorValue
      this.$emit('checkValue', this.isErrorStartTime || this.isErrorEndTime)
    },
    checkDate (date) {
      if (date) {
        this.isErrorStartDate = this.dateDisabled(new Date(new Date(date[0]).toLocaleDateString()).getTime())
        this.isErrorEndDate = this.dateDisabled(new Date(new Date(date[1]).toLocaleDateString()).getTime())
      }
    },
    checkInitTime () {
      if (this.value) {
        let startDateTime = new Date(this.value[0])
        let endDateTime = new Date(this.value[1])
        this.isErrorStartTime = this.isStartHourDisabled(this.value)(startDateTime.getHours()) ||
          this.isStartMinuteDisabled(this.value)(startDateTime.getMinutes(), startDateTime.getHours()) ||
          this.isStartSecondDisabled(this.value)(startDateTime.getSeconds(), startDateTime.getMinutes(), startDateTime.getHours())
        this.isErrorEndTime = this.isEndHourDisabled(this.value)(endDateTime.getHours()) ||
          this.isEndMinuteDisabled(this.value)(endDateTime.getMinutes(), endDateTime.getHours()) ||
          this.isEndSecondDisabled(this.value)(endDateTime.getSeconds(), endDateTime.getMinutes(), endDateTime.getHours())
      }
    }
  }
}
