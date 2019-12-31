<template>
  <div
    ref="activator"
    class="n-date-picker"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-date-picker--${size}-size`]: true,
      'n-date-picker--disabled': disabled,
      'n-date-picker--range': isRange,
      'n-date-picker--invalid': isValueInvalid && !isRange,
      'n-date-picker--start-invalid': isStartValueInvalid,
      'n-date-picker--end-invalid': isEndValueInvalid
    }"
  >
    <n-input
      v-if="isRange"
      ref="input"
      :lazy-focus="true"
      :disabled="disabled"
      :value="[displayStartTime, displayEndTime]"
      :placeholder="[computedStartPlaceholder, computedEndPlaceholder]"
      :readonly="disabled ? 'disabled' : false"
      :seperator="seperator"
      :force-focus="active"
      pair
      @click="handleActivatorClick"
      @focus="handleFocus"
      @wrapper-blur-to-outside="handleRangeInputWrapperBlur"
      @blur="handleRangeInputBlur"
      @input="handleRangeInput"
    >
      <template v-slot:suffix>
        <n-icon><ios-calendar /></n-icon>
      </template>
    </n-input>
    <n-input
      v-else
      ref="input"
      v-model="displayTime"
      :force-focus="active"
      :disabled="disabled"
      :lazy-focus="true"
      :placeholder="computedPlaceholder"
      :readonly="disabled ? 'disabled' : false"
      @click="handleActivatorClick"
      @focus="handleFocus"
      @wrapper-blur-to-outside="handleTimeInputWrapperBlur"
      @blur="handleTimeInputBlur"
      @input="handleTimeInput"
    >
      <template v-slot:suffix>
        <n-icon><ios-calendar /></n-icon>
      </template>
    </n-input>
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
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          :is-date-disabled="isDateDisabled"
          :is-time-disabled="isTimeDisabled"
          @blur="handlePanelBlur"
          @input="handlePanelInput"
          @close="closeCalendar"
        />
        <date-panel
          v-else-if="type === 'date'"
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          :is-date-disabled="isDateDisabled"
          @input="handlePanelInput"
          @blur="handlePanelBlur"
          @close="closeCalendar"
        />
        <daterange-panel
          v-else-if="type === 'daterange'"
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          :is-date-disabled="isDateDisabled"
          @input="handleRangePanelInput"
          @blur="handlePanelBlur"
          @close="closeCalendar"
          @check-value="setInvalidStatus"
        />
        <datetimerange-panel
          v-else-if="type === 'datetimerange'"
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          :is-date-disabled="isDateDisabled"
          :is-time-disabled="isTimeDisabled"
          @input="handleRangePanelInput"
          @close="closeCalendar"
          @blur="handlePanelBlur"
          @check-value="setInvalidStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'
import clickoutside from '../../../directives/clickoutside'

import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'

import NInput from '../../Input'
import NIcon from '../../Icon'
import iosCalendar from '../../../icons/ios-calendar'

import format from 'date-fns/format'
import getTime from 'date-fns/getTime'
import isValid from 'date-fns/isValid'
import { strictParse } from '../../../utils/dateUtils'
import isEqual from 'lodash/isEqual'

const DATE_FORMAT = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}
const DATE_VALIDATE_FORMAT = {
  date: ['yyyy-MM-dd', 'yyyy-MM-D', 'yyyy-M-D', 'yyyy-M-dd'],
  datetime: ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-D HH:mm:ss', 'yyyy-M-D HH:mm:ss', 'yyyy-M-dd HH:mm:ss'],
  daterange: ['yyyy-MM-dd', 'yyyy-MM-D', 'yyyy-M-D', 'yyyy-M-dd'],
  datetimerange: ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-D HH:mm:ss', 'yyyy-M-D HH:mm:ss', 'yyyy-M-dd HH:mm:ss']
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
  provide () {
    return {
      NDatePicker: this
    }
  },
  components: {
    NInput,
    NIcon,
    DatetimePanel,
    DatePanel,
    DatetimerangePanel,
    DaterangePanel,
    iosCalendar
  },
  mixins: [
    withapp,
    themeable,
    detachable,
    placeable,
    zindexable,
    asformitem()
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
    seperator: {
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
    },
    isDateDisabled: {
      type: Function,
      default: undefined
    },
    isTimeDisabled: {
      type: Function,
      default: undefined
    },
    rangeTimeDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    disabledTime: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      displayTime: '',
      displayStartTime: '',
      displayEndTime: '',
      active: false,
      isValueInvalid: false,
      isEndValueInvalid: false,
      isStartValueInvalid: false
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
    value (value, oldValue) {
      this.refresh(value)
      if (this.isRange) {
        if (!(
          Array.isArray(value) &&
          Array.isArray(oldValue) &&
          value.length === 2 &&
          value.length === oldValue.length &&
          value[0] === oldValue[0] &&
          value[1] === oldValue[1]
        )) {
          this.$emit('change', value, oldValue)
        }
      } else { this.$emit('change', value, oldValue) }
    }
  },
  created () {
    this.refresh(this.value)
  },
  methods: {
    /**
     * this blur is not really blur event, its key tab out of panel
     */
    handlePanelBlur () {
      this.closeCalendar(true)
    },
    handleClickOutside (e) {
      if (this.active && !this.$refs.activator.contains(e.target)) {
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
        this.displayTime = format(value, this.computedFormat)
      }
    },
    refreshDisplayRange (values) {
      if (values === null) {
        this.displayStartTime = ''
        this.displayEndTime = ''
      } else {
        this.displayStartTime = format(values[0], this.computedFormat)
        this.displayEndTime = format(values[1], this.computedFormat)
      }
    },
    /**
     * Blur
     */
    afterBlur (e) {
      if (this.active) {
        window.setTimeout(() => {
          if (!(this.$refs.panel && this.$refs.panel.$el.contains(document.activeElement))) {
            this.closeCalendar()
          }
        }, 0)
      }
    },
    handleTimeInputWrapperBlur (e) {
      if (!this.active) {
        this.$emit('blur', this.value)
      }
    },
    handleTimeInputBlur (e) {
      if (this.disabled) return
      const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
      if (isValid(newSelectedDateTime)) {
        this.$emit('input', getTime(newSelectedDateTime))
      } else {
        this.refreshDisplayTime(this.value)
      }
      this.afterBlur(e)
    },
    handleRangeInputWrapperBlur (e) {
      if (!this.active) {
        this.$emit('blur', this.value)
      }
    },
    handleRangeInputBlur (e) {
      if (this.disabled) return
      const startDateTime = strictParse(this.displayStartTime, this.computedFormat, new Date())
      const endDateTime = strictParse(this.displayEndTime, this.computedFormat, new Date())
      if (!isValid(startDateTime) || !isValid(endDateTime)) {
        this.refresh(this.value)
      } else {
        this.changeStartEndTime(startDateTime, endDateTime)
      }
      this.afterBlur(e)
    },
    /**
     * Input
     */
    handleTimeInput (v) {
      const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
      if (isValid(newSelectedDateTime)) {
        this.$emit('input', getTime(newSelectedDateTime))
      }
    },
    handleRangeInput (v, isValueInvalid) {
      // const v = e.target.value
      if (v === null) v = [null, null]
      const [startTime, endTime] = v
      const newStartTime = strictParse(startTime, this.computedFormat, new Date())
      if (startTime !== this.displayStartTime && isValid(newStartTime)) {
        this.changeStartDateTime(newStartTime)
      }
      const newEndTime = strictParse(endTime, this.computedFormat, new Date())
      if (endTime !== this.displayEndTime && isValid(newEndTime)) {
        this.changeEndDateTime(newEndTime)
      }
      this.displayStartTime = startTime
      this.displayEndTime = endTime
    },
    /**
     * Click
     */
    handleActivatorClick (e) {
      if (this.disabled) return
      if (this.active) {
        e.stopPropagation()
      } else {
        this.openCalendar()
      }
    },
    /**
     * Focus
     */
    handleFocus () {
      if (this.disabled) return
      if (!this.active) this.openCalendar()
    },
    /**
     * Calendar
     */
    openCalendar (e) {
      if (this.disabled || this.active) return
      this.active = true
      this.$nextTick().then(this.updatePosition)
    },
    closeCalendar (returnFocus = false) {
      if (this.active) {
        this.active = false
        if (returnFocus) {
          if (this.$refs.input && this.$refs.input.$el) {
            this.$refs.input.$el.focus()
          }
        } else {
          this.$emit('blur', this.value)
        }
      }
    },
    toggleCalendar () {

    },
    /**
     * Utils
     */
    changeStartDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
        this.refresh([time, time])
      } else {
        const newValue = [time, Math.max(this.value[1], time)]
        if (!isEqual(newValue, this.value)) {
          this.$emit('input', newValue)
          this.refresh(newValue)
        }
      }
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('input', [time, time])
        this.refresh([time, time])
      } else {
        const newValue = [Math.min(this.value[0], time), time]
        if (!isEqual(newValue, this.value)) {
          this.$emit('input', newValue)
          this.refresh(newValue)
        }
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
      this.refresh([startTime, endTime])
    },
    setInvalidStatus (isValueInvalid) {
      this.isValueInvalid = isValueInvalid
    },
    setStartInvalidStatus (isStartValueInvalid) {
      this.isStartValueInvalid = isStartValueInvalid
    },
    setEndInvalidStatus (isEndValueInvalid) {
      this.isEndValueInvalid = isEndValueInvalid
    }
  }
}
</script>
