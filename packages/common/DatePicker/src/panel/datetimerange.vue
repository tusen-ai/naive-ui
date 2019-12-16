<template>
  <transition name="n-date-picker-panel--transition">
    <div
      v-if="active"
      ref="self"
      tabindex="0"
      class="n-date-picker-panel n-date-picker-panel--datetimerange"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @click.capture="resetSelectingStatus"
    >
      <div
        class="n-date-picker-panel-input-wrapper"
      >
        <n-input
          v-model="startDateDisplayString"
          class="n-date-picker-panel-dates__date-input"
          placeholder="Select date"
          @blur="handleStartDateInputBlur"
          @input="handleStartDateInput"
        />
        <n-time-picker
          :detached="false"
          position-mode="absolute"
          class="n-date-picker-panel__time-input"
          :value="startTimeValue"
          :hour-disabled="isStartHourDisabled(currentDate)"
          :minute-disabled="isStartMinuteDisabled(currentDate)"
          :second-disabled="isStartSecondDisabled(currentDate)"
          stop-selector-bubble
          @input="handleStartTimePickerInput"
          @checkValue="checkStartTime"
        />
        <div class="n-date-picker-panel-input-wrapper__arrow">
          <n-base-icon
            type="forward"
          />
        </div>
        <n-input
          v-model="endDateDisplayString"
          class="n-date-picker-panel-dates__date-input"
          placeholder="Select date"
          @blur="handleEndDateInputBlur"
          @input="handleEndDateInput"
        />
        <n-time-picker
          :detached="false"
          position-mode="absolute"
          class="n-date-picker-panel__time-input"
          :value="endTimeValue"
          :hour-disabled="isEndHourDisabled(currentDate)"
          :minute-disabled="isEndMinuteDisabled(currentDate)"
          :second-disabled="isEndSecondDisabled(currentDate)"
          :is-error-val="isErrorEndTime"
          stop-selector-bubble
          @input="handleEndTimePickerInput"
          @checkValue="checkEndTime"
        />
      </div>
      <div
        ref="startDates"
        class="n-date-picker-panel-calendar"
      >
        <div class="n-date-picker-panel-month-modifier">
          <div
            class="n-date-picker-panel-month-modifier__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-base-icon
              type="fast-backward"
            />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__prev"
            @click="startCalendarPrevMonth"
          >
            <n-base-icon
              type="backward"
            />
          </div>
          <div class="n-date-picker-panel-month-modifier__month-year">
            {{ startCalendarMonth }} {{ startCalendarYear }}
          </div>
          <div
            class="n-date-picker-panel-month-modifier__next"
            @click="startCalendarNextMonth"
          >
            <n-base-icon
              type="forward"
            />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__fast-next"
            @click="startCalendarNextYear"
          >
            <n-base-icon
              type="fast-forward"
            />
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
              'n-date-picker-panel-dates__date--disabled': dateDisabled(dateItem.timestamp)
            }"
            @click="handleDateClick(dateItem)"
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
            <n-base-icon
              type="fast-backward"
            />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__prev"
            @click="endCalendarPrevMonth"
          >
            <n-base-icon
              type="backward"
            />
          </div>
          <div class="n-date-picker-panel-month-modifier__month-year">
            {{ endCalendarMonth }} {{ endCalendarYear }}
          </div>
          <div
            class="n-date-picker-panel-month-modifier__next"
            @click="endCalendarNextMonth"
          >
            <n-base-icon
              type="forward"
            />
          </div>
          <div
            class="n-date-picker-panel-month-modifier__fast-next"
            @click="endCalendarNextYear"
          >
            <n-base-icon
              type="fast-forward"
            />
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
              'n-date-picker-panel-dates__date--disabled': dateDisabled(dateItem.timestamp)
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.dateObject.date }}
          </div>
          <div
            v-if="!(actions && actions.length)"
            style="height: 6px; width: 100%;"
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
          class="n-date-picker-panel-actions__confirm"
          :class="{
            'n-date-picker-panel-actions__confirm--disabled': isErrorDateTime
          }"
          size="tiny"
          round
          auto-text-color
          type="primary"
          @click="handleConfirmClick"
        >
          Confirm
        </n-button>
      </div>
      <div
        v-else
        style="height: 12px"
      />
      <focus-detector @focus="handleBlur" />
    </div>
  </transition>
