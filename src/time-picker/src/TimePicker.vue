<template>
  <div
    class="n-time-picker"
    :class="{
      'n-time-picker--invalid': isValueInvalid,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <n-input
      ref="trackedRef"
      v-model:value="displayTimeString"
      class="n-time-picker-input"
      passively-activated
      deactivate-on-enter
      :attr-size="syntheticAttrSize"
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
      @click="handleActivatorClick"
      @input="handleTimeInput"
      @clear="handleTimeInputClear"
    >
      <template v-if="showIcon" #suffix>
        <n-icon>
          <time-icon />
        </n-icon>
      </template>
    </n-input>
    <n-base-lazy-teleport
      :to="to"
      :show="active"
      :disabled="teleportDisabled"
      adjust-to
    >
      <div
        ref="offsetContainerRef"
        v-zindexable="{ enabled: active }"
        class="n-positioning-container"
        :class="{
          'n-positioning-container--absolute': position === 'absolute',
          [namespace]: namespace
        }"
      >
        <div
          ref="trackingRef"
          class="n-positioning-content"
        >
          <transition
            name="n-fade-in-scale-up-transition"
            :appear="isMounted"
          >
            <div
              v-if="active"
              ref="panelRef"
              v-clickoutside="handleClickOutside"
              tabindex="0"
              class="n-time-picker-selector"
              :class="{
                [`n-${mergedTheme}-theme`]: mergedTheme
              }"
              @focus="handleMenuFocus"
              @keydown="handleMenuKeyDown"
            >
              <div class="n-time-picker-selector-time">
                <div
                  v-if="formatWithHour"
                  class="n-time-picker-selector-time-row"
                  :class="{
                    'n-time-picker-selector-time-row--invalid': isHourInvalid,
                    'n-time-picker-selector-time-row--transition-disabled': hourTransitionDisabled
                  }"
                >
                  <n-scrollbar ref="hoursRef" :theme="mergedTheme">
                    <div
                      v-for="hour in hours"
                      :key="hour"
                      class="n-time-picker-selector-time-row__item"
                      :class="{
                        'n-time-picker-selector-time-row__item--active': Number(hour) === computedHour,
                        'n-time-picker-selector-time-row__item--disabled':
                          isHourDisabled(hour)
                      }"
                      @click="handleHourClick(hour)"
                    >
                      {{ hour }}
                    </div>
                    <div
                      style="height: 192px;"
                    />
                  </n-scrollbar>
                </div>
                <div
                  v-if="formatWithMinute"
                  class="n-time-picker-selector-time-row"
                  :class="{
                    'n-time-picker-selector-time-row--transition-disabled': minuteTransitionDisabled,
                    'n-time-picker-selector-time-row--invalid': isMinuteInvalid
                  }"
                >
                  <n-scrollbar ref="minutesRef" :theme="mergedTheme">
                    <div
                      v-for="minute in minutes"
                      :key="minute"
                      class="n-time-picker-selector-time-row__item"
                      :class="{
                        'n-time-picker-selector-time-row__item--active': Number(minute) === computedMinute,
                        'n-time-picker-selector-time-row__item--disabled': isMinuteDisabled(minute, computedHour)
                      }"
                      @click="handleMinuteClick(minute)"
                    >
                      {{ minute }}
                    </div>
                    <div
                      style="height: 192px;"
                    />
                  </n-scrollbar>
                </div>
                <div
                  v-if="formatWithSecond"
                  class="n-time-picker-selector-time-row"
                  :class="{
                    'n-time-picker-selector-time-row--invalid': isSecondInvalid,
                    'n-time-picker-selector-time-row--transition-disabled': secondTransitionDisabled,
                  }"
                >
                  <n-scrollbar ref="secondsRef" :theme="mergedTheme">
                    <div
                      v-for="second in seconds"
                      :key="second"
                      class="n-time-picker-selector-time-row__item"
                      :class="{
                        'n-time-picker-selector-time-row__item--active':
                          Number(second) === computedSecond,
                        'n-time-picker-selector-time-row__item--disabled': isSecondDisabled(second, computedMinute, computedHour)
                      }"
                      @click="handleSecondClick(second)"
                    >
                      {{ second }}
                    </div>
                    <div
                      style="height: 192px;"
                    />
                  </n-scrollbar>
                </div>
              </div>
              <div class="n-time-picker-selector-actions">
                <n-button
                  size="tiny"
                  :theme="mergedTheme"
                  @click="handleNowClick"
                >
                  {{ localizedNow }}
                </n-button>
                <n-button
                  size="tiny"
                  type="primary"
                  class="n-time-picker-selector-actions__confirm"
                  :theme="mergedTheme"
                  :disabled="isValueInvalid"
                  @click="handleConfirmClick"
                >
                  {{ localizedPositiveText }}
                </n-button>
              </div>
              <n-base-focus-detector
                @focus="handleFocusDectorFocus"
              />
            </div>
          </transition>
        </div>
      </div>
    </n-base-lazy-teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIsMounted } from 'vooks'
