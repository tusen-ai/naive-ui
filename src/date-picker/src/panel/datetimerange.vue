<template>
  <div
    ref="selfRef"
    tabindex="0"
    class="n-date-panel n-date-panel--datetimerange"
    @click.capture="resetSelectingStatus"
    @keydown="handlePanelKeyDown"
    @focus="handlePanelFocus"
  >
    <div class="n-date-panel-header">
      <n-input
        v-model:value="startDateDisplayString"
        :unstable-theme="NDatePicker.mergedTheme.peers.Input"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Input"
        :size="timePickerSize"
        :stateful="false"
        class="n-date-panel-date-input"
        :class="{
          'n-date-panel-date-input--invalid': isStartValueInvalid
        }"
        :placeholder="locale.selectDate"
        @blur="handleStartDateInputBlur"
        @input="handleStartDateInput"
      />
      <n-time-picker
        :size="timePickerSize"
        teleport-disabled
        :show-icon="false"
        :unstable-theme="NDatePicker.mergedTheme.peers.TimePicker"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.TimePicker"
        :stateful="false"
        :placeholder="locale.selectTime"
        :format="timeFormat"
        :value="startTimeValue"
        :is-hour-disabled="isStartHourDisabled"
        :is-minute-disabled="isStartMinuteDisabled"
        :is-second-disabled="isStartSecondDisabled"
        @update:value="handleStartTimePickerChange"
      />
      <n-input
        v-model:value="endDateDisplayString"
        :unstable-theme="NDatePicker.mergedTheme.peers.Input"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Input"
        :stateful="false"
        :size="timePickerSize"
        class="n-date-panel-date-input"
        :class="{
          'n-date-panel-date-input--invalid': isEndValueInvalid
        }"
        :placeholder="locale.selectDate"
        @blur="handleEndDateInputBlur"
        @input="handleEndDateInput"
      />
      <n-time-picker
        :show-icon="false"
        :unstable-theme="NDatePicker.mergedTheme.peers.TimePicker"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.TimePicker"
        teleport-disabled
        :size="timePickerSize"
        :stateful="false"
        :format="timeFormat"
        :placeholder="locale.selectTime"
        position-mode="absolute"
        :value="endTimeValue"
        :is-hour-disabled="isEndHourDisabled"
        :is-minute-disabled="isEndMinuteDisabled"
        :is-second-disabled="isEndSecondDisabled"
        @update:value="handleEndTimePickerChange"
      />
    </div>
    <div
      ref="startDatesRef"
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
            'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.selected,
            'n-date-panel-date--covered': dateItem.inSpan,
            'n-date-panel-date--start': dateItem.startOfSpan,
            'n-date-panel-date--end': dateItem.endOfSpan,
            'n-date-panel-date--transition-disabled': transitionDisabled,
            'n-date-panel-date--disabled': isCalendarDateDisabled(dateItem.ts)
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
      ref="endDatesRef"
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
            'n-date-panel-date--selected': dateItem.selected,
            'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
            'n-date-panel-date--covered': dateItem.inSpan,
            'n-date-panel-date--start': dateItem.startOfSpan,
            'n-date-panel-date--end': dateItem.endOfSpan,
            'n-date-panel-date--transition-disabled': transitionDisabled,
            'n-date-panel-date--disabled': isCalendarDateDisabled(dateItem.ts)
          }"
          @click="handleDateClick(dateItem)"
          @mouseenter="handleDateMouseEnter(dateItem)"
        >
          {{ dateItem.dateObject.date }}
        </div>
      </div>
    </div>
    <div v-if="actions && actions.length" class="n-date-panel-actions">
      <n-button
        v-if="actions.includes('clear')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        @click="handleClearClick"
      >
        {{ locale.clear }}
      </n-button>
      <n-button
        v-if="actions.includes('confirm')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        :disabled="isRangeInvalid"
        size="tiny"
        type="primary"
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
import { NTimePicker } from '../../../time-picker'
import { NInput } from '../../../input'

import { useDualCalendar } from './use-dual-calendar'

export default defineComponent({
  components: {
    NButton,
    NTimePicker,
    NInput,
    ...useDualCalendar.components
  },
  props: {
    ...useDualCalendar.props
  },
  setup (props) {
    return useDualCalendar(props, 'datetimerange')
  }
})
</script>
