<template>
  <transition name="n-date-picker-panel--transition">
    <div
      v-if="active"
      ref="self"
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
          class="n-date-picker-panel__time-input"
          :value="startTimeValue"
          stop-selector-bubble
          @input="handleStartTimePickerInput"
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
          class="n-date-picker-panel__time-input"
          :value="endTimeValue"
          stop-selector-bubble
          @input="handleEndTimePickerInput"
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
            {{ startCalendarDateTime.format('MMMM') }} {{ startCalendarDateTime.year() }}
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
            v-for="(dateItem, i) in dateArray(startCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="i"
            class="n-date-picker-panel-dates__date"
            :class="{
              'n-date-picker-panel-dates__date--current': dateItem.isCurrentDate,
              'n-date-picker-panel-dates__date--selected': dateItem.isSelectedDate,
              'n-date-picker-panel-dates__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-panel-dates__date--in-span': dateItem.isInSpan,
              'n-date-picker-panel-dates__date--no-transition': noTransition
            }"
            @click="handleDateClick(dateItem)"
            @mouseenter="handleDateMouseEnter(dateItem)"
          >
            {{ dateItem.date }}
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
            {{ endCalendarDateTime.format('MMMM') }} {{ endCalendarDateTime.year() }}
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
            v-for="(dateItem, i) in dateArray(endCalendarDateTime, valueAsMomentArray, currentDateTime)"
            :key="i"
            class="n-date-picker-panel-dates__date"
            :class="{
              'n-date-picker-panel-dates__date--current': dateItem.isCurrentDate,
              'n-date-picker-panel-dates__date--selected': dateItem.isSelectedDate,
              'n-date-picker-panel-dates__date--in-display-month': dateItem.isDateOfDisplayMonth,
              'n-date-picker-panel-dates__date--in-span': dateItem.isInSpan,
              'n-date-picker-panel-dates__date--no-transition': noTransition
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
import NButton from '../../../Button'
import NTimePicker from '../../../TimePicker'
import NInput from '../../../Input'
import dualCalendarMixin from './dualCalendarMixin'
import NBaseIcon from '../../../../base/Icon'

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_VALIDATE_FORMAT = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D', 'YYYY-M-DD']
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
