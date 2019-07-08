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
      :placeholder="placeholder"
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
        v-if="showCalendar || debug"
        class="n-date-picker-calendar"
      >
        <div
          v-if="type==='datetime'"
          class="n-date-picker-calendar__date-time-input-wrapper"
        >
          <input
            v-model="displayDateString"
            class="n-date-picker-calendar__date-input"
            placeholder="Select date"
            @blur="handleDateInputBlur"
            @input="handleDateInput"
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
              @blur="handleTimeInputBlur"
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
        <div
          v-else
          style="width: 100%; height: 12px;"
        />
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
            v-for="dateItem in dateArray(calendarDateTime, computedSelectedDateTime, currentDateTime)"
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

const DATE_FORMAT = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss'
}
const PLACEHOLDER = {
  date: 'Select date',
  datetime: 'Select date and time'
}
const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
}

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
      type: [Number, String],
      required: false,
      default: null
    },
    size: {
      type: String,
      default: 'default'
    },
    /**
     * type can be 'date', 'datetime'
     */
    type: {
      type: String,
      default: 'date'
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      displayDateTimeString: '',
      displayDateString: '',
      displayTimeString: '',
      calendarDateTime: moment(),
      currentDateTime: moment(),
      showCalendar: false,
      showTimeSelector: false,
      calendar: [],
      ...TIME_CONST
    }
  },
  computed: {
    placeholder () {
      return PLACEHOLDER[this.type]
    },
    format () {
      return DATE_FORMAT[this.type]
    },
    computedHour () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('HH')
      else return null
    },
    computedMinute () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('mm')
      else return null
    },
    computedSecond () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('ss')
      else return null
    },
    /**
     * If value is valid return null.
     * If value is not valid, return moment(value)
     */
    computedSelectedDateTime () {
      if (this.value === null || this.value === undefined) return null
      const newSelectedDateTime = moment(Number(this.value))
      if (newSelectedDateTime.isValid()) {
        return newSelectedDateTime
      } else {
        return null
      }
    }
  },
  watch: {
    /**
     * If new value is valid, set calendarTime and refresh display strings.
     * If new value is invalid, do nothing.
     */
    value (newValue) {
      const newSelectedDateTime = moment(Number(newValue))
      if (newSelectedDateTime.isValid()) {
        this.calendarDateTime = moment(newSelectedDateTime)
        this.refreshSelectedDateTimeString()
      }
    }
  },
  created () {
    this.refreshSelectedDateTimeString()
    if (this.computedSelectedDateTime !== null && this.computedSelectedDateTime.isValid()) {
      this.calendarDateTime = moment(this.computedSelectedDateTime)
    }
  },
  methods: {
    dateArray,
    /**
     * If new datetime is null or undefined, emit null to value.
     * Else adjust new datetime by props.type and emit it to value.
     */
    setValue (newSelectedDateTime) {
      if (newSelectedDateTime === null || newSelectedDateTime === undefined) {
        this.$emit('change', null)
        return
      }
      if (newSelectedDateTime.isValid()) {
        const adjustedDateTime = this.adjustDateTimeAccrodingToType(newSelectedDateTime)
        if (this.computedSelectedDateTime === null || adjustedDateTime.valueOf() !== this.computedSelectedDateTime.valueOf()) {
          this.$emit('change', adjustedDateTime.valueOf(), adjustedDateTime.format(this.format))
        }
      }
    },
    adjustDateTimeAccrodingToType (datetime) {
      if (this.type === 'datetime') {
        return moment(datetime).startOf('second')
      } else {
        return moment(datetime).startOf('date').hour(0)
      }
    },
    justifySelectedDateTimeAfterChangeTimeString () {
      if (this.computedSelectedDateTime === null) {
        // case here is impossible for now, because you can't clear time for now
      } else {
        const newDisplayDateTimeString = this.displayDateString + ' ' + this.displayTimeString
        const newSelectedDateTime = moment(newDisplayDateTimeString, this.format, true)
        this.setValue(newSelectedDateTime)
      }
    },
    handleTimeInput (e) {
      const newDisplayDateTimeString = this.displayDateString + ' ' + e.target.value
      const newSelectedDateTime = moment(newDisplayDateTimeString, this.format, true)
      this.setValue(newSelectedDateTime)
    },
    handleDateInput (e) {
      const newDisplayDateTimeString = e.target.value + ' ' + this.displayTimeString
      const newSelectedDateTime = moment(newDisplayDateTimeString, this.format, true)
      this.setValue(newSelectedDateTime)
    },
    handleTimeInputBlur () {
      this.refreshSelectedDateTimeString()
    },
    handleDateInputBlur () {
      this.refreshSelectedDateTimeString()
    },
    handleTimeConfirmClick () {
      this.justifySelectedDateTimeAfterChangeTimeString()
      this.refreshSelectedDateTimeString()
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
      if (this.computedSelectedDateTime === null) {
        this.setValue(moment())
      }
      this.showTimeSelector = true
    },
    closeTimeSelector () {
      this.showTimeSelector = false
    },
    /**
     * To close timeSelector
     */
    handleCalendarClick (e) {
      if (!this.$refs.timeSelector) return
      if (!this.$refs.timeSelector.contains(e.target) && this.$refs.timeSelector !== e.target) {
        this.closeTimeSelector()
      }
    },
    nativeCloseCalendar (e) {
      if (!this.$refs.datePicker.contains(e.target)) {
        this.closeCalendar()
      }
    },
    clearSelectedDateTime () {
      this.setValue(null)
      this.displayDateTimeString = ''
      this.displayDateString = ''
      this.displayTimeString = ''
    },
    setSelectedDateTimeToNow () {
      this.setValue(moment())
      this.calendarDateTime = moment()
    },
    handleDateClick (dateItem) {
      let newSelectedDateTime = moment()
      if (this.computedSelectedDateTime !== null) {
        newSelectedDateTime = moment(this.computedSelectedDateTime)
      }
      newSelectedDateTime = setDate(newSelectedDateTime, dateItem)
      this.setValue(newSelectedDateTime)
    },
    /**
     * If not selected, display nothing,
     * else update datetime related string
     */
    refreshSelectedDateTimeString () {
      if (this.computedSelectedDateTime === null) {
        this.displayDateTimeString = ''
        return
      }
      this.displayDateTimeString = this.computedSelectedDateTime.format(this.format)
      this.displayDateString = this.computedSelectedDateTime.format('YYYY-MM-DD')
      this.displayTimeString = this.computedSelectedDateTime.format('HH:mm:ss')
    },
    /**
     * If new time is invalid, do nothing.
     * If valid, update.
     */
    handleDateTimeInputEnter () {
      const newSelectedDateTime = moment(this.displayDateTimeString, this.format, true)
      this.setValue(newSelectedDateTime)
    },
    /**
     * If new SelectedDateTime is valid, update `selectedDateTime` and `calendarTime`
     * Whatever happened, refresh selectedDateTime
     */
    handleDateTimeInputBlur () {
      const newSelectedDateTime = moment(this.displayDateTimeString, this.format, true)
      this.setValue(newSelectedDateTime)
      /**
       * If newSelectedDateTime is invalid, display string need to be restored
       */
      this.refreshSelectedDateTimeString()
    },
    handleDateInputAndTimeInputConfirmClick () {
      const newDisplayDateTimeString = `${this.displayDateString.trim()} ${this.displayTimeString.trim()}`
      const newSelectedDateTime = moment(newDisplayDateTimeString, this.format, true)
      if (this.computedSelectedDateTime === null) {
        this.setValue(moment())
      } else {
        this.setValue(newSelectedDateTime)
        this.refreshSelectedDateTimeString()
      }
      this.closeCalendar()
    },
    /**
     * Calendar view related methods
     */
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
    }
  }
}
</script>
