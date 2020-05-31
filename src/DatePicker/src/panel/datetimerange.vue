<template>
  <transition name="n-date-panel-transition">
    <div
      v-if="active"
      tabindex="0"
      class="n-date-panel n-date-panel--datetimerange"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @click.capture="resetSelectingStatus"
      @keydown="handlePanelKeyDown"
      @focus="handlePanelFocus"
    >
      <div
        class="n-date-panel-input-wrapper"
      >
        <n-input
          v-model="startDateDisplayString"
          :theme="theme"
          size="small"
          :stateful="false"
          class="n-date-panel-date-input"
          :class="{
            'n-date-panel-date-input--invalid': isStartValueInvalid
          }"
          :placeholder="localeNamespace.selectDate"
          @blur="handleStartDateInputBlur"
          @input="handleStartDateInput"
        />
        <n-time-picker
          size="small"
          :show-icon="false"
          :theme="theme"
          :stateful="false"
          :detachable="false"
          :placeholder="localeNamespace.selectTime"
          position-mode="absolute"
          :format="timeFormat"
          :value="startTimeValue"
          :is-hour-disabled="isStartHourDisabled"
          :is-minute-disabled="isStartMinuteDisabled"
          :is-second-disabled="isStartSecondDisabled"
          stop-selector-bubble
          @change="handleStartTimePickerChange"
        />
        <div class="n-date-panel-input-wrapper__arrow">
          <n-base-icon
            type="forward"
          />
        </div>
        <n-input
          v-model="endDateDisplayString"
          :theme="theme"
          :stateful="false"
          size="small"
          class="n-date-panel-date-input"
          :class="{
            'n-date-panel-date-input--invalid': isEndValueInvalid
          }"
          :placeholder="localeNamespace.selectDate"
          @blur="handleEndDateInputBlur"
          @input="handleEndDateInput"
        />
        <n-time-picker
          :show-icon="false"
          :theme="theme"
          size="small"
          :stateful="false"
          :detachable="false"
          :format="timeFormat"
          :placeholder="localeNamespace.selectTime"
          position-mode="absolute"
          :value="endTimeValue"
          :is-hour-disabled="isEndHourDisabled"
          :is-minute-disabled="isEndMinuteDisabled"
          :is-second-disabled="isEndSecondDisabled"
          stop-selector-bubble
          @change="handleEndTimePickerChange"
        />
      </div>
      <div
        ref="startDates"
        class="n-date-panel-calendar"
      >
        <div class="n-date-panel-month">
          <div
            class="n-date-panel-month__fast-prev"
            @click="startCalendarPrevYear"
          >
            <n-base-icon
              type="fast-backward"
            />
          </div>
          <div
            class="n-date-panel-month__prev"
            @click="startCalendarPrevMonth"
          >
            <n-base-icon
              type="backward"
            />
          </div>
          <div class="n-date-panel-month__month-year">
            {{ startCalendarMonth }} {{ startCalendarYear }}
          </div>
          <div
            class="n-date-panel-month__next"
            @click="startCalendarNextMonth"
          >
            <n-base-icon
              type="forward"
            />
          </div>
          <div
            class="n-date-panel-month__fast-next"
            @click="startCalendarNextYear"
          >
            <n-base-icon
              type="fast-forward"
            />
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
            <n-base-icon
              type="fast-backward"
            />
          </div>
          <div
            class="n-date-panel-month__prev"
            @click="endCalendarPrevMonth"
          >
            <n-base-icon
              type="backward"
            />
          </div>
          <div class="n-date-panel-month__month-year">
            {{ endCalendarMonth }} {{ endCalendarYear }}
          </div>
          <div
            class="n-date-panel-month__next"
            @click="endCalendarNextMonth"
          >
            <n-base-icon
              type="forward"
            />
          </div>
          <div
            class="n-date-panel-month__fast-next"
            @click="endCalendarNextYear"
          >
            <n-base-icon
              type="fast-forward"
            />
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
            style="height: 6px; width: 100%;"
          />
        </div>
      </div>
      <div
        v-if="actions && actions.length"
        class="n-date-panel-actions"
      >
        <n-button
          v-if="actions.includes('clear')"
          :theme="theme"
          size="tiny"
          @click="clearValue"
        >
          {{ localeNamespace.clear }}
        </n-button>
        <n-button
          v-if="actions.includes('confirm')"
          :theme="theme"
          :disabled="isRangeInvalid"
          size="tiny"
          type="primary"
          @click="handleConfirmClick"
        >
          {{ localeNamespace.confirm }}
        </n-button>
      </div>
      <div
        v-else
        style="height: 12px"
      />
      <focus-detector @focus="handleFocusDetectorFocus" />
    </div>
  </transition>
</template>

<script>
import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'
import dualCalendarMixin from './dualCalendarMixin'
import NBaseIcon from '../../../_base/Icon'
import startOfSecond from 'date-fns/startOfSecond'
import format from 'date-fns/format'
import set from 'date-fns/set'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import isValid from 'date-fns/isValid'
import { strictParse } from '../../../_utils/component/datePicker'

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'yyyy-MM-dd'
const DATE_VALIDATE_FORMAT = ['yyyy-MM-dd', 'yyyy-MM-D', 'yyyy-M-D', 'yyyy-M-dd']

export default {
  components: {
    NButton,
    NTimePicker,
    NInput,
    NBaseIcon
  },
  mixins: [dualCalendarMixin],
  props: {
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
  computed: {
    timeFormat () {
      return /(H|h|K|k|m|s).*(H|h|K|k|m|s)/.exec(this.format)[0]
    }
  },
  watch: {
    active (value) {
      if (value) {
        this.memorizedValue = this.value
        this.syncCalendarTimeWithValue(this.value)
      } else if (this.isRangeInvalid) {
        this.$emit('input', this.memorizedValue)
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
    this.memorizedValue = this.value
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
    handleStartTimePickerChange (value) {
      this.changeStartDateTime(value)
    },
    handleEndTimePickerChange (value) {
      this.changeEndDateTime(value)
    }
  }
}
</script>