import { NBaseLazyTeleport, NBaseFocusDetector } from '../../_base'
import NScrollbar from '../../scrollbar'
import NInput from '../../input'
import NIcon from '../../icon'
import { configurable, themeable, locale, withCssr, asFormItem, placeable } from '../../_mixins'
import { zindexable, clickoutside } from '../../_directives'
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
import keyboardDelegate from '../../_utils/delegate/keyboardDelegate'
import {
  TimeIcon
} from '../../_base/icons'
import styles from './styles'
import { warn, call, KEY_CODE } from '../../_utils'

const DEFAULT_FORMAT = 'HH:mm:ss'

const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  period: ['AM', 'PM']
}

export default {
  name: 'TimePicker',
  components: {
    NInput,
    NIcon,
    NScrollbar,
    NBaseFocusDetector,
    NBaseLazyTeleport,
    TimeIcon
  },
  directives: {
    clickoutside,
    zindexable
  },
  mixins: [
    configurable,
    themeable,
    placeable,
    locale('TimePicker'),
    asFormItem(),
    withCssr(styles)
  ],
  props: {
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
      default: null
    },
    format: {
      type: String,
      default: DEFAULT_FORMAT
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
        if (__DEV__) warn('time-picker', '`on-change` is deprecated, please use `on-update:value` instead.')
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
  setup () {
    return {
      isMounted: useIsMounted(),
      hoursRef: ref(null),
      minutesRef: ref(null),
      secondsRef: ref(null),
      offsetContainerRef: ref(null),
      trackingRef: ref(null),
      trackedRef: ref(null),
      panelRef: ref(null)
    }
  },
  data () {
    return {
      active: false,
      displayTimeString: this.value === null ? null : format(this.value, this.format, this.dateFnsOptions),
      ...TIME_CONST,
      memorizedValue: this.value,
      hourTransitionDisabled: false,
      minuteTransitionDisabled: false,
      secondTransitionDisabled: false
    }
  },
  computed: {
    __placeableEnabled () {
      return this.active
    },
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
    formatWithHour () {
      return /H|h|K|k/.test(this.format)
    },
    formatWithMinute () {
      return /m/.test(this.format)
    },
    formatWithSecond () {
      return /s/.test(this.format)
    },
    isHourInvalid () {
      if (this.value === null) return false
      return this.isHourDisabled(this.computedHour)
    },
    isMinuteInvalid () {
      if (this.value === null) return false
      return this.isMinuteDisabled(this.computedMinute, this.computedHour)
    },
    isSecondInvalid () {
      if (this.value === null) return false
      return this.isSecondDisabled(this.computedSecond, this.computedMinute, this.computedHour)
    },
    isValueInvalid () {
      return this.isHourInvalid || this.isMinuteInvalid || this.isSecondInvalid
    },
    syntheticAttrSize () {
      return this.format.length + 4
    },
    computedTime () {
      if (this.value === null) return null
      else return new Date(this.value)
    },
    computedHour () {
      if (this.computedTime) return Number(format(this.computedTime, 'HH', this.dateFnsOptions))
      else return null
    },
    computedMinute () {
      if (this.computedTime) return Number(format(this.computedTime, 'mm', this.dateFnsOptions))
      else return null
    },
    computedSecond () {
      if (this.computedTime) return Number(format(this.computedTime, 'ss', this.dateFnsOptions))
      else return null
    }
  },
  watch: {
    computedTime (value) {
      this.refreshTimeString(value)
      this.$nextTick(this.scrollTimer)
    },
    active (value) {
      if (this.isValueInvalid) {
        this.doChange(this.memorizedValue)
      }
    }
  },
  methods: {
    __placeableBody () {
      return this.panelRef
    },
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableTracked () {
      return this.trackedRef
    },
    doChange (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormChange,
        nTriggerFormInput
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
      nTriggerFormChange()
      nTriggerFormInput()
    },
    doFocus () {
      const {
        onFocus,
        nTriggerFormFocus
      } = this
      if (onFocus) call(onFocus)
      nTriggerFormFocus()
    },
    doBlur () {
      const {
        onBlur,
        nTriggerFormBlur
      } = this
      if (onBlur) call(onBlur)
      nTriggerFormBlur()
    },
    handleTimeInputClear (e) {
      e.stopPropagation()
      this.doChange(null)
      this.refreshTimeString(null)
    },
    handleFocusDectorFocus () {
      this.closeTimeSelector({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleMenuKeyDown (e) {
      switch (e.keyCode) {
        case KEY_CODE.ESC:
          this.closeTimeSelector({
            returnFocus: true,
            emitBlur: false
          })
          break
        case KEY_CODE.TAB:
          if (
            keyboardDelegate.getKeyboardStatus().shiftPressed &&
            e.target === this.panelRef
          ) {
            e.preventDefault()
            this.closeTimeSelector({
              returnFocus: true,
              emitBlur: false
            })
          }
          break
      }
    },
    disableTransitionOneTick (unit) {
      this[unit + 'TransitionDisabled'] = true
      this.$nextTick(() => {
        this[unit + 'TransitionDisabled'] = false
      })
    },
    justifyValueAfterChangeDisplayTimeString () {
      const time = strictParse(this.displayTimeString, this.format, new Date(), this.dateFnsOptions)
      if (isValid(time)) {
        if (this.computedTime !== null) {
          const newTime = set(this.computedTime, {
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
      if (this.value === null) {
        const newValue = getTime(setHours(startOfHour(new Date()), hour))
        this.doChange(newValue)
      } else {
        const newValue = getTime(setHours(this.value, hour))
        this.doChange(newValue)
      }
      this.disableTransitionOneTick('hour')
    },
    handleMinuteClick (minute) {
      if (this.isMinuteDisabled(minute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.doChange(getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        this.doChange(getTime(setMinutes(this.value, minute)))
      }
      this.disableTransitionOneTick('minute')
    },
    handleSecondClick (second) {
      if (this.isSecondDisabled(second, this.computedMinute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.doChange(getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        this.doChange(getTime(setSeconds(this.value, second)))
      }
      this.disableTransitionOneTick('second')
    },
    refreshTimeString (time) {
      if (time === undefined) time = this.computedTime
      if (time === null) this.displayTimeString = ''
      else this.displayTimeString = format(time, this.format, this.dateFnsOptions)
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
        const panel = this.panelRef
        if (!(
          panel &&
          panel.contains(e.relatedTarget)
        )) {
          this.doBlur()
          this.closeTimeSelector({
            returnFocus: false,
            emitBlur: false
          })
        }
      }
    },
    handleTimeInputActivate () {
      if (this.disabled) return
      if (!this.active) {
        this.openTimeSelector()
      }
    },
    handleTimeInputDeactivate (e) {
      if (this.disabled) return
      this.refreshTimeString()
      this.closeTimeSelector({
        returnFocus: false,
        emitBlur: false
      })
    },
    scrollTimer () {
      if (this.hoursRef && this.hoursRef.contentRef) {
        const hour = this.hoursRef.contentRef.querySelector('.n-time-picker-selector-time-row__item--active')
        if (hour) {
          this.hoursRef.scrollTo({ top: hour.offsetTop })
        }
      }
      if (this.minutesRef && this.minutesRef.contentRef) {
        const minute = this.minutesRef.contentRef.querySelector('.n-time-picker-selector-time-row__item--active')
        if (minute) {
          this.minutesRef.scrollTo({ top: minute.offsetTop })
        }
      }
      if (this.secondsRef && this.secondsRef.contentRef) {
        const second = this.secondsRef.contentRef.querySelector('.n-time-picker-selector-time-row__item--active')
        if (second) {
          this.secondsRef.scrollTo({ top: second.offsetTop })
        }
      }
    },
    openTimeSelector () {
      this.memorizedValue = this.value
      this.active = true
      this.$nextTick(this.scrollTimer)
    },
    handleActivatorClick (e) {
      if (!this.active) {
        this.openTimeSelector()
      }
    },
    handleClickOutside (e) {
      if (this.active && !this.trackedRef.$el.contains(e.target)) {
        this.closeTimeSelector({
          returnFocus: false,
          emitBlur: true
        })
      }
    },
    closeTimeSelector ({
      returnFocus,
      emitBlur
    }) {
      if (this.active) {
        this.active = false
        if (returnFocus) {
          this.trackedRef.focus()
        }
        if (emitBlur) {
          const {
            onBlur,
            nTriggerFormBlur
          } = this
          if (onBlur) onBlur()
          nTriggerFormBlur()
        }
      }
    },
    handleTimeInput () {
      this.justifyValueAfterChangeDisplayTimeString()
    },
    handleCancelClick () {
      this.doChange(this.memorizedValue)
      this.active = false
    },
    handleNowClick () {
      const now = new Date()
      if (!this.value) this.doChange(getTime(now))
      else {
        const newValue = setSeconds(
          setMinutes(
            setHours(
              this.value,
              getHours(now)
            ),
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
      this.closeTimeSelector({
        returnFocus: true,
        emitBlur: false
      })
    },
    handleMenuFocus (e) {
      const panel = this.panelRef
      if (
        keyboardDelegate.tabPressed &&
        e.target === panel &&
        panel.contains(e.relatedTarget)
      ) {
        this.closeTimeSelector({
          returnFocus: true,
          emitBlur: false
        })
      }
    }
  }
}
</script>
