<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      v-clickoutside.lazy="handleClickOutside"
      class="n-date-picker-calendar"
    >
      <div style="width: 100%; height: 12px" />
      <div class="n-date-picker-calendar__month-modifier">
        <div
          class="n-date-picker-calendar__fast-prev"
          @click="prevYear"
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
          @click="prevMonth"
        >
          <n-icon
            type="ios-arrow-back"
            size="14"
          />
        </div>
        <div class="n-date-picker-calendar__month-year">
          {{ calendarDateTime.format('MMMM') }} {{ calendarDateTime.year() }}
        </div>
        <div
          class="n-date-picker-calendar__next"
          @click="nextMonth"
        >
          <n-icon
            type="ios-arrow-forward"
            size="14"
          />
        </div>
        <div
          class="n-date-picker-calendar__fast-next"
          @click="nextYear"
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
      <div class="n-date-picker-calendar__dates">
        <div
          v-for="dateItem in dateArray(calendarDateTime, valueAsMoment, currentDateTime)"
          :key="dateItem.timestamp"
          class="n-date-picker-calendar__date"
          :class="{
            'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
            'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
            'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.date }}
        </div>
      </div>
      <div class="n-date-picker-calendar__actions">
        <n-button
          size="tiny"
          round
          @click="setSelectedDateTimeToNow"
        >
          Now
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
import { dateArray, setDate } from '../utils'
import NIcon from '../../../Icon'
import clickoutside from '../../../../directives/clickoutside'

import NButton from '../../../Button'

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
      type: Number,
      required: false,
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
      displayDateString: '',
      calendarDateTime: moment(),
      currentDateTime: moment(),
      calendar: [],
      ...TIME_CONST
    }
  },
  computed: {
    computedHour () {
      if (this.valueAsMoment) return this.valueAsMoment.format('HH')
      else return null
    },
    computedMinute () {
      if (this.valueAsMoment) return this.valueAsMoment.format('mm')
      else return null
    },
    computedSecond () {
      if (this.valueAsMoment) return this.valueAsMoment.format('ss')
      else return null
    },
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
    valueAsMoment (newValue) {
      if (newValue !== null) {
        this.displayDateString = newValue.format(DATE_FORMAT)
      } else {
        this.displayDateString = ''
      }
    }
  },
  created () {
    if (this.valueAsMoment !== null) {
      this.displayDateString = this.valueAsMoment.format(DATE_FORMAT)
    } else {
      this.displayDateString = ''
    }
  },
  methods: {
    dateArray,
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
    adjustValue (value) {
      return moment(value).startOf('day')
    },
    handleDateInput (value) {
      const date = moment(value, DATE_FORMAT, true)
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
      const date = moment(this.displayDateString, DATE_VALIDATE_FORMAT, true)
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
      let newSelectedDateTime = moment()
      if (this.valueAsMoment !== null) {
        newSelectedDateTime = moment(this.valueAsMoment)
      }
      newSelectedDateTime = setDate(newSelectedDateTime, dateItem)
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
      this.displayDateString = time.format(DATE_FORMAT)
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
      this.calendarDateTime.add(1, 'year')
      this.$forceUpdate()
    },
    prevYear () {
      this.calendarDateTime.subtract(1, 'year')
      this.$forceUpdate()
    },
    nextMonth () {
      this.calendarDateTime.add(1, 'month')
      this.$forceUpdate()
    },
    prevMonth () {
      this.calendarDateTime.subtract(1, 'month')
      this.$forceUpdate()
    },
    handleTimePickerInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
