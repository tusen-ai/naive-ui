<template>
  <div
    class="n-time-picker"
    :class="{
      'n-time-picker--invalid': isValueInvalid,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <n-input
      ref="activator"
      v-model="displayTimeString"
      class="n-time-picker-input"
      :force-focus="active"
      placeholder="Select time"
      lazy-focus
      @focus="handleTimeInputFocus"
      @click="handleActivatorClick"
      @input="handleTimeInput"
      @wrapper-blur-to-outside="handleTimeInputWrapperBlur"
      @blur="handleTimeInputBlur"
    />
    <div
      ref="contentContainer"
      class="n-detached-content-container n-time-picker-detached-content-container"
      :class="{
        'n-detached-content-container--absolute-positioned': positionModeisAbsolute,
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-detached-content"
      >
        <transition name="n-time-picker--transition">
          <div
            v-if="active"
            ref="panel"
            v-clickoutside="handleClickOutside"
            tabindex="0"
            class="n-time-picker-selector"
            :class="{
              [`n-${synthesizedTheme}-theme`]: synthesizedTheme
            }"
          >
            <div class="n-time-picker-selector-time">
              <div
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
                      'n-time-picker-selector-time-row__item--active': hour === computedHour,
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
                      'n-time-picker-selector-time-row__item--active': minute === computedMinute,
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
                        second === computedSecond,
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
                @click="handleCancelClick"
              >
                Cancel
              </n-button>
              <n-button
                size="tiny"
                round
                auto-text-color
                type="primary"
                class="n-time-picker-selector-actions__confirm"
                :disabled="isValueInvalid"
                @click="handleConfirmClick"
              >
                Confirm
              </n-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NInput from '../../Input'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import clickoutside from '../../../directives/clickoutside'
import zindexable from '../../../mixins/zindexable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'
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
import { strictParse } from '../../../utils/dateUtils'

const DEFAULT_FORMAT = 'HH:mm:ss'
const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
}

/**
 * Warning: this component shouldn't change v-model's timestamp's date
 */
export default {
  name: 'NTimePicker',
  components: {
    NInput,
    NScrollbar
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, placeable, zindexable, withapp, themeable, asformitem()],
  props: {
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
    }
  },
  data () {
    return {
      active: false,
      displayTimeString: this.value === null ? null : format(this.value, this.format),
      ...TIME_CONST,
      memorizedValue: this.value,
      hourTransitionDisabled: false,
      minuteTransitionDisabled: false,
      secondTransitionDisabled: false
    }
  },
  computed: {
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
      if (this.computedTime) return Number(format(this.computedTime, 'HH'))
      else return null
    },
    computedMinute () {
      if (this.computedTime) return Number(format(this.computedTime, 'mm'))
      else return null
    },
    computedSecond () {
      if (this.computedTime) return Number(format(this.computedTime, 'ss'))
      else return null
    }
  },
  watch: {
    computedTime (value) {
      this.refreshTimeString(value)
      this.$nextTick().then(this.scrollTimer)
    },
    value (value, oldValue) {
      this.$emit('change', value, oldValue)
    },
    active (value) {
      if (this.isValueInvalid) {
        this.$emit('input', this.memorizedValue)
      }
    }
  },
  methods: {
    disableTransitionOneTick (unit) {
      this[unit + 'TransitionDisabled'] = true
      this.$nextTick().then(() => {
        this[unit + 'TransitionDisabled'] = false
      })
    },
    afterBlur (e) {
      if (this.active) {
        this.$nextTick().then(() => {
          if (!(this.$refs.panel && this.$refs.panel.contains(document.activeElement))) {
            this.closeTimeSelector()
          }
        })
      }
    },
    justifyValueAfterChangeDisplayTimeString () {
      const time = strictParse(this.displayTimeString, this.format, new Date())
      if (isValid(time)) {
        if (this.computedTime !== null) {
          const newTime = set(this.computedTime, {
            hours: getHours(time),
            minutes: getMinutes(time),
            seconds: getSeconds(time)
          })
          this.$emit('input', getTime(newTime))
        } else {
          this.$emit('input', getTime(time))
        }
      }
    },
    handleHourClick (hour) {
      if (this.isHourDisabled(hour)) {
        return
      }
      if (this.value === null) {
        this.$emit('input', getTime(setHours(startOfHour(new Date()), hour)))
      } else {
        this.$emit('input', getTime(setHours(this.value, hour)))
      }
      this.disableTransitionOneTick('hour')
    },
    handleMinuteClick (minute) {
      if (this.isMinuteDisabled(minute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.$emit('input', getTime(setMinutes(startOfMinute(new Date()), minute)))
      } else {
        this.$emit('input', getTime(setMinutes(this.value, minute)))
      }
      this.disableTransitionOneTick('minute')
    },
    handleSecondClick (second) {
      if (this.isSecondDisabled(second, this.computedMinute, this.computedHour)) {
        return
      }
      if (this.value === null) {
        this.$emit('input', getTime(setSeconds(startOfSecond(new Date()), second)))
      } else {
        this.$emit('input', getTime(setSeconds(this.value, second)))
      }
      this.disableTransitionOneTick('second')
    },
    refreshTimeString (time) {
      if (time === undefined) time = this.computedTime
      if (time === null) this.displayTimeString = ''
      else this.displayTimeString = format(time, this.format)
    },
    handleTimeInputWrapperBlur () {
      if (!this.active) {
        this.$emit('blur', this.value)
      }
    },
    handleTimeInputFocus () {
      if (this.disabled) return
      if (!this.active) {
        this.openTimeSelector()
      }
    },
    handleTimeInputBlur () {
      this.refreshTimeString()
      this.afterBlur()
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
      if (!this.$refs.activator.$el.contains(e.target)) {
        this.closeTimeSelector()
      }
    },
    closeTimeSelector (returnFocus = false) {
      this.active = false
      if (!returnFocus) {
        this.$emit('blur', this.value)
      }
    },
    handleTimeInput () {
      this.justifyValueAfterChangeDisplayTimeString()
    },
    handleCancelClick () {
      this.$emit('input', this.memorizedValue)
      this.active = false
    },
    handleConfirmClick () {
      if (this.isValueInvalid) {
        return
      }
      this.refreshTimeString()
      this.closeTimeSelector()
    }
  }
}
</script>
