<template>
  <div
    ref="activator"
    class="n-date-picker"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
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
      :size="size"
      passively-activated
      :disabled="disabled"
      :value="[displayStartTime, displayEndTime]"
      :placeholder="[localizedStartPlaceholder, localizedEndPlaceholder]"
      :readonly="disabled ? 'disabled' : false"
      :seperator="localizedSeperator"
      :force-focus="active"
      :clearable="clearable"
      pair
      @clear="handleClear"
      @click="handleActivatorClick"
      @activate="handleInputActivate"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @deactivate="handleRangeInputDeactivate"
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
      passively-activated
      :size="size"
      :force-focus="active"
      :disabled="disabled"
      :placeholder="localizedPlacehoder"
      :readonly="disabled ? 'disabled' : false"
      :clearable="clearable"
      @click="handleActivatorClick"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @activate="handleInputActivate"
      @deactivate="handleInputDeactivate"
      @input="handleTimeInput"
      @clear="handleClear"
    >
      <template v-slot:suffix>
        <n-icon><ios-calendar /></n-icon>
      </template>
    </n-input>
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-positioning-content"
        @keydown.esc="handlePanelKeyDownEsc"
      >
        <datetime-panel
          v-if="type === 'datetime'"
          ref="panel"
          v-clickoutside="handleClickOutside"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="syntheticTheme"
          :is-date-disabled="isDateDisabled"
          :is-time-disabled="isTimeDisabled"
          :format="computedFormat"
          @tab-out="handlePanelTabOut"
          @input="handlePanelInput"
          @close="handlePanelClose"
        />
        <date-panel
          v-else-if="type === 'date'"
          ref="panel"
          v-clickoutside="handleClickOutside"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="syntheticTheme"
          :is-date-disabled="isDateDisabled"
          @input="handlePanelInput"
          @tab-out="handlePanelTabOut"
          @close="handlePanelClose"
        />
        <daterange-panel
          v-else-if="type === 'daterange'"
          ref="panel"
          v-clickoutside="handleClickOutside"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="syntheticTheme"
          :is-date-disabled="isDateDisabled"
          @input="handleRangePanelInput"
          @tab-out="handlePanelTabOut"
          @close="handlePanelClose"
          @check-value="setInvalidStatus"
        />
        <datetimerange-panel
          v-else-if="type === 'datetimerange'"
          ref="panel"
          v-clickoutside="handleClickOutside"
          :format="computedFormat"
          :value="value"
          :active="active"
          :actions="actions"
          :theme="syntheticTheme"
          :is-date-disabled="isDateDisabled"
          :is-time-disabled="isTimeDisabled"
          @input="handleRangePanelInput"
          @close="handlePanelClose"
          @tab-out="handlePanelTabOut"
          @check-value="setInvalidStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import detachable from '../../_mixins/detachable'
import placeable from '../../_mixins/placeable'
import zindexable from '../../_mixins/zindexable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import clickoutside from '../../_directives/clickoutside'
import locale from '../../_mixins/locale'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'

import NInput from '../../Input'
import NIcon from '../../Icon'
import iosCalendar from '../../_icons/ios-calendar'

import format from 'date-fns/format'
import getTime from 'date-fns/getTime'
import isValid from 'date-fns/isValid'
import { strictParse } from '../../_utils/component/datePicker'
import isEqual from 'lodash-es/isEqual'

