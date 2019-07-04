<template>
  <div>
    DatePicker<br>
    <input
      v-model="displayDateTimeString"
      placeholder="Please select date time"
      @blur="handleDateTimeInputBlur"
      @keyup.enter="handleDateTimeInputEnter"
    >
    <input
      v-model="displayDateString"
      placeholder="Please select date"
    >
    <input
      v-model="displayTimeString"
      placeholder="Please select time"
    >
    <button @click="prevYear">
      prevYear
    </button>
    <button @click="prevMonth">
      prevMonth
    </button>
    <button @click="nextMonth">
      nextMonth
    </button>
    <button @click="nextYear">
      nextYear
    </button>
    <button @click="clear">
      clear
    </button>
    <button @click="handleDateInputAndTimeInputConfirmClick">
      confirm
    </button>
    <button @click="setSelectedDateTimeToNow">
      now
    </button>
    <br>
    <div>year {{ calendarTime.year() }}, month {{ calendarTime.month() + 1 }}</div>
    <div
      v-if="true"
      style="display: flex; width: 280px; flex-wrap: wrap;"
    >
      <div class="date n-date-picker-calendar__date--day">
        Sun
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Mon
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Tue
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Wed
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Thu
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Fri
      </div>
      <div class="date n-date-picker-calendar__date--day">
        Sat
      </div>
      <div
        v-for="dateItem in dateArray(calendarTime, selectedDateTime, currentTime)"
        :key="dateItem.timestamp"
        class="date"
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
  </div>
</template>

<script>
import moment from 'moment'
import { dateArray, setDate } from './utils'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'NDatePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      displayDateTimeString: '',
      displayDateString: '',
      displayTimeString: '',
      calendarTime: moment(),
      selectedDateTime: null,
      showCalendar: false,
      calendar: [],
      currentTime: moment()
    }
  },
  methods: {
    dateArray,
    clear () {
      this.selectedDateTime = null
      this.displayDateTimeString = ''
      this.displayDateString = ''
      this.displayTimeString = ''
    },
    setSelectedDateTimeToNow () {
      this.selectedDateTime = moment()
      this.calendarTime = moment()
      this.refreshSelectedDateTime()
    },
    handleDateClick (dateItem) {
      if (!this.selectedDateTime) {
        this.selectedDateTime = moment()
        this.selectedDateTime = setDate(this.selectedDateTime, dateItem)
      } else {
        this.selectedDateTime = setDate(this.selectedDateTime, dateItem)
      }
      this.calendarTime = moment(this.selectedDateTime)
      this.$emit('change', this.selectedDateTime.valueOf())
      this.refreshSelectedDateTime()
    },
    refreshSelectedDateTime () {
      if (this.selectedDateTime === null) {
        this.displayDateTimeString = ''
        return
      }
      this.displayDateTimeString = this.selectedDateTime.format('YYYY-MM-DD HH:mm:ss')
      this.displayDateString = this.selectedDateTime.format('YYYY-MM-DD')
      this.displayTimeString = this.selectedDateTime.format('HH:mm:ss')
    },
    handleDateTimeInputEnter () {
      const newSelectedDateTime = moment(this.displayDateTimeString, 'YYYY-MM-DD HH:mm:ss', true)
      if (newSelectedDateTime.isValid()) {
        this.selectedDateTime = newSelectedDateTime
        this.calendarTime = moment(newSelectedDateTime)
        this.refreshSelectedDateTime()
        this.$emit('change', this.selectedDateTime.valueOf())
      }
    },
    handleDateTimeInputBlur () {
      const newSelectedDateTime = moment(this.displayDateTimeString, dateFormat, true)
      if (newSelectedDateTime.isValid()) {
        this.selectedDateTime = newSelectedDateTime
        this.calendarTime = moment(newSelectedDateTime)
        this.$emit('change', this.selectedDateTime.valueOf())
      }
      this.refreshSelectedDateTime()
    },
    handleDateInputAndTimeInputConfirmClick () {
      const newDisplayDateTimeString = `${this.displayDateString.trim()} ${this.displayTimeString.trim()}`
      const newSelectedDateTime = moment(newDisplayDateTimeString, dateFormat, true)
      if (newSelectedDateTime.isValid()) {
        this.selectedDateTime = newSelectedDateTime
      } else if (this.selectedDateTime === null) {
        this.selectedDateTime = moment()
      }
      this.refreshSelectedDateTime()
    },
    openCalendar () {
      this.showCalendar = true
    },
    closeCalendar () {
      this.showCalendar = false
    },
    toggleCalendar () {

    },
    nextYear () {
      this.calendarTime.add(1, 'year')
      this.$forceUpdate()
    },
    prevYear () {
      this.calendarTime.subtract(1, 'year')
      this.$forceUpdate()
    },
    nextMonth () {
      this.calendarTime.add(1, 'month')
      this.$forceUpdate()
    },
    prevMonth () {
      this.calendarTime.subtract(1, 'month')
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  text-align: center;
  width: 36px;
  opacity: .6;
  &.n-date-picker-calendar__date--current {
    color: blue;
  }
  &.n-date-picker-calendar__date--selected {
    background-color: red;
  }
  cursor: pointer;
  &.n-date-picker-calendar__date--in-display-month, &.n-date-picker-calendar__date--day {
    opacity: 1;
  }
}
</style>
