<template>
  <div
    ref="activator"
    class="n-date-picker"
    :class="{
      [`n-date-picker--${size}-size`]: true,
      'n-date-picker--disabled': disabled
    }"
  >
    <input
      v-model="displayDateTimeString"
      class="n-date-picker__input"
      :placeholder="placeholder"
      :readonly="disabled ? 'disabled' : false"
      @click="handleActivatorClick"
      @blur="handleDateTimeInputBlur"
      @input="handleDateTimeInputInput"
    >
    <div class="n-date-picker__icon">
      <n-icon
        size="20"
        type="ios-calendar"
      />
    </div>
    <div
      ref="contentWrapper"
      class="n-content-wrapper"
    >
      <div ref="content">
        <datetime-panel
          v-if="type === 'datetime'"
          :value="value"
          :active="active"
          @input="handlePanelInput"
          @close="closeCalendar"
        />
        <date-panel
          v-if="type === 'date'"
          :value="value"
          :active="active"
          @input="handlePanelInput"
          @close="closeCalendar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import NIcon from '../../Icon'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import DatetimePanel from './panel/datetime'
import DatePanel from './panel/date'
import clickoutside from '../../../directives/clickoutside'

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
  directives: {
    clickoutside
  },
  components: {
    NIcon,
    DatetimePanel,
    DatePanel
  },
  mixins: [
    detachable,
    placeable
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    value: {
      type: Number,
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
      rightDisplayDateTimeString: '',
      calendarDateTime: moment(),
      rightCalendarDateTime: moment(),
      currentDateTime: moment(),
      active: false,
      calendar: [],
      rightCalendar: [],
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
    handlePanelInput (value, valueString) {
      this.$emit('input', value, 'unavailable for now')
      this.refreshSelectedDateTimeString()
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
    },
    /**
     * If new SelectedDateTime is valid, update `selectedDateTime` and `calendarTime`
     * Whatever happened, refresh selectedDateTime
     */
    handleDateTimeInputBlur () {
      const newSelectedDateTime = moment(this.displayDateTimeString, this.format, true)
      if (newSelectedDateTime.isValid()) {
        this.$emit('input', newSelectedDateTime.valueOf())
      } else {
        this.refreshSelectedDateTimeString()
      }
    },
    handleActivatorClick (e) {
      if (this.active) {
        e.stopPropagation()
      } else {
        this.openCalendar()
      }
    },
    /**
     * Calendar view related methods
     */
    openCalendar (e) {
      /**
       * May leak memory here if change disabled from false to true
       */
      if (this.disabled) return
      this.active = true
      this.$nextTick().then(this.updatePosition)
    },
    closeCalendar () {
      this.active = false
      this.showTimeSelector = false
    },
    toggleCalendar () {

    },
    handleDateTimeInputInput (v) {
      const newSelectedDateTime = moment(this.displayDateTimeString, this.format, true)
      if (newSelectedDateTime.isValid()) {
        this.$emit('input', newSelectedDateTime.valueOf())
      }
    }
  }
}
</script>
