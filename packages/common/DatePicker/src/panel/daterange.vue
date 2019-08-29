<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      ref="self"
      v-clickoutside.lazy="handleClickOutside"
      class="n-date-picker-calendar n-date-picker-calendar--daterange"
      @click.capture="resetSelectingStatus"
    >
      <div
        ref="startDates"
        class="n-date-picker-calendar__range-wrapper"
      >
        <div class="n-date-picker-calendar__month-modifier">
          <div
            class="n-date-picker-calendar__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__prev"
            @click="startCalendarPrevMonth"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div class="n-date-picker-calendar__month-year">
            {{ startCalendarDateTime.format('MMMM') }} {{ startCalendarDateTime.year() }}
          </div>
          <div
            class="n-date-picker-calendar__next"
            @click="startCalendarNextMonth"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__fast-next"
            @click="startCalendarNextYear"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
        </div>
        <div class="n-date-picker-calendar__weekdays">
          <div
            v-for="weekday in weekdays"
            :key="weekday"
            class="n-date-picker-calendar__weekday"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="n-date-picker-calendar__divider" />
        <div
          class="n-date-picker-calendar__dates"
        >
          <div
            v-for="dateItem in dateArray(startCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="`${dateItem.timestamp}${dateItem.isDateOfDisplayMonth}`"
            class="n-date-picker-calendar__date"
            :class="{
              'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
              'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
              'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-calendar__date--in-span': dateItem.isInSpan,
              'n-date-picker-calendar__date--no-transition': noTransition
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.date }}
          </div>
        </div>
      </div>
      <div><div class="n-date-picker-calendar__vertical-divider" /></div>
      <div
        ref="endDates"
        class="n-date-picker-calendar__range-wrapper"
      >
        <div class="n-date-picker-calendar__month-modifier">
          <div
            class="n-date-picker-calendar__fast-prev"
            @click="endCalendarPrevYear"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__prev"
            @click="endCalendarPrevMonth"
          >
            <n-icon
              type="ios-arrow-back"
              size="14"
            />
          </div>
          <div class="n-date-picker-calendar__month-year">
            {{ endCalendarDateTime.format('MMMM') }} {{ endCalendarDateTime.year() }}
          </div>
          <div
            class="n-date-picker-calendar__next"
            @click="endCalendarNextMonth"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
          <div
            class="n-date-picker-calendar__fast-next"
            @click="endCalendarNextYear"
          >
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
            <n-icon
              type="ios-arrow-forward"
              size="14"
            />
          </div>
        </div>
        <div class="n-date-picker-calendar__weekdays">
          <div
            v-for="weekday in weekdays"
            :key="weekday"
            class="n-date-picker-calendar__weekday"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="n-date-picker-calendar__divider" />
        <div
          class="n-date-picker-calendar__dates"
        >
          <div
            v-for="dateItem in dateArray(endCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="`${dateItem.timestamp}${dateItem.isDateOfDisplayMonth}`"
            class="n-date-picker-calendar__date"
            :class="{
              'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
              'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
              'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-calendar__date--in-span': dateItem.isInSpan,
              'n-date-picker-calendar__date--no-transition': noTransition
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.date }}
          </div>
          <div
            v-if="!(actions && actions.length)"
            style="height: 8px; width: 100%;"
          />
        </div>
      </div>
      <div
        v-if="actions && actions.length"
        class="n-date-picker-calendar__actions"
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
          @click="handleConfirmClick"
        >
          Confirm
        </n-button>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import NButton from '../../../Button'
import NIcon from '../../../Icon'
import dualCalendarMixin from './dualCalendarMixin'

const DATE_FORMAT = 'YYYY-MM-DD'
const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NIcon
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
    valueAsMomentArray (newValue) {
      if (this.isSelecting) return
      if (newValue !== null) {
        this.syncCalendarTimeWithValue(newValue)
      }
    }
  },
  created () {
    if (this.valueAsMomentArray !== null) {
      this.syncCalendarTimeWithValue(this.valueAsMomentArray)
    }
  },
  methods: {
    adjustMoment (datetime) {
      return moment(datetime).startOf('date')
    }
  }
}
</script>
