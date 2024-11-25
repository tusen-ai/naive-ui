import type {
  DatePickerClearSlotProps,
  DatePickerConfirmSlotProps,
  DatePickerNowSlotProps
} from '../public-types'
import { defineComponent, h } from 'vue'
import { NBaseFocusDetector } from '../../../_internal'
import {
  BackwardIcon,
  FastBackwardIcon,
  FastForwardIcon,
  ForwardIcon
} from '../../../_internal/icons'
import { resolveSlot, resolveSlotWithProps } from '../../../_utils'
import { NButton, NxButton } from '../../../button'
import { NInput } from '../../../input'
import { NTimePicker } from '../../../time-picker'
import PanelHeader from './panelHeader'
import { useCalendar, useCalendarProps } from './use-calendar'

/**
 * DateTime Panel
 * Update picker value on:
 * 1. confirm click
 * 2. clear click
 */
export default defineComponent({
  name: 'DateTimePanel',
  props: useCalendarProps,
  setup(props) {
    return useCalendar(props, 'datetime')
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      timePickerProps,
      onRender,
      $slots
    } = this
    onRender?.()

    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={[
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--datetime`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ]}
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div class={`${mergedClsPrefix}-date-panel-header`}>
          <NInput
            value={this.dateInputValue}
            theme={mergedTheme.peers.Input}
            themeOverrides={mergedTheme.peerOverrides.Input}
            stateful={false}
            size={this.timePickerSize}
            readonly={this.inputReadonly}
            class={`${mergedClsPrefix}-date-panel-date-input`}
            textDecoration={this.isDateInvalid ? 'line-through' : ''}
            placeholder={this.locale.selectDate}
            onBlur={this.handleDateInputBlur}
            onUpdateValue={this.handleDateInput}
          />
          <NTimePicker
            size={this.timePickerSize}
            placeholder={this.locale.selectTime}
            format={this.timerPickerFormat}
            {...(Array.isArray(timePickerProps) ? undefined : timePickerProps)}
            showIcon={false}
            to={false}
            theme={mergedTheme.peers.TimePicker}
            themeOverrides={mergedTheme.peerOverrides.TimePicker}
            value={Array.isArray(this.value) ? null : this.value}
            isHourDisabled={this.isHourDisabled}
            isMinuteDisabled={this.isMinuteDisabled}
            isSecondDisabled={this.isSecondDisabled}
            onUpdateValue={this.handleTimePickerChange}
            stateful={false}
          />
        </div>
        <div class={`${mergedClsPrefix}-date-panel-calendar`}>
          <div class={`${mergedClsPrefix}-date-panel-month`}>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
              onClick={this.prevYear}
            >
              {resolveSlot($slots['prev-year'], () => [<FastBackwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.prevMonth}
            >
              {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
            </div>
            <PanelHeader
              monthYearSeparator={this.calendarHeaderMonthYearSeparator}
              monthBeforeYear={this.calendarMonthBeforeYear}
              value={this.calendarValue}
              onUpdateValue={this.onUpdateCalendarValue}
              mergedClsPrefix={mergedClsPrefix}
              calendarMonth={this.calendarMonth}
              calendarYear={this.calendarYear}
            />
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.nextMonth}
            >
              {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.nextYear}
            >
              {resolveSlot($slots['next-year'], () => [<FastForwardIcon />])}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-date-panel-weekdays`}>
            {this.weekdays.map(weekday => (
              <div
                key={weekday}
                class={`${mergedClsPrefix}-date-panel-weekdays__day`}
              >
                {weekday}
              </div>
            ))}
          </div>
          <div class={`${mergedClsPrefix}-date-panel-dates`}>
            {this.dateArray.map((dateItem, i) => (
              <div
                data-n-date
                key={i}
                class={[
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--current`]:
                      dateItem.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]:
                      dateItem.selected,
                    [`${mergedClsPrefix}-date-panel-date--excluded`]:
                      !dateItem.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]:
                      this.mergedIsDateDisabled(dateItem.ts, {
                        type: 'date',
                        year: dateItem.dateObject.year,
                        month: dateItem.dateObject.month,
                        date: dateItem.dateObject.date
                      })
                  }
                ]}
                onClick={() => {
                  this.handleDateClick(dateItem)
                }}
              >
                <div class={`${mergedClsPrefix}-date-panel-date__trigger`} />
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class={`${mergedClsPrefix}-date-panel-date__sup`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {this.datePickerSlots.footer ? (
          <div class={`${mergedClsPrefix}-date-panel-footer`}>
            {this.datePickerSlots.footer()}
          </div>
        ) : null}
        {this.actions?.length || shortcuts ? (
          <div class={`${mergedClsPrefix}-date-panel-actions`}>
            <div class={`${mergedClsPrefix}-date-panel-actions__prefix`}>
              {shortcuts
              && Object.keys(shortcuts).map((key) => {
                const shortcut = shortcuts[key]
                return Array.isArray(shortcut) ? null : (
                  <NxButton
                    size="tiny"
                    onMouseenter={() => {
                      this.handleSingleShortcutMouseenter(shortcut)
                    }}
                    onClick={() => {
                      this.handleSingleShortcutClick(shortcut)
                    }}
                    onMouseleave={() => {
                      this.handleShortcutMouseleave()
                    }}
                  >
                    {{ default: () => key }}
                  </NxButton>
                )
              })}
            </div>
            <div class={`${mergedClsPrefix}-date-panel-actions__suffix`}>
              {this.actions?.includes('clear')
                ? resolveSlotWithProps(
                  this.$slots.clear,
                    {
                      onClear: this.clearSelectedDateTime,
                      text: this.locale.clear
                    } satisfies DatePickerClearSlotProps,
                    () => [
                      <NButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="tiny"
                        onClick={this.clearSelectedDateTime}
                      >
                        {{ default: () => this.locale.clear }}
                      </NButton>
                    ]
                )
                : null}
              {this.actions?.includes('now')
                ? resolveSlotWithProps(
                  $slots.now,
                    {
                      onNow: this.handleNowClick,
                      text: this.locale.now
                    } satisfies DatePickerNowSlotProps,
                    () => [
                      <NButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="tiny"
                        onClick={this.handleNowClick}
                      >
                        {{ default: () => this.locale.now }}
                      </NButton>
                    ]
                )
                : null}
              {this.actions?.includes('confirm')
                ? resolveSlotWithProps(
                  $slots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isDateInvalid,
                      text: this.locale.confirm
                    } satisfies DatePickerConfirmSlotProps,
                    () => [
                      <NButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="tiny"
                        type="primary"
                        disabled={this.isDateInvalid}
                        onClick={this.handleConfirmClick}
                      >
                        {{ default: () => this.locale.confirm }}
                      </NButton>
                    ]
                )
                : null}
            </div>
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
