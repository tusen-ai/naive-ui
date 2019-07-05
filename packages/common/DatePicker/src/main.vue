<template>
  <div
    ref="datePicker"
    class="n-date-picker"
    :class="{
      [`n-date-picker--${size}-size`]: true
    }"
    @click="handleCalendarClick"
  >
    <input
      v-model="displayDateTimeString"
      class="n-date-picker__input"
      placeholder="Select date and time"
      @click="openCalendar"
      @focus="openCalendar"
      @blur="handleDateTimeInputBlur"
      @keyup.enter="handleDateTimeInputEnter"
    >
    <div class="n-date-picker__icon">
      <n-icon
        size="20"
        type="ios-calendar"
      />
    </div>
    <transition name="n-date-picker-calendar--transition">
      <div
        v-if="showCalendar"
        class="n-date-picker-calendar"
      >
        <div class="n-date-picker-calendar__date-time-input-wrapper">
          <input
            v-model="displayDateString"
            class="n-date-picker-calendar__date-input"
            placeholder="Select date"
          >
          <div
            ref="timeSelector"
            class="n-date-picker-calendar__time-input-wrapper"
          >
            <input
              v-model="displayTimeString"
              class="n-date-picker-calendar__time-input"
              placeholder="Select time"
              @click="openTimeSelector"
              @input="handleTimeInput"
            >
            <transition name="n-date-picker-time-selector--transition">
              <div
                v-if="showTimeSelector"
                class="n-date-picker-time-selector"
              >
                <div class="n-date-picker-time-selector__selection-wrapper">
                  <div class="n-date-picker-time-selector__hour">
                    <div
                      v-for="hour in hours"
                      :key="hour"
                      class="n-date-picker-time-selector__item"
                      :class="{
                        'n-date-picker-time-selector__item--active':
                          hour === computedHour
                      }"
                      @click="setHour(hour)"
                    >
                      {{ hour }}
                    </div>
                  </div>
                  <div class="n-date-picker-time-selector__minute">
                    <div
                      v-for="minute in minutes"
                      :key="minute"
                      class="n-date-picker-time-selector__item"
                      :class="{
                        'n-date-picker-time-selector__item--active':
                          minute === computedMinute
                      }"
                      @click="setMinute(minute)"
                    >
                      {{ minute }}
                    </div>
                  </div>
                  <div class="n-date-picker-time-selector__hour">
                    <div
                      v-for="second in seconds"
                      :key="second"
                      class="n-date-picker-time-selector__item"
                      :class="{
                        'n-date-picker-time-selector__item--active':
                          second === computedSecond
                      }"
                      @click="setSecond(second)"
                    >
                      {{ second }}
                    </div>
                  </div>
                </div>
                <div class="n-date-picker-time-selector__actions">
                  <n-button
                    size="tiny"
                    round
                    @click="handleTimeCancelClick"
                  >
                    Cancel
                  </n-button>
                  <n-button
                    size="tiny"
                    round
                    auto-text-color
                    type="primary"
                    @click="handleTimeConfirmClick"
                  >
                    Confirm
                  </n-button>
                </div>
              </div>
            </transition>
          </div>
        </div>
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
            {{ calendarTime.startOf('month').format('MMMM') }} {{ calendarTime.year() }}
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
            v-for="dateItem in dateArray(calendarTime, selectedDateTime, currentTime)"
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
            @click="handleDateInputAndTimeInputConfirmClick"
          >
            Confirm
          </n-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import { dateArray, setDate } from './utils'
import NIcon from '../../Icon'
import NButton from '../../Button'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'NDatePicker',
  components: {
    NIcon,
    NButton
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: 'default'
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
      showTimeSelector: false,
      calendar: [],
      currentTime: moment(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    }
  },
  computed: {
    computedHour () {
      if (this.selectedDateTime) return this.selectedDateTime.format('HH')
      else return null
    },
    computedMinute () {
      if (this.selectedDateTime) return this.selectedDateTime.format('mm')
      else return null
    },
    computedSecond () {
      if (this.selectedDateTime) return this.selectedDateTime.format('ss')
      else return null
    }
  },
  watch: {
    selectedDateTime (newValue) {
      this.$emit('change', newValue.valueOf())
    }
  },
  methods: {
    dateArray,
    justifySelectedDateTimeAfterChangeTimeString () {
      if (this.selectedDateTime === null) {
        // case here is impossible for now, because you can't clear time
      } else {
        const newDisplayDateTimeString = this.displayDateString + ' ' + this.displayTimeString
        const newSelectedDateTime = moment(newDisplayDateTimeString, 'YYYY-MM-DD HH:mm:ss', true)
        if (newSelectedDateTime.isValid()) {
          this.selectedDateTime = newSelectedDateTime
        }
      }
      this.refreshSelectedDateTime()
    },
    handleTimeInput (e) {
      const newDisplayDateTimeString = this.displayDateString + ' ' + e.target.value
      const newSelectedDateTime = moment(newDisplayDateTimeString, 'YYYY-MM-DD HH:mm:ss', true)
      if (newSelectedDateTime.isValid()) {
        this.selectedDateTime = newSelectedDateTime
        this.refreshSelectedDateTime()
      }
    },
    handleTimeConfirmClick () {
      this.justifySelectedDateTimeAfterChangeTimeString()
      this.closeTimeSelector()
    },
    handleTimeCancelClick () {
      this.closeTimeSelector()
    },
    setHour (hour) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[0] = hour
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    setMinute (minute) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[1] = minute
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    setSecond (second) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[2] = second
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    openTimeSelector () {
      if (this.selectedDateTime === null) {
        this.selectedDateTime = moment()

        this.refreshSelectedDateTime()
      }
      this.showTimeSelector = true
    },
    closeTimeSelector () {
      this.showTimeSelector = false
    },
    handleCalendarClick (e) {
      if (!this.$refs.timeSelector.contains(e.target) && this.$refs.timeSelector !== e.target) {
        this.closeTimeSelector()
      }
    },
    nativeCloseCalendar (e) {
      if (e.target.contains(this.$refs.datePicker) && e.target !== this.$refs.datePicker) {
        this.closeCalendar()
      }
    },
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
      }
    },
    handleDateTimeInputBlur () {
      const newSelectedDateTime = moment(this.displayDateTimeString, dateFormat, true)
      if (newSelectedDateTime.isValid()) {
        this.selectedDateTime = newSelectedDateTime
        this.calendarTime = moment(newSelectedDateTime)
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
      this.closeCalendar()
    },
    openCalendar () {
      this.showCalendar = true
      document.body.addEventListener('click', this.nativeCloseCalendar)
    },
    closeCalendar () {
      this.showCalendar = false
      this.showTimeSelector = false
      document.body.removeEventListener('click', this.nativeCloseCalendar)
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
