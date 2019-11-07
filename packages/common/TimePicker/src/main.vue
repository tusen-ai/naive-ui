<template>
  <div class="n-time-picker">
    <n-input
      ref="activator"
      v-model="displayTimeString"
      class="n-date-picker-panel__time-input"
      placeholder="Select time"
      @click="handleActivatorClick"
      @input="handleTimeInput"
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
            v-clickoutside="handleClickOutside"
            class="n-time-picker-selector"
            :class="{
              [`n-${synthesizedTheme}-theme`]: synthesizedTheme
            }"
          >
            <div class="n-time-picker-selector-time">
              <div
                class="n-time-picker-selector-time-row"
              >
                <n-scrollbar ref="hours">
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    class="n-time-picker-selector-time-row__item"
                    :class="{
                      'n-time-picker-selector-time-row__item--active':
                        hour === computedHour
                    }"
                    @click="setHours(hour)"
                  >
                    {{ hour }}
                  </div>
                  <div
                    v-for="i in [1, 2, 3, 4, 5, 6]"
                    :key="i"
                    style="height: 35px;"
                  />
                </n-scrollbar>
              </div>
              <div
                class="n-time-picker-selector-time-row"
              >
                <n-scrollbar ref="minutes">
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    class="n-time-picker-selector-time-row__item"
                    :class="{
                      'n-time-picker-selector-time-row__item--active':
                        minute === computedMinute
                    }"
                    @click="setMinutes(minute)"
                  >
                    {{ minute }}
                  </div>
                  <div
                    v-for="i in [1, 2, 3, 4, 5, 6]"
                    :key="i"
                    style="height: 35px;"
                  />
                </n-scrollbar>
              </div>
              <div
                class="n-time-picker-selector-time-row"
              >
                <n-scrollbar ref="seconds">
                  <div
                    v-for="second in seconds"
                    :key="second"
                    class="n-time-picker-selector-time-row__item"
                    :class="{
                      'n-time-picker-selector-time-row__item--active':
                        second === computedSecond,
                      'n-time-picker-selector-time-row__item--disabled':
                        validator &&
                        !validator(computedHour, computedMinute, second)
                    }"
                    @click="setSeconds(second)"
                  >
                    {{ second }}
                  </div>
                  <div
                    v-for="i in [1, 2, 3, 4, 5, 6]"
                    :key="i"
                    style="height: 35px;"
                  />
                </n-scrollbar>
              </div>
            </div>
            <div class="n-time-picker-selector__actions">
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

// function ranges () {

// }

// function validateRange (ranges) {
//   const rangeReg = /((\d\d):(\d\d):(\d\d))\s*-\s*((\d\d):(\d\d):(\d\d))/
//   if (typeof ranges === 'string') {
//     const result = ranges.match(rangeReg)
//     if (!result) return false
//     else {
//       const [time1, hour1, min1, sec1, time2, hour2, min2, sec2] = result.slice(1)
//       if ()
//     }
//   } else if (Array.isArray(ranges)) {

//   } else {
//     return false
//   }
// }

/**
 * Use range to disabled time since validator will need time picker to loop all available options.
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
    validator: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      active: false,
      displayTimeString: this.value === null ? null : format(this.value, this.format),
      ...TIME_CONST,
      memorizedValue: this.value
    }
  },
  computed: {
    computedTime () {
      if (this.value === null) return null
      else return new Date(this.value)
    },
    computedHour () {
      if (this.computedTime) return format(this.computedTime, 'HH')
      else return null
    },
    computedMinute () {
      if (this.computedTime) return format(this.computedTime, 'mm')
      else return null
    },
    computedSecond () {
      if (this.computedTime) return format(this.computedTime, 'ss')
      else return null
    }
  },
  watch: {
    computedTime (time) {
      this.refreshTimeString(time)
      this.$nextTick().then(this.scrollTimer)
    }
  },
  methods: {
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
    setHours (hour) {
      if (this.value === null) {
        this.$emit('input', getTime(startOfHour(new Date())))
      } else {
        this.$emit('input', getTime(setHours(this.value, hour)))
      }
    },
    setMinutes (minute) {
      if (this.value === null) {
        this.$emit('input', getTime(startOfMinute(new Date())))
      } else {
        this.$emit('input', getTime(setMinutes(this.value, minute)))
      }
    },
    setSeconds (second) {
      if (this.value === null) {
        this.$emit('input', getTime(startOfSecond(new Date())))
      } else {
        this.$emit('input', getTime(setSeconds(this.value, second)))
      }
    },
    refreshTimeString (time) {
      if (time === undefined) time = this.computedTime
      if (time === null) this.displayTimeString = ''
      else this.displayTimeString = format(time, this.format)
    },
    handleTimeInputBlur () {
      this.refreshTimeString()
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
    closeTimeSelector () {
      this.active = false
    },
    handleTimeInput () {
      this.justifyValueAfterChangeDisplayTimeString()
    },
    handleCancelClick () {
      this.$emit('input', this.memorizedValue)
      this.active = false
    },
    handleConfirmClick () {
      this.refreshTimeString()
      this.active = false
    }
  }
}
</script>
