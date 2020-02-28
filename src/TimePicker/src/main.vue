<template>
  <div
    class="n-time-picker"
    :class="{
      'n-time-picker--invalid': isValueInvalid,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <n-input
      ref="activator"
      v-model="displayTimeString"
      class="n-time-picker-input"
      passively-activated
      :force-focus="active"
      :placeholder="localizedPlaceholder"
      :clearable="clearable"
      @focus="handleTimeInputFocus"
      @blur="handleTimeInputBlur"
      @activate="handleTimeInputActivate"
      @deactivate="handleTimeInputDeactivate"
      @click="handleActivatorClick"
      @input="handleTimeInput"
      @clear="handleTimeInputClear"
    />
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        'n-positioning-container--absolute': positionModeisAbsolute,
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-positioning-content"
      >
        <transition name="n-time-picker-transition">
          <div
            v-if="active"
            ref="panel"
            v-clickoutside="handleClickOutside"
            tabindex="0"
            class="n-time-picker-selector"
            :class="{
              [`n-${syntheticTheme}-theme`]: syntheticTheme
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
                <n-scrollbar ref="hours">
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
                    style="height: 210px;"
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
                <n-scrollbar ref="minutes">
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
                    style="height: 210px;"
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
                <n-scrollbar ref="seconds">
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
                    style="height: 210px;"
                  />
                </n-scrollbar>
              </div>
            </div>
            <div class="n-time-picker-selector-actions">
              <n-button
                size="tiny"
                round
                @click="handleNowClick"
              >
                {{ localizedNow }}
              </n-button>
              <n-button
                size="tiny"
                round
                type="primary"
                class="n-time-picker-selector-actions__confirm"
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
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NInput from '../../Input'
import detachable from '../../_mixins/detachable'
import placeable from '../../_mixins/placeable'
import clickoutside from '../../_directives/clickoutside'
import zindexable from '../../_mixins/zindexable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import locale from '../../_mixins/locale'
import asformitem from '../../_mixins/asformitem'
import isValid from 'date-fns/isValid'
import startOfSecond from 'date-fns/startOfSecond'
import startOfMinute from 'date-fns/startOfMinute'
import startOfHour from 'date-fns/startOfHour'
import format from 'date-fns/format'
import set from 'date-fns/set'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'
import getTime from 'date-fns/getTime'
import getMinutes from 'date-fns/getMinutes'
import getHours from 'date-fns/getHours'
import getSeconds from 'date-fns/getSeconds'
import { strictParse } from '../../_utils/component/datePicker'
import keyboardDelegate from '../../_utils/delegate/keyboardDelegate'
import { KEY_CODE } from '../../_utils/event/keyCode'
import NBaseFocusDetector from '../../_base/FocusDetector'

const DEFAULT_FORMAT = 'HH:mm:ss'

const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  period: ['AM', 'PM']
}

export default {
  name: 'NTimePicker',
  components: {
    NInput,
    NScrollbar,
    NBaseFocusDetector
  },
  directives: {
    clickoutside
  },
  mixins: [
    withapp,
    themeable,
    detachable,
    placeable,
    zindexable,
    locale('TimePicker'),
    asformitem()
  ],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: null
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
    localizedNow () {
      return this.localeNamespace.now
    },
    localizedPlaceholder () {
      if (this.placeholder !== null) return this.placeholder
      return this.localeNamespace.placeholder
    },
    localizedNegativeText () {
      return this.localeNamespace.negativeText
    },
    localizedPositiveText () {
      return this.localeNamespace.positiveText
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
    message () {
      const invalidUnits = []
      if (this.isHourInvalid) {
        invalidUnits.push('hour')
      }
      if (this.isMinuteInvalid) {
        invalidUnits.push('minute')
      }
      if (this.isSecondInvalid) {
        invalidUnits.push('second')
      }
      if (invalidUnits.length) {
        return invalidUnits.join(', ') + 'is invalid'
      } else {
        return null
      }
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
      this.$nextTick().then(this.scrollTimer)
    },
    active (value) {
      if (this.isValueInvalid) {
        this.$emit('change', this.memorizedValue)
      }
    }
  },
  methods: {
    handleTimeInputClear (e) {
      e.stopPropagation()
      this.$emit('change', null)
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
          const shiftPressed = keyboardDelegate.getKeyboardStatus().shiftPressed
          if (shiftPressed && e.target === this.$refs.panel) {
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
      this.$nextTick().then(() => {
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
          this.$emit('change', getTime(newTime))
        } else {
          this.$emit('change', getTime(time))
        }
      }
    },
    handleHourClick (hour) {
      if (this.isHourDisabled(hour)) {
        return
      }
      if (this.value === null) {
        this.$emit('change', getTime(setHours(startOfHour(new Date()), hour)))
      } else {
        this.$emit('change', getTime(setHours(this.value, hour)))
      }
      this.disableTransitionOneTick('hour')
    },
    handleMinuteClick (minute) {
      if (this.isMinuteDisabled(minute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.$emit('change', getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        this.$emit('change', getTime(setMinutes(this.value, minute)))
      }
      this.disableTransitionOneTick('minute')
    },
    handleSecondClick (second) {
      if (this.isSecondDisabled(second, this.computedMinute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.$emit('change', getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        this.$emit('change', getTime(setSeconds(this.value, second)))
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
        this.$emit('blur', this.value)
      }
    },
    handleTimeInputFocus () {
      this.$emit('focus')
    },
    handleTimeInputBlur (e) {
      if (this.active) {
        const panel = this.$refs.panel
        if (!(
          panel &&
          panel.contains(e.relatedTarget)
        )) {
          this.$emit('blur')
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
      if (this.$refs.hours && this.$refs.hours.$el) {
        const hour = this.$refs.hours.$el.querySelector('.n-time-picker-selector-time-row__item--active')
        if (hour) {
          this.$refs.hours.$refs.scrollContainer.scrollTo(0, hour.offsetTop)
        }
      }
      if (this.$refs.minutes && this.$refs.minutes.$el) {
        const minute = this.$refs.minutes.$el.querySelector('.n-time-picker-selector-time-row__item--active')
        if (minute) {
          this.$refs.minutes.$refs.scrollContainer.scrollTo(0, minute.offsetTop)
        }
      }
      if (this.$refs.seconds && this.$refs.seconds.$el) {
        const second = this.$refs.seconds.$el.querySelector('.n-time-picker-selector-time-row__item--active')
        if (second) {
          this.$refs.seconds.$refs.scrollContainer.scrollTo(0, second.offsetTop)
        }
      }
    },
    openTimeSelector () {
      this.memorizedValue = this.value
      this.active = true
      this.$nextTick().then(this.scrollTimer)
    },
    handleActivatorClick (e) {
      if (!this.active) {
        this.openTimeSelector()
      }
    },
    handleClickOutside (e) {
      if (this.active && !this.$refs.activator.$el.contains(e.target)) {
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
          this.$refs.activator.focus()
        }
        if (emitBlur) {
          this.$emit('blur')
        }
      }
    },
    handleTimeInput () {
      this.justifyValueAfterChangeDisplayTimeString()
    },
    handleCancelClick () {
      this.$emit('change', this.memorizedValue)
      this.active = false
    },
    handleNowClick () {
      const now = new Date()
      if (!this.value) this.$emit('change', getTime(now))
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
        this.$emit('change', getTime(newValue))
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
      const panel = this.$refs.panel
      if (
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
