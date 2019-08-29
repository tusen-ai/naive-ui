<template>
  <div class="n-time-picker">
    <div ref="activator">
      <n-input
        v-model="displayTimeString"
        class="n-date-picker-calendar__time-input"
        placeholder="Select time"
        @click="handleActivatorClick"
        @input="handleTimeInput"
        @blur="handleTimeInputBlur"
      />
    </div>
    <div
      ref="contentContainer"
      class="n-detached-content-container"
      @click="handleContentClick"
    >
      <div
        ref="content"
        class="n-detached-content"
      >
        <transition name="n-time-picker--transition">
          <div
            v-if="active"
            v-clickoutside.lazy="closeTimeSelector"
            class="n-time-picker-selector"
          >
            <div class="n-time-picker__selection-wrapper">
              <div
                class="n-time-picker__hour"
              >
                <n-scrollbar ref="hours">
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    class="n-time-picker__item"
                    :class="{
                      'n-time-picker__item--active':
                        hour === computedHour
                    }"
                    @click="setHour(hour)"
                  >
                    {{ hour }}
                  </div>
                </n-scrollbar>
              </div>
              <div
                class="n-time-picker__minute"
              >
                <n-scrollbar ref="minutes">
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    class="n-time-picker__item"
                    :class="{
                      'n-time-picker__item--active':
                        minute === computedMinute
                    }"
                    @click="setMinute(minute)"
                  >
                    {{ minute }}
                  </div>
                </n-scrollbar>
              </div>
              <div
                class="n-time-picker__hour"
              >
                <n-scrollbar ref="seconds">
                  <div
                    v-for="second in seconds"
                    :key="second"
                    class="n-time-picker__item"
                    :class="{
                      'n-time-picker__item--active':
                        second === computedSecond,
                      'n-time-picker__item--disabled':
                        validator &&
                        !validator(computedHour, computedMinute, second)
                    }"
                    @click="setSecond(second)"
                  >
                    {{ second }}
                  </div>
                </n-scrollbar>
              </div>
            </div>
            <div class="n-time-picker__actions">
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
import moment from 'moment'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import clickoutside from '../../../directives/clickoutside'
import zindexable from '../../../mixins/zindexable'

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
 * Warning: this component shouldn't change v-model's timestamps' date
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
  mixins: [detachable, placeable, zindexable],
  props: {
    stopSelectorBubble: {
      type: Boolean,
      default: false
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
    validator: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      active: false,
      displayTimeString: this.value === null ? null : moment(this.value).format(this.format),
      ...TIME_CONST,
      memorizedValue: this.value
    }
  },
  computed: {
    computedTime () {
      if (this.value === null) return null
      else return moment(this.value)
    },
    computedHour () {
      if (this.computedTime) return this.computedTime.format('HH')
      else return null
    },
    computedMinute () {
      if (this.computedTime) return this.computedTime.format('mm')
      else return null
    },
    computedSecond () {
      if (this.computedTime) return this.computedTime.format('ss')
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
      const time = moment(this.displayTimeString, this.format, true)
      if (time.isValid()) {
        if (this.computedTime !== null) {
          const newTime = this.computedTime
          newTime.hour(time.hour())
          newTime.minute(time.minute())
          newTime.second(time.second())
          this.$emit('input', newTime.valueOf())
        } else {
          this.$emit('input', time.valueOf())
        }
      }
    },
    setHour (hour) {
      if (this.value === null) {
        this.$emit('input', moment().hour(hour).startOf('hour').valueOf())
      } else {
        this.$emit('input', moment(this.value).hour(hour).valueOf())
      }
    },
    setMinute (minute) {
      if (this.value === null) {
        this.$emit('input', moment().minute(minute).startOf('minute').valueOf())
      } else {
        this.$emit('input', moment(this.value).minute(minute).valueOf())
      }
    },
    setSecond (second) {
      if (this.value === null) {
        this.$emit('input', moment().second(second).startOf('second').valueOf())
      } else {
        this.$emit('input', moment(this.value).second(second).valueOf())
      }
    },
    refreshTimeString (time) {
      if (time === undefined) time = this.computedTime
      if (time === null) this.displayTimeString = ''
      else this.displayTimeString = time.format(this.format)
    },
    handleTimeInputBlur () {
      this.refreshTimeString()
    },
    scrollTimer () {
      if (this.$refs.hours.$el) {
        const hour = this.$refs.hours.$el.querySelector('.n-time-picker__item--active')
        if (hour) {
          this.$refs.hours.$refs.scrollContainer.scrollTo(0, hour.offsetTop)
        }
      }
      if (this.$refs.minutes.$el) {
        const minute = this.$refs.minutes.$el.querySelector('.n-time-picker__item--active')
        if (minute) {
          this.$refs.minutes.$refs.scrollContainer.scrollTo(0, minute.offsetTop)
        }
      }
      if (this.$refs.seconds.$el) {
        const second = this.$refs.seconds.$el.querySelector('.n-time-picker__item--active')
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
      if (this.active) {
        e.stopPropagation()
      } else {
        this.openTimeSelector()
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
    },
    handleContentClick (e) {
      if (this.stopSelectorBubble) {
        e.stopPropagation()
      }
    }
  }
}
</script>
