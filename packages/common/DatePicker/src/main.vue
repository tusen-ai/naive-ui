<template>
  <div
    ref="activator"
    class="n-date-picker"
    :class="{
      [`n-date-picker--${size}-size`]: true,
      'n-date-picker--disabled': disabled,
      'n-date-picker--range': isRange
    }"
  >
    <div
      v-if="isRange"
      class="n-date-picker__editor"
      :class="{
        'n-date-picker__editor--focus': isFocus
      }"
      @click="handleActivatorClick"
    >
      <input
        v-model="displayStartTime"
        class="n-date-picker__input n-date-picker__input--start"
        :placeholder="computedStartPlaceholder"
        :readonly="disabled ? 'disabled' : false"
        @focus="handleFocus"
        @blur="handleStartTimeInputBlur"
        @input="handleStartTimeInput"
      >
      <input
        class="n-date-picker__input n-date-picker__input--splitor"
        :value="splitor"
        readonly="readonly"
      >
      <input
        v-model="displayEndTime"
        class="n-date-picker__input n-date-picker__input--end"
        :placeholder="computedEndPlaceholder"
        :readonly="disabled ? 'disabled' : false"
        @focus="handleFocus"
        @blur="handleEndTimeInputBlur"
        @input="handleEndTimeInput"
      >
      <div class="n-date-picker__icon">
        <n-icon
          size="20"
          type="ios-calendar"
        />
      </div>
    </div>
    <div
      v-else
      class="n-date-picker__editor"
      :class="{
        'n-date-picker__editor--focus': isFocus
      }"
    >
      <input
        v-model="displayTime"
        class="n-date-picker__input"
        :placeholder="computedPlaceholder"
        :readonly="disabled ? 'disabled' : false"
        @click="handleActivatorClick"
        @focus="handleFocus"
        @blur="handleTimeInputBlur"
        @input="handleTimeInput"
      >
      <div class="n-date-picker__icon">
        <n-icon
          size="20"
          type="ios-calendar"
        />
      </div>
    </div>
    <div
      ref="contentContainer"
      class="n-detached-content-container n-date-picker-detached-content-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        v-clickoutside="handleClickOutside"
        class="n-dateched-content"
      >
        <datetime-panel
          v-if="type === 'datetime'"
          :value="value"
          :active="active"
          :actions="actions"
          @input="handlePanelInput"
          @close="closeCalendar"
        />
        <date-panel
          v-else-if="type === 'date'"
          :value="value"
          :active="active"
          :actions="actions"
          @input="handlePanelInput"
          @close="closeCalendar"
        />
        <daterange-panel
          v-else-if="type === 'daterange'"
          :value="value"
          :active="active"
          :actions="actions"
          @input="handleRangePanelInput"
          @close="closeCalendar"
        />
        <datetimerange-panel
          v-else-if="type === 'datetimerange'"
          :value="value"
          :active="active"
          :actions="actions"
          @input="handleRangePanelInput"
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
import zindexable from '../../../mixins/zindexable'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'
import clickoutside from '../../../directives/clickoutside'

const DATE_FORMAT = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  datetimerange: 'YYYY-MM-DD HH:mm:ss'
}
const DATE_VALIDATE_FORMAT = {
  date: ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD'],
  datetime: ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-D HH:mm:ss', 'YYYY-M-D HH:mm:ss', 'YYYY-M-DD HH:mm:ss'],
  daterange: ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD'],
  datetimerange: ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-D HH:mm:ss', 'YYYY-M-D HH:mm:ss', 'YYYY-M-DD HH:mm:ss']
}
const PLACEHOLDER = {
  date: 'Select date',
  datetime: 'Select date and time'
}
const START_PLACEHOLDER = {
  datetimerange: 'Start date and time',
  daterange: 'Start date'
}
const END_PLACEHOLDER = {
  datetimerange: 'End date and time',
  daterange: 'End date'
}

