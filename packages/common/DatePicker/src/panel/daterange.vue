<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      v-clickoutside.lazy="handleClickOutside"
      class="n-date-picker-calendar n-date-picker-calendar--daterange"
      @click.capture="resetSelectingStatus"
    >
      <div
        ref="startDates"
        class="n-date-picker-calendar__range-wrapper"
      >
        <div class="n-date-picker-calendar__month-modifier">
          <div
            class="n-date-picker-calendar__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__prev"
            @click="startCalendarPrevMonth"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div class="n-date-picker-calendar__month-year">
            {{ startCalendarDateTime.format('MMMM') }} {{ startCalendarDateTime.year() }}
          </div>
          <div
            class="n-date-picker-calendar__next"
            @click="startCalendarNextMonth"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__fast-next"
            @click="startCalendarNextYear"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
        </div>
        <div class="n-date-picker-calendar__weekdays">
          <div
            v-for="weekday in weekdays"
            :key="weekday"
            class="n-date-picker-calendar__weekday"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="n-date-picker-calendar__divider" />
        <div
          class="n-date-picker-calendar__dates"
        >
          <div
            v-for="dateItem in dateArray(startCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="`${dateItem.timestamp}${dateItem.isDateOfDisplayMonth}`"
            class="n-date-picker-calendar__date"
            :class="{
              'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
              'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
              'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-calendar__date--in-span': dateItem.isInSpan
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.date }}
          </div>
        </div>
      </div>
      <div><div class="n-date-picker-calendar__vertical-divider" /></div>
      <div
        ref="endDates"
        class="n-date-picker-calendar__range-wrapper"
      >
        <div class="n-date-picker-calendar__month-modifier">
          <div
            class="n-date-picker-calendar__fast-prev"
            @click="endCalendarPrevYear"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__prev"
            @click="endCalendarPrevMonth"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div class="n-date-picker-calendar__month-year">
            {{ endCalendarDateTime.format('MMMM') }} {{ endCalendarDateTime.year() }}
          </div>
          <div
            class="n-date-picker-calendar__next"
            @click="endCalendarNextMonth"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__fast-next"
            @click="endCalendarNextYear"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
        </div>
        <div class="n-date-picker-calendar__weekdays">
          <div
            v-for="weekday in weekdays"
            :key="weekday"
            class="n-date-picker-calendar__weekday"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="n-date-picker-calendar__divider" />
        <div
          class="n-date-picker-calendar__dates"
        >
          <div
            v-for="dateItem in dateArray(endCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="`${dateItem.timestamp}${dateItem.isDateOfDisplayMonth}`"
            class="n-date-picker-calendar__date"
            :class="{
              'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
              'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
              'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-calendar__date--in-span': dateItem.isInSpan
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.date }}
          </div>
          <div
            v-if="!(actions && actions.length)"
            style="height: 8px; width: 100%;"
          />
        </div>
      </div>
      <div
        v-if="actions && actions.length"
        class="n-date-picker-calendar__actions"
      >
        <n-button
          v-if="actions.includes('clear')"
          size="tiny"
          round
          @click="clearValue"
        >
          Clear
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
          size="tiny"
          round
          auto-text-color
          type="primary"
          @click="handleConfirmClick"
        >
          Confirm
        </n-button>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import { dateArray } from '../utils'
import NIcon from '../../../Icon'
import clickoutside from '../../../../directives/clickoutside'

import NButton from '../../../Button'

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const PLACEHOLDER = 'Select date and time'

const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
}

export default {
  components: {
    NButton,
    NIcon
  },
  directives: {
    clickoutside
  },
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
    placeholder: {
      type: String,
      default: PLACEHOLDER
    },
    format: {
      type: String,
      default: DATETIME_FORMAT
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
      endDateTime: null,
      ...TIME_CONST
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
    active (newActive) {
      if (newActive) {
        this.syncCalendarTimeWithValue(this.value)
      }
    },
    valueAsMomentArray (newValue) {
      if (this.isSelecting) return
      if (newValue !== null) {
        this.syncCalendarTimeWithValue(newValue)
      }
    }
  },
  created () {
    if (this.valueAsMomentArray !== null) {
      this.syncCalendarTimeWithValue(this.valueAsMomentArray)
    }
  },
  methods: {
    dateArray,
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
    adjustMoment (datetime) {
      return moment(datetime).startOf('date')
    },
    clearValue () {
      this.$emit('input', null)
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
</script>
