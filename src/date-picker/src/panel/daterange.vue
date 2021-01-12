<template>
  <div
    ref="selfRef"
    tabindex="0"
    class="n-date-panel n-date-panel--daterange"
    @click.capture="resetSelectingStatus"
    @keydown="handlePanelKeyDown"
    @focus="handlePanelFocus"
  >
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
          {{
            locale.monthBeforeYear
              ? `${startCalendarMonth} ${startCalendarYear}`
              : `${startCalendarYear} ${startCalendarMonth}`
          }}
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
            'n-date-panel-date--disabled': mergedIsDateDisabled(dateItem.ts)
          }"
          @click="handleDateClick(dateItem)"
          @mouseenter="handleDateMouseEnter(dateItem)"
        >
          {{ dateItem.dateObject.date }}
          <div v-if="dateItem.isCurrentDate" class="n-date-panel-date__sup" />
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
          {{
            locale.monthBeforeYear
              ? `${endCalendarMonth} ${endCalendarYear}`
              : `${endCalendarYear} ${endCalendarMonth}`
          }}
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
            'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
            'n-date-panel-date--current': dateItem.isCurrentDate,
            'n-date-panel-date--selected': dateItem.selected,
            'n-date-panel-date--covered': dateItem.inSpan,
            'n-date-panel-date--start': dateItem.startOfSpan,
            'n-date-panel-date--end': dateItem.endOfSpan,
            'n-date-panel-date--transition-disabled': transitionDisabled,
            'n-date-panel-date--disabled': mergedIsDateDisabled(dateItem.ts)
          }"
          @click="handleDateClick(dateItem)"
          @mouseenter="handleDateMouseEnter(dateItem)"
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
        v-if="actions.includes('confirm')"
        :unstable-theme="NDatePicker.mergedTheme.peers.Button"
        :unstable-theme-overrides="NDatePicker.mergedTheme.overrides.Button"
        size="tiny"
        type="primary"
        :disabled="isRangeInvalid"
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
import { useDualCalendar } from './use-dual-calendar'

export default defineComponent({
  components: {
    NButton,
    ...useDualCalendar.components
  },
  props: useDualCalendar.props,
  setup (props) {
    return useDualCalendar(props, 'daterange')
  }
})
</script>
