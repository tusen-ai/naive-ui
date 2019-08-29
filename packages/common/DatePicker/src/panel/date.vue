<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      ref="self"
      class="n-date-picker-calendar"
      @click.prevent="() => {}"
    >
      <div style="width: 100%; height: 12px" />
      <div class="n-date-picker-calendar__month-modifier">
        <div
          class="n-date-picker-calendar__fast-prev"
          @click="prevYear"
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
          @click="prevMonth"
        >
          <n-icon
            type="ios-arrow-back"
            size="14"
          />
        </div>
        <div class="n-date-picker-calendar__month-year">
          {{ calendarDateTime.format('MMMM') }} {{ calendarDateTime.year() }}
        </div>
        <div
          class="n-date-picker-calendar__next"
          @click="nextMonth"
        >
          <n-icon
            type="ios-arrow-forward"
            size="14"
          />
        </div>
        <div
          class="n-date-picker-calendar__fast-next"
          @click="nextYear"
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
      <div class="n-date-picker-calendar__dates">
        <div
          v-for="(dateItem, i) in dateArray(calendarDateTime, valueAsMoment, currentDateTime)"
          :key="i"
          class="n-date-picker-calendar__date"
          :class="{
            'n-date-picker-calendar__date--current': dateItem.isCurrentDate,
            'n-date-picker-calendar__date--selected': dateItem.isSelectedDate,
            'n-date-picker-calendar__date--in-display-month': dateItem.isDateOfDisplayMonth,
            'n-date-picker-calendar__date--no-transition': noTransition
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.date }}
        </div>
        <div
          v-if="!(actions && actions.length)"
          style="height: 8px; width: 100%;"
        />
      </div>
      <div
        v-if="actions && actions.length"
        class="n-date-picker-calendar__actions"
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
import moment from 'moment'
import NIcon from '../../../Icon'
import clickoutside from '../../../../directives/clickoutside'
import uniCalendarMixin from './uniCalendarMixin'

import NButton from '../../../Button'

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']

const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NIcon
  },
  directives: {
    clickoutside
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
    adjustValue (value) {
      return moment(value).startOf('day')
    }
  }
}
</script>
