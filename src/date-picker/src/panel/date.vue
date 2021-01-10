<template>
  <div
    tabindex="0"
    class="n-date-panel n-date-panel--date"
    @focus="handlePanelFocus"
    @keydown="handlePanelKeyDown"
  >
    <div class="n-date-panel-calendar">
      <div class="n-date-panel-month">
        <div class="n-date-panel-month__fast-prev" @click="prevYear">
          <fast-backward-icon />
        </div>
        <div class="n-date-panel-month__prev" @click="prevMonth">
          <backward-icon />
        </div>
        <div class="n-date-panel-month__month-year">
          {{ calendarMonth }} {{ calendarYear }}
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
            'n-date-panel-date--selected': dateItem.isSelectedDate,
            'n-date-panel-date--excluded': !dateItem.isDateOfDisplayMonth,
            'n-date-panel-date--transition-disabled': noTransition,
            'n-date-panel-date--disabled': isCalendarDateDisabled(
              dateItem.timestamp
            )
          }"
          @click="handleDateClick(dateItem)"
        >
          {{ dateItem.dateObject.date }}
        </div>
        <div
          v-if="!(actions && actions.length)"
          style="height: 8px; width: 100%"
        />
      </div>
    </div>
    <div v-if="actions && actions.length" class="n-date-panel-actions">
      <n-button
        v-if="actions.includes('clear')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        @click="clearValue"
      >
        {{ locale.clear }}
      </n-button>
      <n-button
        v-if="actions.includes('now')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        @click="setSelectedDateTimeToNow"
      >
        {{ locale.now }}
      </n-button>
      <n-button
        v-if="actions.includes('confirm')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        type="primary"
        :disabled="isDateInvalid"
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
import { useCalendar } from './use-calendar'

export default defineComponent({
  components: {
    NButton,
    ...useCalendar.components
  },
  props: {
    ...useCalendar.props
  },
  setup (props) {
    return useCalendar(props, 'date')
  }
})
</script>
