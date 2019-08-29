<template>
  <transition name="n-date-picker-calendar--transition">
    <div
      v-if="active"
      ref="self"
      class="n-date-picker-calendar n-date-picker-calendar--datetimerange"
      @click.capture="resetSelectingStatus"
    >
      <div
        class="n-date-picker-calendar__date-time-input-wrapper"
      >
        <n-input
          v-model="startDateDisplayString"
          class="n-date-picker-calendar__date-input"
          placeholder="Select date"
          @blur="handleStartDateInputBlur"
          @input="handleStartDateInput"
        />
        <n-time-picker
          class="n-date-picker-calendar__time-input"
          :value="startTimeValue"
          stop-selector-bubble
          @input="handleStartTimePickerInput"
        />
        <div class="n-date-picker-calendar__arrow">
          <n-icon type="ios-arrow-forward" />
        </div>
        <n-input
          v-model="endDateDisplayString"
          class="n-date-picker-calendar__date-input"
          placeholder="Select date"
          @blur="handleEndDateInputBlur"
          @input="handleEndDateInput"
        />
        <n-time-picker
          class="n-date-picker-calendar__time-input"
          :value="endTimeValue"
          stop-selector-bubble
          @input="handleEndTimePickerInput"
        />
      </div>
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
            style="height: 6px; width: 100%;"
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
      <div
        v-else
        style="height: 12px"
      />
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import NIcon from '../../../Icon'
import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'
import dualCalendarMixin from './dualCalendarMixin'

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']
const PLACEHOLDER = 'Select date and time'

export default {
  components: {
    NButton,
    NIcon,
    NTimePicker,
    NInput
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
    valueAsMomentArray (newValue) {
      if (newValue !== null) {
        const [startMoment, endMoment] = newValue
        this.startDateDisplayString = startMoment.format(this.dateFormat)
        this.endDateDisplayString = endMoment.format(this.dateFormat)
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
    if (this.valueAsMomentArray !== null) {
      const [startMoment, endMoment] = this.valueAsMomentArray
      this.startDateDisplayString = startMoment.format(this.dateFormat)
      this.endDateDisplayString = endMoment.format(this.dateFormat)
      this.syncCalendarTimeWithValue(this.valueAsMomentArray)
    } else {
      this.startDateDisplayString = ''
      this.endDateDisplayString = ''
    }
  },
  methods: {
    adjustValue (datetime) {
      return moment(datetime).startOf('second')
    },
    handleStartDateInput (value) {
      const date = moment(value, this.dateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[0]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      } else {
        // do nothing
      }
    },
    handleEndDateInput (value) {
      /** strict check when input */
      const date = moment(value, this.dateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[1]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        }
      } else {
        // do nothing
      }
    },
    handleStartDateInputBlur () {
      const date = moment(this.startDateDisplayString, this.dateValidateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[0]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeStartDateTime(this.adjustValue(newValue))
        }
      } else {
        this.refreshDisplayDateString()
      }
    },
    handleEndDateInputBlur () {
      const date = moment(this.endDateDisplayString, this.dateValidateFormat, true)
      if (date.isValid()) {
        if (!this.valueAsMomentArray) {
          const newValue = moment()
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
          this.changeEndDateTime(this.adjustValue(newValue))
        } else {
          const newValue = this.valueAsMomentArray[1]
          newValue.year(date.year())
          newValue.month(date.month())
          newValue.date(date.date())
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
      if (this.valueAsMomentArray === null) {
        this.startDateDisplayString = ''
        this.endDateDisplayString = ''
        return
      }
      if (times === undefined) {
        times = this.valueAsMomentArray
      }
      this.startDateDisplayString = times[0].format(this.dateFormat)
      this.endDateDisplayString = times[1].format(this.dateFormat)
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
