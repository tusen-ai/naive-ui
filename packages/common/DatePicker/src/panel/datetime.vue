<template>
  <transition name="n-date-picker-panel--transition">
    <div
      v-if="active"
      ref="self"
      class="n-date-picker-panel"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
    >
      <div
        class="n-date-picker-panel-input-wrapper"
      >
        <n-input
          v-model="displayDateString"
          class="n-date-picker-panel-dates__date-input"
          placeholder="Select date"
          @blur="handleDateInputBlur"
          @input="handleDateInput"
        />
        <n-time-picker
          position-mode="absolute"
          :detached="false"
          class="n-date-picker-panel__time-input"
          :value="value"
          stop-selector-bubble
          @input="handleTimePickerInput"
        />
      </div>
      <div class="n-date-picker-panel-month-modifier">
        <div
          class="n-date-picker-panel-month-modifier__fast-prev"
          @click="prevYear"
        >
          <n-base-icon type="fast-backward" />
        </div>
        <div
          class="n-date-picker-panel-month-modifier__prev"
          @click="prevMonth"
        >
          <n-base-icon type="backward" />
        </div>
        <div class="n-date-picker-panel-month-modifier__month-year">
          {{ calendarMonth }} {{ calendarYear }}
        </div>
        <div
          class="n-date-picker-panel-month-modifier__next"
          @click="nextMonth"
        >
          <n-base-icon type="forward" />
        </div>
        <div
          class="n-date-picker-panel-month-modifier__fast-next"
          @click="nextYear"
        >
          <n-base-icon type="fast-forward" />
        </div>
      </div>
      <div class="n-date-picker-panel-weekdays">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="n-date-picker-panel-weekdays__day"
        >
          {{ weekday }}
        </div>
      </div>
      <div class="n-date-picker-panel__divider" />
      <div class="n-date-picker-panel-dates">
        <div
          v-for="(dateItem, i) in dateArray"
          :key="i"
          class="n-date-picker-panel-dates__date"
          :class="{
            'n-date-picker-panel-dates__date--current': dateItem.isCurrentDate,
            'n-date-picker-panel-dates__date--selected': dateItem.isSelectedDate,
            'n-date-picker-panel-dates__date--in-display-month': dateItem.isDateOfDisplayMonth,
            'n-date-picker-panel-dates__date--no-transition': noTransition
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.dateObject.date }}
        </div>
        <div
          v-if="!(actions && actions.length)"
          style="height: 8px; width: 100%;"
        />
      </div>
      <div
        v-if="actions && actions.length"
        class="n-date-picker-panel-actions"
      >
        <n-button
          v-if="actions.includes('now')"
          size="tiny"
          round
          @click="setSelectedDateTimeToNow"
        >
          Now
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
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
</template>

<script>
// import moment from 'moment'
import NBaseIcon from '../../../../base/Icon'
import uniCalendarMixin from './uniCalendarMixin'
import { startOfSecond } from 'date-fns'

import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']

const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NBaseIcon,
    NTimePicker,
    NInput
  },
  mixins: [uniCalendarMixin],
  props: {
    placeholder: {
      type: String,
      default: PLACEHOLDER
    },
    format: {
      type: String,
      default: DATETIME_FORMAT
    }
  },
  data () {
    return {
      dateFormat: DATE_FORMAT,
      detaValidateFormat: DATE_VALIDATE_FORMAT
    }
  },
  methods: {
    adjustValue (datetime) {
      return startOfSecond(datetime)
      // return moment(datetime).startOf('second')
    },
    handleTimePickerInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
