<template>
  <transition name="n-date-panel-transition">
    <div
      v-show="active"
      ref="self"
      tabindex="0"
      class="n-date-panel n-date-panel--daterange"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @click.capture="resetSelectingStatus"
    >
      <div
        ref="startDates"
        class="n-date-panel-calendar"
      >
        <div class="n-date-panel-month">
          <div
            class="n-date-panel-month__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-base-icon type="fast-backward" />
          </div>
          <div
            class="n-date-panel-month__prev"
            @click="startCalendarPrevMonth"
          >
            <n-base-icon type="backward" />
          </div>
          <div class="n-date-panel-month__month-year">
            {{ startCalendarMonth }} {{ startCalendarYear }}
          </div>
          <div
            class="n-date-panel-month__next"
            @click="startCalendarNextMonth"
          >
            <n-base-icon type="forward" />
          </div>
          <div
            class="n-date-panel-month__fast-next"
            @click="startCalendarNextYear"
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
        <div
          class="n-date-panel-dates"
        >
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
              'n-date-panel-date--disabled': isCalendarDateDisabled(dateItem.timestamp)
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.dateObject.date }}
          </div>
        </div>
      </div>
      <div><div class="n-date-panel__vertical-divider" /></div>
      <div
        ref="endDates"
        class="n-date-panel-calendar"
      >
        <div class="n-date-panel-month">
          <div
            class="n-date-panel-month__fast-prev"
            @click="endCalendarPrevYear"
          >
            <n-base-icon type="fast-backward" />
          </div>
          <div
            class="n-date-panel-month__prev"
            @click="endCalendarPrevMonth"
          >
            <n-base-icon type="backward" />
          </div>
          <div class="n-date-panel-month__month-year">
            {{ endCalendarMonth }} {{ endCalendarYear }}
          </div>
          <div
            class="n-date-panel-month__next"
            @click="endCalendarNextMonth"
          >
            <n-base-icon type="forward" />
          </div>
          <div
            class="n-date-panel-month__fast-next"
            @click="endCalendarNextYear"
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
        <div
          class="n-date-panel-dates"
        >
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
              'n-date-panel-date--disabled': isCalendarDateDisabled(dateItem.timestamp)
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.dateObject.date }}
          </div>
          <div
            v-if="!(actions && actions.length)"
            style="height: 8px; width: 100%;"
          />
        </div>
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
          v-if="actions.includes('confirm')"
          size="tiny"
          round
          type="primary"
          :disabled="isRangeInvalid"
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
import NButton from '../../../Button'
import NBaseIcon from '../../../_base/Icon'
import dualCalendarMixin from './dualCalendarMixin'
import startOfDay from 'date-fns/startOfDay'

const DATE_FORMAT = 'yyyy-MM-dd'

export default {
  components: {
    NButton,
    NBaseIcon
  },
  mixins: [dualCalendarMixin],
  props: {
    format: {
      type: String,
      default: DATE_FORMAT
    }
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
}
</script>