export default {
  name: 'NDatePicker',
  directives: {
    clickoutside
  },
  components: {
    NIcon,
    DatetimePanel,
    DatePanel,
    DatetimerangePanel,
    DaterangePanel
  },
  mixins: [
    detachable,
    placeable,
    zindexable
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
      type: [Number, Array],
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
      validator (type) {
        return ['date', 'datetime', 'daterange', 'datetimerange'].includes(type)
      },
      default: 'date'
    },
    splitor: {
      type: String,
      default: 'to'
    },
    placeholder: {
      type: String,
      default: null
    },
    startPlaceholder: {
      type: String,
      default: null
    },
    endPlaceholder: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: null
    },
    actions: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      displayTime: '',
      displayStartTime: '',
      displayEndTime: '',
      active: false,
      isFocus: false
    }
  },
  computed: {
    isRange () {
      return ['daterange', 'datetimerange'].includes(this.type)
    },
    computedPlaceholder () {
      if (this.placeholder === null) {
        return PLACEHOLDER[this.type]
      } else {
        return this.placeholder
      }
    },
    computedStartPlaceholder () {
      if (this.placeholder === null) {
        return START_PLACEHOLDER[this.type]
      } else {
        return this.startPlaceholder
      }
    },
    computedEndPlaceholder () {
      if (this.placeholder === null) {
        return END_PLACEHOLDER[this.type]
      } else {
        return this.endPlaceholder
      }
    },
    computedValidateFormat () {
      return DATE_VALIDATE_FORMAT[this.type]
    },
    computedFormat () {
      return DATE_FORMAT[this.type]
    }
  },
  watch: {
    /**
     * If new value is valid, set calendarTime and refresh display strings.
     * If new value is invalid, do nothing.
     */
    value (newValue) {
      this.refresh(newValue)
    }
  },
  created () {
    this.refresh(this.value)
  },
  methods: {
    handleClickOutside (e) {
      if (!this.$refs.activator.contains(e.target)) {
        this.closeCalendar()
      }
    },
    /**
     * Panel Input
     */
    handlePanelInput (value, valueString) {
      this.$emit('input', value, 'unavailable for now')
      this.refresh(value)
    },
    handleRangePanelInput (value, valueString) {
      this.$emit('input', value, 'unavailable for now')
      this.refresh(value)
    },
    /**
     * Refresh
     */
    refresh (value) {
      if (this.isRange) {
        this.refreshDisplayRange(value)
      } else {
        this.refreshDisplayTime(value)
      }
    },
    refreshDisplayTime (value) {
      if (value === null) {
        this.displayTime = ''
      } else {
        this.displayTime = moment(value).format(this.computedFormat)
      }
    },
    refreshDisplayRange (values) {
      if (values === null) {
        this.displayStartTime = ''
        this.displayEndTime = ''
      } else {
        this.displayStartTime = moment(values[0]).format(this.computedFormat)
        this.displayEndTime = moment(values[1]).format(this.computedFormat)
      }
    },
    /**
     * Blur
     */
    handleTimeInputBlur () {
      if (this.disabled) return
      const newSelectedDateTime = moment(this.displayTime, this.computedValidateFormat, true)
      if (newSelectedDateTime.isValid()) {
        this.$emit('input', newSelectedDateTime.valueOf())
      } else {
        this.refreshDisplayTime(this.value)
      }
      this.isFocus = false
    },
    handleStartTimeInputBlur () {
      if (this.disabled) return
      const startMoment = moment(this.displayStartTime, this.computedValidateFormat, true)
      if (startMoment.isValid()) {
        this.changeStartDateTime(startMoment)
      } else {
        this.refresh(this.value)
      }
      this.isFocus = false
    },
    handleEndTimeInputBlur () {
      if (this.disabled) return
      const endMoment = moment(this.displayStartTime, this.computedValidateFormat, true)
      if (endMoment.isValid()) {
        this.changeStartDateTime(endMoment)
      } else {
        this.refresh(this.value)
      }
      this.isFocus = false
    },
    /**
     * Input
     */
    handleTimeInput (v) {
      const newSelectedDateTime = moment(this.displayTime, this.computedFormat, true)
      if (newSelectedDateTime.isValid()) {
        this.$emit('input', newSelectedDateTime.valueOf())
      }
    },
    handleStartTimeInput (e) {
      const v = e.target.value
      const newStartTime = moment(v, this.computedFormat, true)
      if (newStartTime.isValid()) {
        this.changeStartDateTime(newStartTime)
      }
    },
    handleEndTimeInput (e) {
      const v = e.target.value
      const newEndTime = moment(v, this.computedFormat, true)
      if (newEndTime.isValid()) {
        this.changeEndDateTime(newEndTime)
      }
    },
    /**
     * Click
     */
    handleActivatorClick (e) {
      if (this.disabled) return
      // console.log('handleActivatorClick')
      if (this.active) {
        e.stopPropagation()
      } else {
        // console.log('open calendar')
        this.openCalendar()
      }
    },
    /**
     * Focus
     */
    handleFocus () {
      if (this.disabled) return
      this.isFocus = true
    },
    /**
     * Calendar
     */
    openCalendar (e) {
      if (this.disabled || this.active) return
      this.active = true
      // console.log('into open calendar')
      this.$nextTick().then(this.updatePosition)
    },
    closeCalendar () {
      this.active = false
    },
    toggleCalendar () {

    },
    /**
     * Utils
     */
    changeStartDateTime (time) {
      if (typeof time !== 'number') {
        time = time.valueOf()
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
        this.refresh([time, time])
      } else {
        this.$emit('input', [time, Math.max(this.value[1], time)])
        this.refresh([time, Math.max(this.value[1], time)])
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
      this.refresh([startTime, endTime])
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = time.valueOf()
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
        this.refresh([time, time])
      } else {
        this.$emit('input', [Math.min(this.value[0], time), time])
        this.refresh([Math.min(this.value[0], time), time])
      }
    }
  }
}
</script>
