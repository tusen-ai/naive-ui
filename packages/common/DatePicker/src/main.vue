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
    <n-input
      v-if="isRange"
      :disabled="disabled"
      :value="[displayStartTime, displayEndTime]"
      :placeholder="[computedStartPlaceholder, computedEndPlaceholder]"
      :readonly="disabled ? 'disabled' : false"
      :splitor="splitor"
      split
      @click="handleActivatorClick"
      @focus="handleFocus"
      @blur="handleRangeInputBlur"
      @input="handleRangeInput"
    >
      <template v-slot:suffix>
        <n-icon><ios-calendar /></n-icon>
      </template>
    </n-input>
    <n-input
      v-else
      v-model="displayTime"
      class="n-date-picker__input"
      :disabled="disabled"
      :placeholder="computedPlaceholder"
      :readonly="disabled ? 'disabled' : false"
      @click="handleActivatorClick"
      @focus="handleFocus"
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
          @input="handlePanelInput"
          @close="closeCalendar"
        />
        <daterange-panel
          v-else-if="type === 'daterange'"
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          @input="handleRangePanelInput"
          @close="closeCalendar"
        />
        <datetimerange-panel
          v-else-if="type === 'datetimerange'"
          ref="panel"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="synthesizedTheme"
          @input="handleRangePanelInput"
          @close="closeCalendar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'
import clickoutside from '../../../directives/clickoutside'
import NInput from '../../Input'
import NIcon from '../../Icon'
import iosCalendar from '../../../icons/ios-calendar'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
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
      console.log(newValue)
      this.refresh(newValue)
    }
  },
  created () {
    this.refresh(this.value)
  },
  methods: {
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
    handleTimeInputBlur () {
      if (this.disabled) return
      const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
      console.log('handle blur', this.displayTime, this.computedFormat, new Date())
      console.log('handle blur new time', typeof newSelectedDateTime)
      if (isValid(newSelectedDateTime)) {
        this.$emit('input', getTime(newSelectedDateTime))
      } else {
        this.refreshDisplayTime(this.value)
      }
      this.isFocus = false
    },
    handleRangeInputBlur () {
      if (this.disabled) return
      const startDateTime = strictParse(this.displayStartTime, this.computedFormat, new Date())
      const endDateTime = strictParse(this.displayEndTime, this.computedFormat, new Date())
      if (!isValid(startDateTime) || !isValid(endDateTime)) {
        this.refresh(this.value)
      } else {
        this.changeStartEndTime(startDateTime, endDateTime)
      }
      this.isFocus = false
    },
    // handleStartTimeInputBlur () {
    //   if (this.disabled) return
    //   const startMoment = strictParse(this.displayStartTime, this.computedFormat, null)
    //   if (startMoment !== null) {
    //     this.changeStartDateTime(startMoment)
    //   } else {
    //     this.refresh(this.value)
    //   }
    //   this.isFocus = false
    // },
    // handleEndTimeInputBlur () {
    //   if (this.disabled) return
    //   const endMoment = strictParse(this.displayStartTime, this.computedFormat, null)
    //   if (endMoment !== null) {
    //     this.changeStartDateTime(endMoment)
    //   } else {
    //     this.refresh(this.value)
    //   }
    //   this.isFocus = false
    // },
    /**
     * Input
     */
    handleTimeInput (v) {
      console.log('handle input before strict parse')
      const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
      console.log('handle input', this.displayTime, this.computedFormat, newSelectedDateTime)
      console.log('handle input new time', newSelectedDateTime, typeof newSelectedDateTime)
      if (isValid(newSelectedDateTime)) {
        this.$emit('input', getTime(newSelectedDateTime))
      }
    },
    handleRangeInput (v) {
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
      // console.log('handleRangeInput', v, newStartTime, newEndTime)
    },
    // handleEndTimeInput (e) {
    //   const v = e.target.value
    //   const newEndTime = moment(v, this.computedFormat, true)
    //   if (newEndTime.isValid()) {
    //     this.changeEndDateTime(newEndTime)
    //   }
    // },
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
      // debugger
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
    }
  }
}
</script>
