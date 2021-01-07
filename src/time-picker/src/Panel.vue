<template>
  <div tabindex="0" class="n-time-picker-panel">
    <div class="n-time-picker-cols">
      <div
        v-if="showHour"
        class="n-time-picker-col"
        :class="{
          'n-time-picker-col--invalid': isHourInvalid,
          'n-time-picker-col--transition-disabled': transitionDisabled
        }"
      >
        <n-scrollbar ref="hoursRef" :theme="theme">
          <div
            v-for="hour in hours"
            :key="hour"
            :active="Number(hour) === hourValue ? '' : null"
            class="n-time-picker-col__item"
            :class="{
              'n-time-picker-col__item--active': Number(hour) === hourValue,
              'n-time-picker-col__item--disabled': isHourDisabled(hour)
            }"
            @click="onHourClick(hour)"
          >
            {{ hour }}
          </div>
          <div class="n-time-picker-col__padding" />
        </n-scrollbar>
      </div>
      <div
        v-if="showMinute"
        class="n-time-picker-col"
        :class="{
          'n-time-picker-col--transition-disabled': transitionDisabled,
          'n-time-picker-col--invalid': isMinuteInvalid
        }"
      >
        <n-scrollbar ref="minutesRef" :theme="theme">
          <div
            v-for="minute in minutes"
            :key="minute"
            :active="Number(minute) === minuteValue ? '' : null"
            class="n-time-picker-col__item"
            :class="{
              'n-time-picker-col__item--active': Number(minute) === minuteValue,
              'n-time-picker-col__item--disabled': isMinuteDisabled(
                minute,
                hourValue
              )
            }"
            @click="onMinuteClick(minute)"
          >
            {{ minute }}
          </div>
          <div class="n-time-picker-col__padding" />
        </n-scrollbar>
      </div>
      <div
        v-if="showSecond"
        class="n-time-picker-col"
        :class="{
          'n-time-picker-col--invalid': isSecondInvalid,
          'n-time-picker-col--transition-disabled': transitionDisabled
        }"
      >
        <n-scrollbar ref="secondsRef" :theme="theme">
          <div
            v-for="second in seconds"
            :key="second"
            :active="Number(second) === secondValue ? '' : null"
            class="n-time-picker-col__item"
            :class="{
              'n-time-picker-col__item--active': Number(second) === secondValue,
              'n-time-picker-col__item--disabled': isSecondDisabled(
                second,
                minuteValue,
                hourValue
              )
            }"
            @click="onSecondClick(second)"
          >
            {{ second }}
          </div>
          <div class="n-time-picker-col__padding" />
        </n-scrollbar>
      </div>
    </div>
    <div class="n-time-picker-actions">
      <n-button size="tiny" :theme="theme" @click="onNowClick">
        {{ nowText }}
      </n-button>
      <n-button
        size="tiny"
        type="primary"
        class="n-time-picker-actions__confirm"
        :theme="theme"
        :disabled="isValueInvalid"
        @click="onConfirmClick"
      >
        {{ confirmText }}
      </n-button>
    </div>
    <n-base-focus-detector @focus="onFocusDetectorFocus" />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { NBaseFocusDetector } from '../../_base'

const time = {
  hours: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ],
  minutes: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  seconds: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  period: ['AM', 'PM']
}

export default defineComponent({
  name: 'TimePickerPanel',
  components: {
    NScrollbar,
    NBaseFocusDetector
  },
  props: {
    theme: {
      type: String,
      default: undefined
    },
    showHour: {
      type: Boolean,
      default: true
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
    showPeriod: {
      type: Boolean,
      default: true
    },
    isHourInvalid: {
      type: Boolean,
      default: false
    },
    isMinuteInvalid: {
      type: Boolean,
      default: false
    },
    isSecondInvalid: {
      type: Boolean,
      default: false
    },
    isValueInvalid: {
      type: Boolean,
      default: false
    },
    hourValue: {
      type: Number,
      default: undefined
    },
    minuteValue: {
      type: Number,
      default: undefined
    },
    secondValue: {
      type: Number,
      default: undefined
    },
    isHourDisabled: {
      type: Function,
      default: undefined
    },
    isMinuteDisabled: {
      type: Function,
      default: undefined
    },
    isSecondDisabled: {
      type: Function,
      default: undefined
    },
    onHourClick: {
      type: Function,
      default: undefined
    },
    onMinuteClick: {
      type: Function,
      default: undefined
    },
    onSecondClick: {
      type: Function,
      default: undefined
    },
    onNowClick: {
      type: Function,
      default: undefined
    },

    nowText: {
      type: String,
      default: undefined
    },
    confirmText: {
      type: String,
      default: undefined
    },
    transitionDisabled: {
      type: Boolean,
      default: false
    },
    onConfirmClick: {
      type: Function,
      default: undefined
    },
    onFocusDetectorFocus: {
      type: Function,
      default: undefined
    }
  },
  setup () {
    return {
      hoursRef: ref(null),
      minutesRef: ref(null),
      secondsRef: ref(null),
      ...time
    }
  }
})
</script>
