<template>
  <div
    class="n-time-picker"
    :class="{
      'n-time-picker--invalid': isValueInvalid,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <v-binder>
      <v-target>
        <n-input
          ref="inputRef"
          v-model:value="displayTimeString"
          :bordered="mergedBordered"
          passively-activated
          deactivate-on-enter
          :attr-size="mergedAttrSize"
          :theme="mergedTheme"
          :stateful="stateful"
          :size="mergedSize"
          :force-focus="active"
          :placeholder="localizedPlaceholder"
          :clearable="clearable"
          :disabled="disabled"
          @focus="handleTimeInputFocus"
          @blur="handleTimeInputBlur"
          @activate="handleTimeInputActivate"
          @deactivate="handleTimeInputDeactivate"
          @input="handleTimeInput"
          @clear="handleTimeInputClear"
        >
          <template v-if="showIcon" #suffix>
            <n-icon>
              <time-icon />
            </n-icon>
          </template>
        </n-input>
      </v-target>
      <v-follower
        :teleport-disabled="teleportDisabled"
        :show="active"
        :to="adjustedTo"
        :container-class="namespace"
        placement="bottom-start"
      >
        <transition name="n-fade-in-scale-up-transition" :appear="isMounted">
          <panel
            v-if="active"
            ref="panelRef"
            v-clickoutside="handleClickOutside"
            :theme="mergedTheme"
            :transition-disabled="transitionDisabled"
            :hour-value="hourValue"
            :show-hour="hourInFormat"
            :is-hour-invalid="isHourInvalid"
            :is-hour-disabled="isHourDisabled"
            :minute-value="minuteValue"
            :show-minute="minuteInFormat"
            :is-minute-invalid="isMinuteInvalid"
            :is-minute-disabled="isMinuteDisabled"
            :second-value="secondValue"
            :show-second="secondInFormat"
            :is-second-invalid="isSecondInvalid"
            :is-second-disabled="isSecondDisabled"
            :is-value-invalid="isValueInvalid"
            :now-text="localizedNow"
            :confirm-text="localizedPositiveText"
            @focus="handleMenuFocus"
            @keydown="handleMenuKeyDown"
            @hour-click="handleHourClick"
            @minute-click="handleMinuteClick"
            @second-click="handleSecondClick"
            @now-click="handleNowClick"
            @confirm-click="handleConfirmClick"
            @focus-detector-focus="handleFocusDetectorFocus"
          />
        </transition>
      </v-follower>
    </v-binder>
  </div>
</template>

<script>
import { ref, toRef } from 'vue'
import { useIsMounted, useKeyboard, useMergedState } from 'vooks'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { NInput } from '../../input'
import { NIcon } from '../../icon'
import {
  configurable,
  themeable,
  locale,
  withCssr,
  asFormItem
} from '../../_mixins'
import {
  isValid,
  startOfSecond,
  startOfMinute,
  startOfHour,
  format,
  set,
  setHours,
  setMinutes,
  setSeconds,
  getTime,
  getMinutes,
  getHours,
  getSeconds
} from 'date-fns'
import { strictParse } from '../../date-picker/src/utils'
import { TimeIcon } from '../../_base/icons'
import styles from './styles'
import { warn, call, useAdjustedTo } from '../../_utils'
import Panel from './Panel.vue'