</template>

<script>
// import moment from 'moment'
import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'
import dualCalendarMixin from './dualCalendarMixin'
import NBaseIcon from '../../../../base/Icon'
import startOfSecond from 'date-fns/startOfSecond'
import format from 'date-fns/format'
import set from 'date-fns/set'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import isValid from 'date-fns/isValid'
import { strictParse } from '../../../../utils/dateUtils'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = ['yyyy-MM-dd', 'yyyy-MM-D', 'yyyy-M-D', 'yyyy-M-dd']
const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NTimePicker,
    NInput,
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
      default: DATETIME_FORMAT
    },
    dateFormat: {
      type: String,
      default: DATE_FORMAT
    },
    dateValidateFormat: {
      type: Array,
      default: () => DATE_VALIDATE_FORMAT
    }
  },
  watch: {
    active (newActive) {
      if (newActive) {
        this.syncCalendarTimeWithValue(this.value)
      }
    },
    valueAsDateArray (newValue) {
      if (newValue !== null) {
        const [startMoment, endMoment] = newValue
        this.startDateDisplayString = format(startMoment, this.dateFormat)
        this.endDateDisplayString = format(endMoment, this.dateFormat)
        if (!this.isSelecting) {
          this.syncCalendarTimeWithValue(newValue)
        }
      } else {
        this.startDateDisplayString = ''
        this.endDateDisplayString = ''
      }
    }
  },
  created () {
    if (this.valueAsDateArray !== null) {
      const [startMoment, endMoment] = this.valueAsDateArray
      this.startDateDisplayString = format(startMoment, this.dateFormat)
      this.endDateDisplayString = format(endMoment, this.dateFormat)
      this.syncCalendarTimeWithValue(this.valueAsDateArray)
    } else {
      this.startDateDisplayString = ''
      this.endDateDisplayString = ''
    }
  },
  methods: {
    adjustValue (datetime) {
      return startOfSecond(datetime)
    },
    handleStartDateInput (value) {
      const date = strictParse(value, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateArray) {
          const newValue = set(new Date(), {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = set(this.valueAsDateArray[0], {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      }
    },
    handleEndDateInput (value) {
      /** strict check when input */
      const date = strictParse(value, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateArray) {
          const newValue = set(new Date(), {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = set(this.valueAsDateArray[1], {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeEndDateTime(this.adjustValue(newValue))
        }
      } else {
        // do nothing
      }
    },
    handleStartDateInputBlur () {
      const date = strictParse(this.startDateDisplayString, this.dateFormat, new Date())
      // const date = moment(this.startDateDisplayString, this.dateValidateFormat, true)
      if (isValid(date)) {
        if (!this.valueAsDateArray) {
          const newValue = set(new Date(), {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = set(this.valueAsDateArray[0], {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    handleEndDateInputBlur () {
      const date = strictParse(this.endDateDisplayString, this.dateFormat, new Date())
      if (isValid(date)) {
        if (!this.valueAsDateArray) {
          const newValue = set(new Date(), {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = set(this.valueAsDateArray[1], {
            year: getYear(date),
            month: getMonth(date),
            date: getDate(date)
          })
          this.changeEndDateTime(this.adjustValue(newValue))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    /**
     * If not selected, display nothing,
     * else update datetime related string
     */
    refreshDisplayDateString (times) {
      if (this.valueAsDateArray === null) {
        this.startDateDisplayString = ''
        this.endDateDisplayString = ''
        return
      }
      if (times === undefined) {
        times = this.valueAsDateArray
      }
      this.startDateDisplayString = format(times[0], this.dateFormat)
      this.endDateDisplayString = format(times[1], this.dateFormat)
    },
    handleStartTimePickerInput (value) {
      this.changeStartDateTime(value)
    },
    handleEndTimePickerInput (value) {
      this.changeEndDateTime(value)
    }
  }
}
</script>