const DATE_FORMAT = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
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
    zindexable,
    locale('DatePicker'),
    asformitem()
  ],
  model: {
    prop: 'value',
    event: 'change'
  },
  provide () {
    return {
      NDatePicker: this
    }
  },
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
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
      default: 'medium'
    },
    type: {
      validator (type) {
        return ['date', 'datetime', 'daterange', 'datetimerange'].includes(type)
      },
      default: 'date'
    },
    seperator: {
      type: String,
      default: undefined
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
    localizedSeperator () {
      if (this.sepearator !== undefined) return this.seperator
      return this.localeNamespace.seperator
    },
    localizedPlacehoder () {
      if (this.placeholder === null) {
        if (this.type === 'date') {
          return this.localeNamespace.datePlaceholder
        } else if (this.type === 'datetime') {
          return this.localeNamespace.datetimePlaceholder
        }
        return this.placeholder
      } else {
        return this.placeholder
      }
    },
    localizedStartPlaceholder () {
      if (this.startPlaceholder === null) {
        if (this.type === 'daterange') {
          return this.localeNamespace.startDatePlaceholder
        } else if (this.type === 'datetimerange') {
          return this.localeNamespace.startDatetimePlaceholder
        }
        return this.startPlaceholder
      } else {
        return this.startPlaceholder
      }
    },
    localizedEndPlaceholder () {
      if (this.endPlaceholder === null) {
        if (this.type === 'daterange') {
          return this.localeNamespace.endDatePlaceholder
        } else if (this.type === 'datetimerange') {
          return this.localeNamespace.endDatetimePlaceholder
        }
        return this.endPlaceholder
      } else {
        return this.endPlaceholder
      }
    },
    computedFormat () {
      return this.format || DATE_FORMAT[this.type]
    }
  },
  watch: {
    /**
     * If new value is valid, set calendarTime and refresh display strings.
     * If new value is invalid, do nothing.
     */
    value (value, oldValue) {
      this.refresh(value)
    }
  },
  created () {
    this.refresh(this.value)
  },
  methods: {
    handleClear (e) {
      e.stopPropagation()
      this.$emit('change', null)
      this.refresh(null)
    },
    handlePanelTabOut () {
      this.closeCalendar({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleClickOutside (e) {
      if (this.active && !this.$refs.activator.contains(e.target)) {
        this.closeCalendar({
          returnFocus: false,
          emitBlur: true
        })
      }
    },
    handlePanelClose () {
      this.closeCalendar({
        returnFocus: true,
        emitBlur: false
      })
    },
    handlePanelKeyDownEsc () {
      this.closeCalendar({
        returnFocus: true,
        emitBlur: false
      })
    },
    /**
     * Panel Input
     */
    handlePanelInput (value, valueString) {
      this.$emit('change', value)
      this.refresh(value)
    },
    handleRangePanelInput (value, valueString) {
      this.$emit('change', value)
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
    handleInputActivate () {
      if (this.disabled) return
      if (!this.active) {
        this.openCalendar()
      }
    },
    /**
     * input deactivate & blur
     */
    handleInputBlur (e) {
      if (!(
        this.$refs.panel &&
        this.$refs.panel.$el.contains(e.relatedTarget)
      )) {
        this.cleanValue()
        this.$emit('blur')
        this.closeCalendar({
          returnFocus: false,
          emitBlur: false
        })
      }
    },
    handleInputDeactivate (e) {
      if (this.disabled) return
      this.cleanValue()
      this.closeCalendar({
        returnFocus: false,
        emitBlur: false
      })
    },
    handleRangeInputDeactivate (e) {
      if (this.disabled) return
      this.cleanValue()
      this.closeCalendar({
        returnFocus: false,
        emitBlur: false
      })
    },
    cleanValue () {
      if (this.isRange) {
        const startDateTime = strictParse(this.displayStartTime, this.computedFormat, new Date())
        const endDateTime = strictParse(this.displayEndTime, this.computedFormat, new Date())
        if (!isValid(startDateTime) || !isValid(endDateTime)) {
          this.refresh(this.value)
        } else {
          this.changeStartEndTime(startDateTime, endDateTime)
        }
      } else {
        const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
        if (isValid(newSelectedDateTime)) {
          this.$emit('change', getTime(newSelectedDateTime))
        } else {
          this.refreshDisplayTime(this.value)
        }
      }
    },
    /**
     * Input
     */
    handleTimeInput (v) {
      const newSelectedDateTime = strictParse(this.displayTime, this.computedFormat, new Date())
      if (isValid(newSelectedDateTime)) {
        this.$emit('change', getTime(newSelectedDateTime))
      }
    },
    handleRangeInput (v, isValueInvalid) {
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
      if (!this.active) {
        this.openCalendar()
      }
    },
    /**
     * Focus
     */
    handleInputFocus () {
      if (this.disabled) return
      this.$emit('focus')
    },
    /**
     * Calendar
     */
    openCalendar (e) {
      if (this.disabled || this.active) return
      this.active = true
      this.$nextTick().then(this.updatePosition)
    },
    closeCalendar ({
      returnFocus,
      emitBlur
    }) {
      if (this.active) {
        this.active = false
        if (returnFocus) {
          if (this.$refs.input) {
            this.$refs.input.focus()
          }
        }
        if (emitBlur) {
          this.$emit('blur')
        }
      }
    },
    /**
     * Utils
     */
    changeStartDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('change', [time, time])
        this.refresh([time, time])
      } else {
        const newValue = [time, Math.max(this.value[1], time)]
        if (!isEqual(newValue, this.value)) {
          this.$emit('change', newValue)
          this.refresh(newValue)
        }
      }
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.$emit('change', [time, time])
        this.refresh([time, time])
      } else {
        const newValue = [Math.min(this.value[0], time), time]
        if (!isEqual(newValue, this.value)) {
          this.$emit('change', newValue)
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
      this.$emit('change', [startTime, endTime])
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