export default {
  name: 'TimePicker',
  components: {
    NInput,
    NIcon,
    VBinder,
    VTarget,
    VFollower,
    Panel,
    TimeIcon
  },
  directives: {
    clickoutside
  },
  mixins: [
    configurable,
    themeable,
    locale('TimePicker'),
    asFormItem(),
    withCssr(styles)
  ],
  props: {
    bordered: {
      type: Boolean,
      default: undefined
    },
    defaultValue: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    value: {
      type: Number,
      default: undefined
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    isHourDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    isMinuteDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    isSecondDisabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    // private
    stateful: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // private
    position: {
      type: String,
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'time-picker',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    teleportDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      inputRef: ref(null),
      panelRef: ref(null),
      adjustedTo: useAdjustedTo(props),
      keyboardState: useKeyboard()
    }
  },
  data () {
    // TODO refactor
    const { value } = this
    const initValue = value === undefined ? this.defaultValue : value
    return {
      active: false,
      displayTimeString:
        initValue === null
          ? null
          : format(initValue, this.format, this.dateFnsOptions),
      memorizedValue: initValue,
      transitionDisabled: false
    }
  },
  computed: {
    localizedNow () {
      return this.localeNs.now
    },
    localizedPlaceholder () {
      if (this.placeholder !== undefined) return this.placeholder
      return this.localeNs.placeholder
    },
    localizedNegativeText () {
      return this.localeNs.negativeText
    },
    localizedPositiveText () {
      return this.localeNs.positiveText
    },
    dateFnsOptions () {
      return {
        locale: this.dateFnsLocale
      }
    },
    hourInFormat () {
      return /H|h|K|k/.test(this.format)
    },
    minuteInFormat () {
      return /m/.test(this.format)
    },
    secondInFormat () {
      return /s/.test(this.format)
    },
    isHourInvalid () {
      if (this.mergedValue === null) return false
      return this.isHourDisabled(this.hourValue)
    },
    isMinuteInvalid () {
      if (this.mergedValue === null) return false
      return this.isMinuteDisabled(this.minuteValue, this.hourValue)
    },
    isSecondInvalid () {
      if (this.mergedValue === null) return false
      return this.isSecondDisabled(
        this.secondValue,
        this.minuteValue,
        this.hourValue
      )
    },
    isValueInvalid () {
      return this.isHourInvalid || this.isMinuteInvalid || this.isSecondInvalid
    },
    mergedAttrSize () {
      return this.format.length + 4
    },
    valueAsDate () {
      if (this.mergedValue === null) return null
      else return new Date(this.mergedValue)
    },
    hourValue () {
      if (this.valueAsDate) {
        return Number(format(this.valueAsDate, 'HH', this.dateFnsOptions))
      } else return null
    },
    minuteValue () {
      if (this.valueAsDate) {
        return Number(format(this.valueAsDate, 'mm', this.dateFnsOptions))
      } else return null
    },
    secondValue () {
      if (this.valueAsDate) {
        return Number(format(this.valueAsDate, 'ss', this.dateFnsOptions))
      } else return null
    }
  },
  watch: {
    valueAsDate (value) {
      this.refreshTimeString(value)
      this.disableTransitionOneTick()
      this.$nextTick(this.scrollTimer)
    },
    active (value) {
      if (this.isValueInvalid) {
        this.doChange(this.memorizedValue)
      }
    }
  },
  methods: {
    doChange (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormChange,
        nTriggerFormInput
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
      this.uncontrolledValue = value
      nTriggerFormChange()
      nTriggerFormInput()
    },
    doFocus () {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus)
      nTriggerFormFocus()
    },
    doBlur () {
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur)
      nTriggerFormBlur()
    },
    handleTimeInputClear (e) {
      e.stopPropagation()
      this.doChange(null)
      this.refreshTimeString(null)
    },
    handleFocusDetectorFocus () {
      this.closePanel({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleMenuKeyDown (e) {
      switch (e.key) {
        case 'Escape':
          this.closePanel({
            returnFocus: true,
            emitBlur: false
          })
          break
        case 'Tab':
          if (this.keyboardState.shift && e.target === this.panelRef.$el) {
            e.preventDefault()
            this.closePanel({
              returnFocus: true,
              emitBlur: false
            })
          }
          break
      }
    },
    disableTransitionOneTick () {
      this.transitionDisabled = true
      this.$nextTick(() => {
        this.transitionDisabled = false
      })
    },
    justifyValueAfterInput () {
      const time = strictParse(
        this.displayTimeString,
        this.format,
        new Date(),
        this.dateFnsOptions
      )
      if (isValid(time)) {
        if (this.valueAsDate !== null) {
          const newTime = set(this.valueAsDate, {
            hours: getHours(time),
            minutes: getMinutes(time),
            seconds: getSeconds(time)
          })
          this.doChange(getTime(newTime))
        } else {
          this.doChange(getTime(time))
        }
      }
    },
    handleHourClick (hour) {
      if (this.isHourDisabled(hour)) {
        return
      }
      if (this.mergedValue === null) {
        const newValue = getTime(setHours(startOfHour(new Date()), hour))
        this.doChange(newValue)
      } else {
        const newValue = getTime(setHours(this.mergedValue, hour))
        this.doChange(newValue)
      }
    },
    handleMinuteClick (minute) {
      if (this.isMinuteDisabled(minute, this.hourValue)) {
        return
      }
      if (this.mergedValue === null) {
        this.doChange(getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        this.doChange(getTime(setMinutes(this.mergedValue, minute)))
      }
    },
    handleSecondClick (second) {
      if (this.isSecondDisabled(second, this.minuteValue, this.hourValue)) {
        return
      }
      if (this.mergedValue === null) {
        this.doChange(getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        this.doChange(getTime(setSeconds(this.mergedValue, second)))
      }
    },
    refreshTimeString (time) {
      if (time === undefined) time = this.valueAsDate
      if (time === null) this.displayTimeString = ''
      else {
        this.displayTimeString = format(time, this.format, this.dateFnsOptions)
      }
    },
    handleTimeInputWrapperBlur () {
      if (!this.active) {
        this.doBlur()
      }
    },
    handleTimeInputFocus () {
      this.doFocus()
    },
    handleTimeInputBlur (e) {
      if (this.active) {
        const panel = this.panelRef.$el
        if (!(panel && panel.contains(e.relatedTarget))) {
          this.doBlur()
          this.closePanel({
            returnFocus: false,
            emitBlur: false
          })
        }
      }
    },
    handleTimeInputActivate () {
      if (this.disabled) return
      if (!this.active) {
        this.openPanel()
      }
    },
    handleTimeInputDeactivate (e) {
      if (this.disabled) return
      this.refreshTimeString()
      this.closePanel({
        returnFocus: false,
        emitBlur: false
      })
    },
    scrollTimer () {
      const { panelRef } = this
      if (!panelRef) return
      const { hoursRef, minutesRef, secondsRef } = panelRef
      const hour = hoursRef.contentRef.querySelector('[active]')
      if (hour) {
        hoursRef.scrollTo({ top: hour.offsetTop })
      }
      const minute = minutesRef.contentRef.querySelector('[active]')
      if (minute) {
        minutesRef.scrollTo({ top: minute.offsetTop })
      }
      const second = secondsRef.contentRef.querySelector('[active]')
      if (second) {
        secondsRef.scrollTo({ top: second.offsetTop })
      }
    },
    openPanel () {
      this.memorizedValue = this.mergedValue
      this.active = true
      this.$nextTick(this.scrollTimer)
    },
    handleClickOutside (e) {
      if (this.active && !this.inputRef.$el.contains(e.target)) {
        this.closePanel({
          returnFocus: false,
          emitBlur: true
        })
      }
    },
    closePanel ({ returnFocus, emitBlur }) {
      if (this.active) {
        this.active = false
        if (returnFocus) {
          this.inputRef.focus()
        }
        if (emitBlur) {
          const { onBlur, nTriggerFormBlur } = this
          if (onBlur) onBlur()
          nTriggerFormBlur()
        }
      }
    },
    handleTimeInput () {
      this.justifyValueAfterInput()
    },
    handleCancelClick () {
      this.doChange(this.memorizedValue)
      this.active = false
    },
    handleNowClick () {
      const now = new Date()
      if (!this.mergedValue) this.doChange(getTime(now))
      else {
        const newValue = setSeconds(
          setMinutes(
            setHours(this.mergedValue, getHours(now)),
            getMinutes(now)
          ),
          getSeconds(now)
        )
        this.doChange(getTime(newValue))
      }
    },
    handleConfirmClick () {
      if (this.isValueInvalid) {
        return
      }
      this.refreshTimeString()
      this.closePanel({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleMenuFocus (e) {
      const panel = this.panelRef.$el
      if (
        this.keyboardState.tab &&
        e.target === panel &&
        panel.contains(e.relatedTarget)
      ) {
        this.closePanel({
          returnFocus: true,
          emitBlur: false
        })
      }
    }
  }
}
</script>
