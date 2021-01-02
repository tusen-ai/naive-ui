<template>
  <div
    tabindex="0"
    class="n-date-panel n-date-panel--daterange"
    @click.capture="resetSelectingStatus"
    @keydown="handlePanelKeyDown"
    @focus="handlePanelFocus"
  >
    <div
      ref="startDates"
      class="n-date-panel-calendar n-date-panel-calendar--start"
    >
      <div class="n-date-panel-month">
        <div
          class="n-date-panel-month__fast-prev"
          @click="startCalendarPrevYear"
        >
          <fast-backward-icon />
        </div>
        <div class="n-date-panel-month__prev" @click="startCalendarPrevMonth">
          <backward-icon />
        </div>
        <div class="n-date-panel-month__month-year">
          {{ startCalendarMonth }} {{ startCalendarYear }}
        </div>
        <div class="n-date-panel-month__next" @click="startCalendarNextMonth">
          <forward-icon />
        </div>
        <div
          class="n-date-panel-month__fast-next"
          @click="startCalendarNextYear"
        >
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
      <div class="n-date-panel__divider" />
      <div class="n-date-panel-dates">
        <div
          v-for="(dateItem, i) in startDateArray"
          :key="i"
          class="n-date-panel-date"
          :class="{
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.isSelectedDate,
            'n-date-panel-date--excluded': !dateItem.isDateOfDisplayMonth,
            'n-date-panel-date--covered': dateItem.isInSpan,
            'n-date-panel-date--transition-disabled': noTransition,
            'n-date-panel-date--disabled': isCalendarDateDisabled(
              dateItem.timestamp
            )
          }"
          @click="handleDateClick(dateItem)"
          @mouseenter="handleDateMouseEnter(dateItem)"
        >
          {{ dateItem.dateObject.date }}
        </div>
      </div>
    </div>
    <div class="n-date-panel__vertical-divider" />
    <div
      ref="endDates"
      class="n-date-panel-calendar n-date-panel-calendar--end"
    >
      <div class="n-date-panel-month">
        <div class="n-date-panel-month__fast-prev" @click="endCalendarPrevYear">
          <fast-backward-icon />
        </div>
        <div class="n-date-panel-month__prev" @click="endCalendarPrevMonth">
          <backward-icon />
        </div>
        <div class="n-date-panel-month__month-year">
          {{ endCalendarMonth }} {{ endCalendarYear }}
        </div>
        <div class="n-date-panel-month__next" @click="endCalendarNextMonth">
          <forward-icon />
        </div>
        <div class="n-date-panel-month__fast-next" @click="endCalendarNextYear">
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
      <div class="n-date-panel__divider" />
      <div class="n-date-panel-dates">
        <div
          v-for="(dateItem, i) in endDateArray"
          :key="i"
          class="n-date-panel-date"
          :class="{
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.isSelectedDate,
            'n-date-panel-date--excluded': !dateItem.isDateOfDisplayMonth,
            'n-date-panel-date--covered': dateItem.isInSpan,
            'n-date-panel-date--transition-disabled': noTransition,
            'n-date-panel-date--disabled': isCalendarDateDisabled(
              dateItem.timestamp
            )
          }"
          @click="handleDateClick(dateItem)"
          @mouseenter="handleDateMouseEnter(dateItem)"
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
        :theme="'light'"
        size="tiny"
        @click="clearValue"
      >
        {{ locale.clear }}
      </n-button>
      <n-button
        v-if="actions.includes('confirm')"
        :theme="'light'"
        size="tiny"
        type="primary"
        :disabled="isRangeInvalid"
        @click="handleConfirmClick"
      >
        {{ locale.confirm }}
      </n-button>
    </div>
    <n-base-focus-detector @focus="handleFocusDetectorFocus" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton } from '../../../button'
import dualCalendarMixin from './dualCalendarMixin'
import { startOfDay } from 'date-fns'
import { dualCalendarSetup } from '../composables'

const DATE_FORMAT = 'yyyy-MM-dd'

export default defineComponent({
  components: {
    NButton
  },
  mixins: [dualCalendarMixin],
  props: {
    format: {
      type: String,
      default: DATE_FORMAT
    }
  },
  setup () {
    return dualCalendarSetup()
  },
  watch: {
    active (newActive) {
      if (newActive) {
        this.syncCalendarTimeWithValue(this.value)
      }
    },
    valueAsDateArray (newValue) {
      if (this.isSelecting) return
      if (newValue !== null) {
        this.syncCalendarTimeWithValue(newValue)
      }
    }
  },
  created () {
    if (this.valueAsDateArray !== null) {
      this.syncCalendarTimeWithValue(this.valueAsDateArray)
    }
  },
  methods: {
    adjustValue (datetime) {
      return startOfDay(datetime)
    }
  }
})
</script>
