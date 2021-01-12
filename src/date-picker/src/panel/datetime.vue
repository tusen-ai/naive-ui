<template>
  <div
    ref="selfRef"
    tabindex="0"
    class="n-date-panel n-date-panel--datetime"
    @keydown="handlePanelKeyDown"
    @focus="handlePanelFocus"
  >
    <div class="n-date-panel-header">
      <n-input
        v-model:value="displayDateString"
        :unstable-theme="NDatePicker.mergedTheme.peers.Input"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Input"
        :stateful="false"
        :size="timePickerSize"
        class="n-date-panel-date-input"
        :text-decoration="isDateInvalid ? 'line-through' : ''"
        :placeholder="locale.selectDate"
        @blur="handleDateInputBlur"
        @input="handleDateInput"
      />
      <n-time-picker
        :show-icon="false"
        :format="timeFormat"
        :stateful="false"
        :unstable-theme="NDatePicker.mergedTheme.peers.TimePicker"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.TimePicker"
        teleport-disabled
        :size="timePickerSize"
        :value="value"
        :placeholder="locale.selectTime"
        :is-hour-disabled="isHourDisabled"
        :is-minute-disabled="isMinuteDisabled"
        :is-second-disabled="isSecondDisabled"
        @update:value="handleTimePickerChange"
      />
    </div>
    <div class="n-date-panel-calendar">
      <div class="n-date-panel-month">
        <div class="n-date-panel-month__fast-prev" @click="prevYear">
          <fast-backward-icon />
        </div>
        <div class="n-date-panel-month__prev" @click="prevMonth">
          <backward-icon />
        </div>
        <div class="n-date-panel-month__month-year">
          {{
            locale.monthBeforeYear
              ? `${calendarMonth} ${calendarYear}`
              : `${calendarYear} ${calendarMonth}`
          }}
        </div>
        <div class="n-date-panel-month__next" @click="nextMonth">
          <forward-icon />
        </div>
        <div class="n-date-panel-month__fast-next" @click="nextYear">
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
      <div class="n-date-panel-dates">
        <div
          v-for="(dateItem, i) in dateArray"
          :key="i"
          class="n-date-panel-date"
          :class="{
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.selected,
            'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
            'n-date-panel-date--transition-disabled': transitionDisabled,
            'n-date-panel-date--disabled': mergedIsDateDisabled(dateItem.ts)
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.dateObject.date }}
          <div v-if="dateItem.isCurrentDate" class="n-date-panel-date__sup" />
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
        v-if="actions.includes('now')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        @click="handleNowClick"
      >
        {{ locale.now }}
      </n-button>
      <n-button
        v-if="actions.includes('confirm')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        type="primary"
        :disabled="isDateTimeInvalid"
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
import { useCalendar } from './use-calendar'

export default defineComponent({
  components: {
    NButton,
    NTimePicker,
    NInput,
    ...useCalendar.components
  },
  props: useCalendar.props,
  setup (props) {
    return useCalendar(props, 'datetime')
  }
})
</script>
