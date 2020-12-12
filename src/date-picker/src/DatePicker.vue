<template>
  <div
    ref="triggerRef"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-date-picker--disabled': disabled,
      'n-date-picker--range': isRange,
      'n-date-picker--invalid': isValueInvalid && !isRange,
      'n-date-picker--start-invalid': isStartValueInvalid,
      'n-date-picker--end-invalid': isEndValueInvalid
    }"
    class="n-date-picker"
    @keydown="handleKeyDown"
  >
    <v-binder>
      <v-target>
        <n-input
          v-if="isRange"
          ref="inputRef"
          :bordered="mergedBordered"
          :size="mergedSize"
          :theme="mergedTheme"
          passively-activated
          :disabled="disabled"
          :value="[displayStartTime, displayEndTime]"
          :placeholder="[localizedStartPlaceholder, localizedEndPlaceholder]"
          :readonly="disabled ? 'disabled' : false"
          :separator="localizedSeperator"
          :force-focus="active"
          :clearable="clearable"
          pair
          deactivate-on-enter
          @clear="handleClear"
          @click="handleActivatorClick"
          @activate="handleInputActivate"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @deactivate="handleRangeInputDeactivate"
          @input="handleRangeInput"
        >
          <template #suffix>
            <n-icon>
              <calendar-icon />
            </n-icon>
          </template>
        </n-input>
        <n-input
          v-else
          ref="inputRef"
          v-model:value="displayTime"
          :theme="mergedTheme"
          passively-activated
          :size="mergedSize"
          :force-focus="active"
          :disabled="disabled"
          :placeholder="localizedPlacehoder"
          :readonly="disabled ? 'disabled' : false"
          :clearable="clearable"
          deactivate-on-enter
          @click="handleActivatorClick"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @activate="handleInputActivate"
          @deactivate="handleInputDeactivate"
          @input="handleTimeInput"
          @clear="handleClear"
        >
          <template #suffix>
            <n-icon>
              <calendar-icon />
            </n-icon>
          </template>
        </n-input>
      </v-target>
      <v-follower
        :show="active"
        :container-class="namespace"
        :to="adjustedTo"
        placement="bottom-start"
      >
        <transition name="n-fade-in-scale-up-transition" :appear="isMounted">
          <datetime-panel
            v-if="type === 'datetime' && active"
            ref="panelRef"
            v-clickoutside="handleClickOutside"
            :value="value"
            :active="active"
            :actions="actions"
            :theme="mergedTheme"
            :format="computedFormat"
            @update:value="handlePanelInput"
            @tab-out="handlePanelTabOut"
            @close="handlePanelClose"
            @keydown.esc="handlePanelKeyDownEsc"
            @keydown="handleKeyDown"
          />
          <date-panel
            v-else-if="type === 'date' && active"
            ref="panelRef"
            v-clickoutside="handleClickOutside"
            :value="value"
            :active="active"
            :actions="actions"
            :theme="mergedTheme"
            @update:value="handlePanelInput"
            @tab-out="handlePanelTabOut"
            @close="handlePanelClose"
            @keydown.esc="handlePanelKeyDownEsc"
            @keydown="handleKeyDown"
          />
          <daterange-panel
            v-else-if="type === 'daterange' && active"
            ref="panelRef"
            v-clickoutside="handleClickOutside"
            :value="value"
            :active="active"
            :actions="actions"
            :theme="mergedTheme"
            @update:value="handleRangePanelInput"
            @tab-out="handlePanelTabOut"
            @close="handlePanelClose"
            @keydown.esc="handlePanelKeyDownEsc"
            @keydown="handleKeyDown"
          />
          <datetimerange-panel
            v-else-if="type === 'datetimerange' && active"
            ref="panelRef"
            v-clickoutside="handleClickOutside"
            :format="computedFormat"
            :value="value"
            :active="active"
            :actions="actions"
            :theme="mergedTheme"
            @update:value="handleRangePanelInput"
            @close="handlePanelClose"
            @tab-out="handlePanelTabOut"
            @keydown.esc="handlePanelKeyDownEsc"
            @keydown="handleKeyDown"
          />
        </transition>
      </v-follower>
    </v-binder>
  </div>
</template>

<script>
import { ref } from 'vue'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import {
  configurable,
  themeable,
  asFormItem,
  withCssr,
  locale
} from '../../_mixins'
import { warn, call, useAdjustedTo } from '../../_utils'
import { useIsMounted } from 'vooks'

import DatetimePanel from './panel/datetime.vue'
import DatetimerangePanel from './panel/datetimerange.vue'
import DatePanel from './panel/date.vue'
import DaterangePanel from './panel/daterange.vue'

import { NInput } from '../../input'
import { NIcon } from '../../icon'
import { CalendarIcon } from '../../_base/icons'

import { format, getTime, isValid } from 'date-fns'
import { strictParse, getDerivedTimeFromKeyboardEvent } from './utils'
import { isEqual } from 'lodash-es'

import styles from './styles'
import {
  uniCalendarValidation,
  dualCalendarValidation
} from './validation-utils'

const DATE_FORMAT = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

