<template>
  <transition name="n-date-panel-transition">
    <div
      v-if="active"
      ref="self"
      tabindex="0"
      class="n-date-panel"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
    >
      <div
        class="n-date-panel-input-wrapper"
      >
        <n-input
          v-model="displayDateString"
          class="n-date-panel-date-input"
          :class="{
            'n-date-panel-date-input--invalid': isDateInvalid
          }"
          :placeholder="localeNamespace.selectDate"
          @blur="handleDateInputBlur"
          @input="handleDateInput"
        />
        <n-time-picker
          :format="timeFormat"
          position-mode="absolute"
          :detached="false"
          :value="value"
          :placeholder="localeNamespace.selectTime"
          stop-selector-bubble
          :is-hour-disabled="isHourDisabled"
          :is-minute-disabled="isMinuteDisabled"
          :is-second-disabled="isSecondDisabled"
          @change="handleTimePickerChange"
        />
      </div>
      <div class="n-date-panel-month">
        <div
          class="n-date-panel-month__fast-prev"
          @click="prevYear"
        >
          <n-base-icon type="fast-backward" />
        </div>
        <div
          class="n-date-panel-month__prev"
          @click="prevMonth"
        >
          <n-base-icon type="backward" />
        </div>
        <div class="n-date-panel-month__month-year">
          {{ calendarMonth }} {{ calendarYear }}
        </div>
        <div
          class="n-date-panel-month__next"
          @click="nextMonth"
        >
          <n-base-icon type="forward" />
        </div>
        <div
          class="n-date-panel-month__fast-next"
          @click="nextYear"
        >
          <n-base-icon type="fast-forward" />
        </div>
      </div>
      <div class="n-date-panel-weekdays">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="n-date-panel-weekdays__day"
        >
          {{ weekday }}
        </div>
      </div>
      <div class="n-date-panel__divider" />
      <div class="n-date-panel-dates">
        <div
          v-for="(dateItem, i) in dateArray"
          :key="i"
          class="n-date-panel-date"
          :class="{
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.isSelectedDate,
            'n-date-panel-date--excluded': !dateItem.isDateOfDisplayMonth,
            'n-date-panel-date--transition-disabled': noTransition,
            'n-date-panel-date--disabled': isDateDisabled(dateItem.timestamp)
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
        class="n-date-panel-actions"
      >
        <n-button
          v-if="actions.includes('clear')"
          size="tiny"
          round
          @click="clearValue"
        >
          {{ localeNamespace.clear }}
        </n-button>
        <n-button
          v-if="actions.includes('now')"
          size="tiny"
          round
          @click="setSelectedDateTimeToNow"
        >
          {{ localeNamespace.now }}
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
          size="tiny"
          round
          type="primary"
          :disabled="isDateTimeInvalid"
          @click="handleConfirmClick"
        >
          {{ localeNamespace.confirm }}
        </n-button>
      </div>
      <focus-detector @focus="handleBlur" />
    </div>
  </transition>
</template>

<script>
import NBaseIcon from '../../../_base/Icon'
import uniCalendarMixin from './uniCalendarMixin'
import startOfSecond from 'date-fns/startOfSecond'

import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']

export default {
  components: {
    NButton,
    NBaseIcon,
    NTimePicker,
    NInput
  },
  mixins: [uniCalendarMixin],
  props: {
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
  computed: {
    timeFormat () {
      return /(H|h|K|k|m|s).*(H|h|K|k|m|s)/.exec(this.format)[0]
    }
  },
  watch: {
    active () {
      if (this.active) {
        this.initialValue = this.value
      } else {
        if (this.isTimeInvalid || this.isDateInvalid) {
          this.$emit('input', this.initialValue)
        }
      }
    }
  },
  methods: {
    adjustValue (datetime) {
      return startOfSecond(datetime)
    },
    handleTimePickerChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
