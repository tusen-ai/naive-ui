<template>
  <div>
    DatePicker<br>
    <input
      v-model="displayTimeString"
      placeholder="please select date time"
      @focus="openCalendar"
      @blur="handleBlur"
      @keyup.enter="handleBlur"
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
    <br>
    <div>{{ calendarTime.year() }} {{ calendarTime.month() + 1 }}</div>
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
        v-for="dateItem in dateArray(calendarTime, selectedTime, currentTime)"
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
      displayTimeString: null,
      calendarTime: moment(),
      selectedTime: null,
      showCalendar: false,
      calendar: [],
      currentTime: moment()
    }
  },
  methods: {
    dateArray,
    handleDateClick (dateItem) {
      if (!this.selectedTime) {
        this.selectedTime = moment()
        setDate(this.selectedTime, dateItem)
      } else {
        setDate(this.selectedTime, dateItem)
      }
      this.calendarTime = moment(this.selectedTime)
      this.$emit('change', this.selectedTime.valueOf())
      this.refreshSelectedMoment()
      this.$forceUpdate()
    },
    refreshSelectedMoment () {
      this.displayTimeString = this.selectedTime.format('YYYY-MM-DD HH:mm:ss')
    },
    openCalendar () {
      this.showCalendar = true
    },
    closeCalendar () {
      this.showCalendar = false
    },
    toggleCalendar () {

    },
    handleBlur () {
      if (this.selectedTime === null) return
      const newSelectedTime = moment(this.displayTimeString, 'YYYY-MM-DD HH:mm:ss')
      if (newSelectedTime.isValid()) {
        this.selectedTime = newSelectedTime
        this.calendarTime = moment(newSelectedTime)
        this.$emit('change', this.selectedTime.valueOf())
      }
      this.refreshSelectedMoment()
      this.closeCalendar()
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
