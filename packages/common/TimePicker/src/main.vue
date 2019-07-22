<template>
  <div class="n-time-picker">
    <div ref="activator">
      <n-input
        v-model="displayTimeString"
        class="n-date-picker-calendar__time-input"
        placeholder="Select time"
        @focus="openTimeSelector"
        @input="handleTimeInput"
        @blur="handleTimeInputBlur"
      />
    </div>
    <div
      ref="contentWrapper"
      class="n-content-wrapper"
    >
      <div
        ref="content"
      >
        <transition name="n-time-picker--transition">
          <div
            v-if="active"
            v-clickoutside.lazy="closeTimeSelector"
            class="n-time-picker"
          >
            <div class="n-time-picker__selection-wrapper">
              <div class="n-time-picker__hour">
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
              </div>
              <div class="n-time-picker__minute">
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
              </div>
              <div class="n-time-picker__hour">
                <div
                  v-for="second in seconds"
                  :key="second"
                  class="n-time-picker__item"
                  :class="{
                    'n-time-picker__item--active':
                      second === computedSecond
                  }"
                  @click="setSecond(second)"
                >
                  {{ second }}
                </div>
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
                @click="handleComfirmClick"
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
import NInput from '../../Input'
import moment from 'moment'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import clickoutside from '../../../directives/clickoutside'

const DEFAULT_FORMAT = 'HH:MM:SS'
const TIME_CONST = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
}

export default {
  name: 'NTimePicker',
  components: {
    NInput
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, placeable],
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    value: {
      validator (value) {
        return moment(value).isValid()
      },
      default: null
    },
    format: {
      type: String,
      default: DEFAULT_FORMAT
    }
  },
  data () {
    return {
      active: false,
      displayTimeString: this.value === null ? null : moment(this.value).format(this.format),
      ...TIME_CONST
    }
  },
  computed: {
    computedHour () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('HH')
      else return null
    },
    computedMinute () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('mm')
      else return null
    },
    computedSecond () {
      if (this.computedSelectedDateTime) return this.computedSelectedDateTime.format('ss')
      else return null
    }
  },
  methods: {
    justifySelectedDateTimeAfterChangeTimeString () {
      const time = moment(this.displayTimeString, this.format)
    },
    setHour (hour) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[0] = hour
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    setMinute (minute) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[1] = minute
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    setSecond (second) {
      try {
        const timeArray = this.displayTimeString.split(':')
        timeArray[2] = second
        this.displayTimeString = timeArray.join(':')
      } catch (err) {

      } finally {
        this.justifySelectedDateTimeAfterChangeTimeString()
      }
    },
    refreshTimeString () {

    },
    handleTimeInputBlur () {
      this.refreshTimeString()
    },
    openTimeSelector () {
      console.log('open time selector')
      this.active = true
    },
    closeTimeSelector () {
      this.active = false
    },
    handleTimeInput () {

    },
    handleCancelClick () {
      this.active = false
      this.refreshTimeString()
    },
    handleComfirmClick () {
      this.refreshTimeString()
    }
  }
}
</script>
