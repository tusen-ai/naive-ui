<template>
  <transition name="n-date-picker-panel--transition">
    <div
      v-if="active"
      ref="self"
      tabindex="0"
      class="n-date-picker-panel n-date-picker-panel--daterange"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @click.capture="resetSelectingStatus"
    >
      <div
        ref="startDates"
        class="n-date-picker-panel-calendar"
      >
        <div class="n-date-picker-panel-month-modifier">
          <div
            class="n-date-picker-panel-month-modifier__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-base-icon type="fast-backward" />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__prev"
            @click="startCalendarPrevMonth"
          >
            <n-base-icon type="backward" />
          </div>
          <div class="n-date-picker-panel-month-modifier__month-year">
            {{ startCalendarMonth }} {{ startCalendarYear }}
          </div>
          <div
            class="n-date-picker-panel-month-modifier__next"
            @click="startCalendarNextMonth"
          >
            <n-base-icon type="forward" />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__fast-next"
            @click="startCalendarNextYear"
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
        <div
          class="n-date-picker-panel-dates"
        >
          <div
            v-for="(dateItem, i) in startDateArray"
            :key="i"
            class="n-date-picker-panel-dates__date"
            :class="{
              'n-date-picker-panel-dates__date--current': dateItem.isCurrentDate,
              'n-date-picker-panel-dates__date--selected': dateItem.isSelectedDate,
              'n-date-picker-panel-dates__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-panel-dates__date--in-span': dateItem.isInSpan,
              'n-date-picker-panel-dates__date--no-transition': noTransition,
              'n-date-picker-panel-dates__date--disabled': dateDisabled(dateItem.timestamp, 'start')
            }"
            @click="handleDateClick(dateItem, 'start')"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.dateObject.date }}
          </div>
        </div>
      </div>
      <div><div class="n-date-picker-panel__vertical-divider" /></div>
      <div
        ref="endDates"
        class="n-date-picker-panel-calendar"
      >
        <div class="n-date-picker-panel-month-modifier">
          <div
            class="n-date-picker-panel-month-modifier__fast-prev"
            @click="endCalendarPrevYear"
          >
            <n-base-icon type="fast-backward" />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__prev"
            @click="endCalendarPrevMonth"
          >
            <n-base-icon type="backward" />
          </div>
          <div class="n-date-picker-panel-month-modifier__month-year">
            {{ endCalendarMonth }} {{ endCalendarYear }}
          </div>
          <div
            class="n-date-picker-panel-month-modifier__next"
            @click="endCalendarNextMonth"
          >
            <n-base-icon type="forward" />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__fast-next"
            @click="endCalendarNextYear"
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
        <div
          class="n-date-picker-panel-dates"
        >
          <div
            v-for="(dateItem, i) in endDateArray"
            :key="i"
            class="n-date-picker-panel-dates__date"
            :class="{
              'n-date-picker-panel-dates__date--current': dateItem.isCurrentDate,
              'n-date-picker-panel-dates__date--selected': dateItem.isSelectedDate,
              'n-date-picker-panel-dates__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-panel-dates__date--in-span': dateItem.isInSpan,
              'n-date-picker-panel-dates__date--no-transition': noTransition,
              'n-date-picker-panel-dates__date--disabled': dateDisabled(dateItem.timestamp, 'end')
            }"
            @click="handleDateClick(dateItem, 'end' )"
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
        class="n-date-picker-panel-actions"
      >
        <n-button
          v-if="actions.includes('clear')"
          size="tiny"
          round
          @click="clearValue"
        >
          Clear
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
          size="tiny"
          round
          auto-text-color
          type="primary"
          class="n-date-picker-panel-actions__confirm"
          :class="{
            'n-date-picker-panel-actions__confirm--disabled': isErrorDateTime
          }"
          @click="handleConfirmClick"
        >
          Confirm
        </n-button>
      </div>
      <focus-detector @focus="handleBlur" />
    </div>
  </transition>
</template>

<script>
// import moment from 'moment'
import NButton from '../../../Button'
import NBaseIcon from '../../../../base/Icon'
import dualCalendarMixin from './dualCalendarMixin'
import startOfDay from 'date-fns/startOfDay'

const DATE_FORMAT = 'yyyy-MM-dd'
const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NBaseIcon
  },
  mixins: [dualCalendarMixin],
  props: {
    placeholder: {
      type: String,
      default: PLACEHOLDER
    },
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
