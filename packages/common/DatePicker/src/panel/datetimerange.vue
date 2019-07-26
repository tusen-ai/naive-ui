<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      v-clickoutside.lazy="handleClickOutside"
      class="n-date-picker-calendar n-date-picker-calendar--datetimerange"
      @click.capture="resetSelectingStatus"
    >
      <div
        class="n-date-picker-calendar__date-time-input-wrapper"
      >
        <n-input
          v-model="startDateDisplayString"
          class="n-date-picker-calendar__date-input"
          placeholder="Select date"
          @blur="handleStartDateInputBlur"
          @input="handleStartDateInput"
        />
        <n-time-picker
          class="n-date-picker-calendar__time-input"
          :value="startTimeValue"
          stop-selector-bubble
          @input="handleStartTimePickerInput"
        />
        <div class="n-date-picker-calendar__arrow">
          <n-icon type="ios-arrow-forward" />
        </div>
        <n-input
          v-model="endDateDisplayString"
          class="n-date-picker-calendar__date-input"
          placeholder="Select date"
          @blur="handleEndDateInputBlur"
          @input="handleEndDateInput"
        />
        <n-time-picker
          class="n-date-picker-calendar__time-input"
          :value="endTimeValue"
          stop-selector-bubble
          @input="handleEndTimePickerInput"
        />
      </div>
      <div class="n-date-picker-calendar__range-wrapper">
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
          ref="startDates"
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
      <div class="n-date-picker-calendar__range-wrapper">
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
          ref="endDates"
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
        </div>
      </div>
      <div class="n-date-picker-calendar__actions">
        <n-button
          size="tiny"
          round
          @click="clearSelectedDateTime"
        >
          Reset
        </n-button>
        <n-button
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
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']

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
    NIcon,
    NTimePicker,
    NInput
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
        const [startMoment, endMoment] = newValue
        this.startDateDisplayString = startMoment.format(DATE_FORMAT)
        this.endDateDisplayString = endMoment.format(DATE_FORMAT)
        this.syncCalendarTimeWithValue(newValue)
      } else {
        this.startDateDisplayString = ''
        this.endDateDisplayString = ''
      }
    }
  },
  created () {
    if (this.valueAsMomentArray !== null) {
      const [startMoment, endMoment] = this.valueAsMomentArray
      this.startDateDisplayString = startMoment.format(DATE_FORMAT)
      this.endDateDisplayString = endMoment.format(DATE_FORMAT)
      this.syncCalendarTimeWithValue(this.valueAsMomentArray)
    } else {
      this.startDateDisplayString = ''
      this.endDateDisplayString = ''
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
    handleClickOutside () {
      this.closeCalendar()
    },
    adjustValue (datetime) {
      return moment(datetime).startOf('second')
    },
    handleStartDateInput (value) {
      const date = moment(value, DATE_FORMAT, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[0]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      } else {
        // do nothing
      }
    },
    handleEndDateInput (value) {
      /** strict check when input */
      const date = moment(value, DATE_FORMAT, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[1]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        }
      } else {
        // do nothing
      }
    },
    handleStartDateInputBlur () {
      const date = moment(this.startDateDisplayString, DATE_VALIDATE_FORMAT, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[0]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    handleEndDateInputBlur () {
      const date = moment(this.endDateDisplayString, DATE_VALIDATE_FORMAT, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[1]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    clearSelectedDateTime () {
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
    /**
     * If not selected, display nothing,
     * else update datetime related string
     */
    refreshDisplayDateString (times) {
      if (this.valueAsMomentArray === null) {
        this.startDateDisplayString = ''
        this.endDateDisplayString = ''
        return
      }
      if (times === undefined) {
        times = this.valueAsMomentArray
      }
      this.startDateDisplayString = times[0].format(DATE_FORMAT)
      this.endDateDisplayString = times[1].format(DATE_FORMAT)/// //
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
    handleStartTimePickerInput (value) {
      this.changeStartDateTime(value)
    },
    handleEndTimePickerInput (value) {
      this.changeEndDateTime(value)
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