export default {
  name: 'DatePicker',
  directives: {
    clickoutside
  },
  components: {
    VBinder,
    VTarget,
    VFollower,
    NInput,
    NIcon,
    DatetimePanel,
    DatePanel,
    DatetimerangePanel,
    DaterangePanel,
    CalendarIcon
  },
  mixins: [
    configurable,
    themeable,
    locale('DatePicker'),
    asFormItem(),
    withCssr(styles)
  ],
  provide () {
    return {
      NDatePicker: this
    }
  },
  props: {
    bordered: {
      type: Boolean,
      default: undefined
    },
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
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    type: {
      validator (type) {
        return ['date', 'datetime', 'daterange', 'datetimerange'].includes(type)
      },
      default: 'date'
    },
    separator: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    startPlaceholder: {
      type: String,
      default: undefined
    },
    endPlaceholder: {
      type: String,
      default: undefined
    },
    format: {
      type: String,
      default: undefined
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
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'data-picker',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return {
      panelRef: ref(null),
      trackingRef: ref(null),
      triggerRef: ref(null),
      inputRef: ref(null),
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      ...uniCalendarValidation(props),
      ...dualCalendarValidation(props)
    }
  },
  data () {
    return {
      displayTime: '',
      displayStartTime: '',
      displayEndTime: '',
      active: false
    }
  },
  computed: {
    timePickerSize () {
      const { unstableConfig } = this.$naive
      const size = unstableConfig?.DatePicker?.timePickerSize
      if (size) {
        return size
      }
      return 'small'
    },
    isRange () {
      return ['daterange', 'datetimerange'].includes(this.type)
    },
    localizedSeperator () {
      if (this.separator !== undefined) return this.separator
      return this.localeNs.separator
    },
    localizedPlacehoder () {
      if (this.placeholder === undefined) {
        if (this.type === 'date') {
          return this.localeNs.datePlaceholder
        } else if (this.type === 'datetime') {
          return this.localeNs.datetimePlaceholder
        }
        return this.placeholder
      } else {
        return this.placeholder
      }
    },
    localizedStartPlaceholder () {
      if (this.startPlaceholder === undefined) {
        if (this.type === 'daterange') {
          return this.localeNs.startDatePlaceholder
        } else if (this.type === 'datetimerange') {
          return this.localeNs.startDatetimePlaceholder
        }
        return this.startPlaceholder
      } else {
        return this.startPlaceholder
      }
    },
    localizedEndPlaceholder () {
      if (this.endPlaceholder === undefined) {
        if (this.type === 'daterange') {
          return this.localeNs.endDatePlaceholder
        } else if (this.type === 'datetimerange') {
          return this.localeNs.endDatetimePlaceholder
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
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormChange,
        nTriggerFormInput
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      nTriggerFormChange()
      nTriggerFormInput()
    },
    doFocus (...args) {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus, ...args)
      nTriggerFormFocus()
    },
    doBlur (...args) {
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur, ...args)
      nTriggerFormBlur()
    },
    handleKeyDown (e) {
      const value = this.value
      if (this.type === 'date') {
        const nextValue = getDerivedTimeFromKeyboardEvent(value, e)
        if (value !== nextValue) {
          this.doUpdateValue(nextValue)
        }
      }
    },
    handleClear (e) {
      e.stopPropagation()
      this.doUpdateValue(null)
      this.refresh(null)
    },
    handlePanelTabOut () {
      this.closeCalendar({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleClickOutside (e) {
      if (this.active && !this.triggerRef.contains(e.target)) {
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
      this.doUpdateValue(value)
      this.refresh(value)
    },
    handleRangePanelInput (value, valueString) {
      this.doUpdateValue(value)
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
      const { panelRef } = this
      if (!(panelRef && panelRef.$el.contains(e.relatedTarget))) {
        this.cleanValue()
        this.doBlur()
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
        const startDateTime = strictParse(
          this.displayStartTime,
          this.computedFormat,
          new Date()
        )
        const endDateTime = strictParse(
          this.displayEndTime,
          this.computedFormat,
          new Date()
        )
        if (!isValid(startDateTime) || !isValid(endDateTime)) {
          this.refresh(this.value)
        } else {
          this.changeStartEndTime(startDateTime, endDateTime)
        }
      } else {
        const newSelectedDateTime = strictParse(
          this.displayTime,
          this.computedFormat,
          new Date()
        )
        if (isValid(newSelectedDateTime)) {
          this.doUpdateValue(getTime(newSelectedDateTime))
        } else {
          this.refreshDisplayTime(this.value)
        }
      }
    },
    /**
     * Input
     */
    handleTimeInput (v) {
      const newSelectedDateTime = strictParse(
        this.displayTime,
        this.computedFormat,
        new Date()
      )
      if (isValid(newSelectedDateTime)) {
        this.doUpdateValue(getTime(newSelectedDateTime))
      }
    },
    handleRangeInput (v) {
      if (v === null) v = [null, null]
      const [startTime, endTime] = v
      const newStartTime = strictParse(
        startTime,
        this.computedFormat,
        new Date()
      )
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
      this.doFocus()
    },
    /**
     * Calendar
     */
    openCalendar (e) {
      if (this.disabled || this.active) return
      this.active = true
    },
    closeCalendar ({ returnFocus, emitBlur }) {
      if (this.active) {
        this.active = false
        if (returnFocus) {
          const { inputRef } = this
          if (inputRef) {
            inputRef.focus()
          }
        }
        if (emitBlur) {
          this.doBlur()
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
        this.doUpdateValue([time, time])
        this.refresh([time, time])
      } else {
        const newValue = [time, Math.max(this.value[1], time)]
        if (!isEqual(newValue, this.value)) {
          this.doUpdateValue(newValue)
          this.refresh(newValue)
        }
      }
    },
    changeEndDateTime (time) {
      if (typeof time !== 'number') {
        time = getTime(time)
      }
      if (this.value === null) {
        this.doUpdateValue([time, time])
        this.refresh([time, time])
      } else {
        const newValue = [Math.min(this.value[0], time), time]
        if (!isEqual(newValue, this.value)) {
          this.doUpdateValue(newValue)
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
      this.doUpdateValue([startTime, endTime])
      this.refresh([startTime, endTime])
    }
  }
}
</script>
