import { defineComponent, h, watchEffect } from 'vue'
import { NButton, NxButton } from '../../../button'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_internal/icons'
import { NBaseFocusDetector } from '../../../_internal'
import { resolveSlot, warnOnce } from '../../../_utils'
import PanelHeader from './panelHeader'
import { useDualCalendar, useDualCalendarProps } from './use-dual-calendar'

export default defineComponent({
  name: 'DateRangePanel',
  props: useDualCalendarProps,
  setup (props) {
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
  render () {
    const { mergedClsPrefix, mergedTheme, shortcuts, onRender, $slots } = this
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
              {resolveSlot($slots['prev-year'], () => [<FastBackwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.startCalendarPrevMonth}
            >
              {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
            </div>
            <PanelHeader
              monthBeforeYear={this.locale.monthBeforeYear}
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
              {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.startCalendarNextYear}
            >
              {resolveSlot($slots['next-year'], () => [<FastForwardIcon />])}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-date-panel-weekdays`}>
            {this.weekdays.map((weekday) => (
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
              {resolveSlot($slots['prev-year'], () => [<FastBackwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.endCalendarPrevMonth}
            >
              {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
            </div>
            <PanelHeader
              monthBeforeYear={this.locale.monthBeforeYear}
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
              {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.endCalendarNextYear}
            >
              {resolveSlot($slots['next-year'], () => [<FastForwardIcon />])}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-date-panel-weekdays`}>
            {this.weekdays.map((weekday) => (
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
              {shortcuts &&
                Object.keys(shortcuts).map((key) => {
                  const shortcut = shortcuts[key]
                  return Array.isArray(shortcut) ||
                    typeof shortcut === 'function' ? (
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
              {this.actions?.includes('clear') ? (
                <NButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  onClick={this.handleClearClick}
                >
                  {{ default: () => this.locale.clear }}
                </NButton>
              ) : null}
              {this.actions?.includes('confirm') ? (
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
              ) : null}
            </div>
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
