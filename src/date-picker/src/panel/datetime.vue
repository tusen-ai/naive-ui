<template>
  <div
    tabindex="0"
    class="n-date-panel n-date-panel--datetime"
    :class="{
      [`n-${theme}-theme`]: theme
    }"
    @keydown="handlePanelKeyDown"
    @focus="handlePanelFocus"
  >
    <div class="n-date-panel-input-wrapper">
      <n-input
        v-model:value="displayDateString"
        :theme="theme"
        :stateful="false"
        :size="timePickerSize"
        class="n-date-panel-date-input"
        :class="{
          'n-date-panel-date-input--invalid': isDateInvalid
        }"
        :placeholder="locale.selectDate"
        @blur="handleDateInputBlur"
        @input="handleDateInput"
      />
      <n-time-picker
        :show-icon="false"
        :format="timeFormat"
        :stateful="false"
        :theme="theme"
        teleport-disabled
        :size="timePickerSize"
        :value="value"
        :placeholder="locale.selectTime"
        :is-hour-disabled="isHourDisabled"
        :is-minute-disabled="isMinuteDisabled"
        :is-second-disabled="isSecondDisabled"
        @update:value="handleTimePickerChange"
      />
    </div>
    <div class="n-date-panel-calendar">
      <div class="n-date-panel-month">
        <div class="n-date-panel-month__fast-prev" @click="prevYear">
          <fast-backward-icon />
        </div>
        <div class="n-date-panel-month__prev" @click="prevMonth">
          <backward-icon />
        </div>
        <div class="n-date-panel-month__month-year">
          {{ calendarMonth }} {{ calendarYear }}
        </div>
        <div class="n-date-panel-month__next" @click="nextMonth">
          <forward-icon />
        </div>
        <div class="n-date-panel-month__fast-next" @click="nextYear">
          <fast-forward-icon />
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
            'n-date-panel-date--disabled': isCalendarDateDisabled(
              dateItem.timestamp
            )
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.dateObject.date }}
        </div>
        <div
          v-if="!(actions && actions.length)"
          style="height: 8px; width: 100%"
        />
      </div>
    </div>
    <div v-if="actions && actions.length" class="n-date-panel-actions">
      <n-button
        v-if="actions.includes('clear')"
        :theme="theme"
        size="tiny"
        @click="clearValue"
      >
        {{ locale.clear }}
      </n-button>
      <n-button
        v-if="actions.includes('now')"
        :theme="theme"
        size="tiny"
        @click="setSelectedDateTimeToNow"
      >
        {{ locale.now }}
      </n-button>
      <n-button
        v-if="actions.includes('confirm')"
        :theme="theme"
        size="tiny"
        type="primary"
        :disabled="isDateTimeInvalid"
        @click="handleConfirmClick"
      >
        {{ locale.confirm }}
      </n-button>
    </div>
    <n-base-focus-detector @focus="handleFocusDetectorFocus" />
  </div>
</template>

<script>
import uniCalendarMixin from './uniCalendarMixin'
import { startOfSecond } from 'date-fns'
import { NButton } from '../../../button'
import { NTimePicker } from '../../../time-picker'
import { NInput } from '../../../input'
import { uniCalendarSetup } from '../composables'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = [
  'YYYY-MM-DD',
  'YYYY-MM-D',
  'YYYY-M-D',
  'YYYY-M-DD'
]

export default {
  components: {
    NButton,
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
  setup () {
    return uniCalendarSetup()
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
          this.doUpdateValue(this.initialValue)
        }
      }
    }
  },
  methods: {
    adjustValue (datetime) {
      return startOfSecond(datetime)
    },
    handleTimePickerChange (value) {
      this.doUpdateValue(value)
    }
  }
}
</script>
