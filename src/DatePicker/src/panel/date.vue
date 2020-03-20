<template>
  <transition name="n-date-panel-transition">
    <div
      v-if="active"
      tabindex="0"
      class="n-date-panel"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @focus="handlePanelFocus"
      @keydown="handlePanelKeyDown"
    >
      <div style="width: 100%; height: 3px" />
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
          :theme="theme"
          size="tiny"
          round
          @click="clearValue"
        >
          {{ localeNamespace.clear }}
        </n-button>
        <n-button
          v-if="actions.includes('now')"
          :theme="theme"
          size="tiny"
          round
          @click="setSelectedDateTimeToNow"
        >
          {{ localeNamespace.now }}
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
          :theme="theme"
          size="tiny"
          round
          type="primary"
          :disabled="isDateInvalid"
          @click="handleConfirmClick"
        >
          {{ localeNamespace.confirm }}
        </n-button>
      </div>
      <focus-detector @focus="handleFocusDetectorFocus" />
    </div>
  </transition>
</template>

<script>
import NBaseIcon from '../../../_base/Icon'
import uniCalendarMixin from './uniCalendarMixin'
import startOfDay from 'date-fns/startOfDay'

import NButton from '../../../Button'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']

export default {
  components: {
    NButton,
    NBaseIcon
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
  methods: {
    adjustValue (value) {
      return startOfDay(value)
    }
  }
}
</script>
