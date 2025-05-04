import type {
  DatePickerClearSlotProps,
  DatePickerConfirmSlotProps
} from '../public-types'
import { defineComponent, h, watchEffect } from 'vue'
import { NBaseFocusDetector } from '../../../_internal'
import {
  BackwardIcon,
  FastBackwardIcon,
  FastForwardIcon,
  ForwardIcon
} from '../../../_internal/icons'
import {
  resolveSlot,
  resolveSlotWithTypedProps,
  warnOnce
} from '../../../_utils'
import { NButton, NxButton } from '../../../button'
import PanelHeader from './panelHeader'
import { useDualCalendar, useDualCalendarProps } from './use-dual-calendar'

export default defineComponent({
  name: 'DateRangePanel',
  props: useDualCalendarProps,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.actions?.includes('now')) {
          warnOnce(
            'date-picker',
            'The `now` action is not supported for n-date-picker of `daterange` type'
          )
        }
      })
    }
    return useDualCalendar(props, 'daterange')
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      onRender,
      datePickerSlots
    } = this
    onRender?.()

    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={[
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--daterange`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ]}
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div
          ref="startDatesElRef"
          class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`}
        >
          <div class={`${mergedClsPrefix}-date-panel-month`}>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
              onClick={this.startCalendarPrevYear}
            >
              {resolveSlot(datePickerSlots['prev-year'], () => [
                <FastBackwardIcon />
              ])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.startCalendarPrevMonth}
            >
              {resolveSlot(datePickerSlots['prev-month'], () => [
                <BackwardIcon />
              ])}
            </div>
            <PanelHeader
              closePanelOnSelectDate={this.closePanelOnSelectDate}
              closePanelOnSelectYear={this.closePanelOnSelectYear}
              closePanelOnSelectMonth={this.closePanelOnSelectMonth}
              monthYearSeparator={this.calendarHeaderMonthYearSeparator}
              monthBeforeYear={this.calendarMonthBeforeYear}
              value={this.startCalendarDateTime}
              onUpdateValue={this.onUpdateStartCalendarValue}
              mergedClsPrefix={mergedClsPrefix}
              calendarMonth={this.startCalendarMonth}
              calendarYear={this.startCalendarYear}
            />
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.startCalendarNextMonth}
            >
              {resolveSlot(datePickerSlots['next-month'], () => [
                <ForwardIcon />
              ])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.startCalendarNextYear}
            >
              {resolveSlot(datePickerSlots['next-year'], () => [
                <FastForwardIcon />
              ])}
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
          <div class={`${mergedClsPrefix}-date-panel__divider`} />
          <div class={`${mergedClsPrefix}-date-panel-dates`}>
            {this.startDateArray.map((dateItem, i) => (
              <div
                data-n-date
                key={i}
                class={[
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]:
                      !dateItem.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]:
                      dateItem.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]:
                      dateItem.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]:
                      dateItem.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]:
                      dateItem.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]:
                      dateItem.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]:
                      this.mergedIsDateDisabled(dateItem.ts)
                  }
                ]}
                onClick={() => {
                  this.handleDateClick(dateItem)
                }}
                onMouseenter={() => {
                  this.handleDateMouseEnter(dateItem)
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
        <div class={`${mergedClsPrefix}-date-panel__vertical-divider`} />
        <div
          ref="endDatesElRef"
          class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`}
        >
          <div class={`${mergedClsPrefix}-date-panel-month`}>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
              onClick={this.endCalendarPrevYear}
            >
              {resolveSlot(datePickerSlots['prev-year'], () => [
                <FastBackwardIcon />
              ])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.endCalendarPrevMonth}
            >
              {resolveSlot(datePickerSlots['prev-month'], () => [
                <BackwardIcon />
              ])}
            </div>
            <PanelHeader
              closePanelOnSelectDate={this.closePanelOnSelectDate}
              closePanelOnSelectYear={this.closePanelOnSelectYear}
              closePanelOnSelectMonth={this.closePanelOnSelectMonth}
              monthYearSeparator={this.calendarHeaderMonthYearSeparator}
              monthBeforeYear={this.calendarMonthBeforeYear}
              value={this.endCalendarDateTime}
              onUpdateValue={this.onUpdateEndCalendarValue}
              mergedClsPrefix={mergedClsPrefix}
              calendarMonth={this.endCalendarMonth}
              calendarYear={this.endCalendarYear}
            />
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.endCalendarNextMonth}
            >
              {resolveSlot(datePickerSlots['next-month'], () => [
                <ForwardIcon />
              ])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.endCalendarNextYear}
            >
              {resolveSlot(datePickerSlots['next-year'], () => [
                <FastForwardIcon />
              ])}
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
          <div class={`${mergedClsPrefix}-date-panel__divider`} />
          <div class={`${mergedClsPrefix}-date-panel-dates`}>
            {this.endDateArray.map((dateItem, i) => (
              <div
                data-n-date
                key={i}
                class={[
                  `${mergedClsPrefix}-date-panel-date`,
                  {
                    [`${mergedClsPrefix}-date-panel-date--excluded`]:
                      !dateItem.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]:
                      dateItem.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]:
                      dateItem.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]:
                      dateItem.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]:
                      dateItem.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]:
                      dateItem.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]:
                      this.mergedIsDateDisabled(dateItem.ts)
                  }
                ]}
                onClick={() => {
                  this.handleDateClick(dateItem)
                }}
                onMouseenter={() => {
                  this.handleDateMouseEnter(dateItem)
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
                return Array.isArray(shortcut)
                  || typeof shortcut === 'function' ? (
                      <NxButton
                        size="tiny"
                        onMouseenter={() => {
                          this.handleRangeShortcutMouseenter(shortcut)
                        }}
                        onClick={() => {
                          this.handleRangeShortcutClick(shortcut)
                        }}
                        onMouseleave={() => {
                          this.handleShortcutMouseleave()
                        }}
                      >
                        {{ default: () => key }}
                      </NxButton>
                    ) : null
              })}
            </div>
            <div class={`${mergedClsPrefix}-date-panel-actions__suffix`}>
              {this.actions?.includes('clear')
                ? resolveSlotWithTypedProps(
                    datePickerSlots.clear,
                    {
                      onClear: this.handleClearClick,
                      text: this.locale.clear
                    } satisfies DatePickerClearSlotProps,
                    () => [
                      <NButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="tiny"
                        onClick={this.handleClearClick}
                      >
                        {{ default: () => this.locale.clear }}
                      </NButton>
                    ]
                  )
                : null}
              {this.actions?.includes('confirm')
                ? resolveSlotWithTypedProps(
                    datePickerSlots.confirm,
                    {
                      onConfirm: this.handleConfirmClick,
                      disabled: this.isRangeInvalid || this.isSelecting,
                      text: this.locale.confirm
                    } satisfies DatePickerConfirmSlotProps,
                    () => [
                      <NButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="tiny"
                        type="primary"
                        disabled={this.isRangeInvalid || this.isSelecting}
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
