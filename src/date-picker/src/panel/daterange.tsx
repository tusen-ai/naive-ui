import { defineComponent, h } from 'vue'
import { NButton } from '../../../button'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_internal/icons'
import { NBaseFocusDetector } from '../../../_internal'
import { useDualCalendar } from './use-dual-calendar'

export default defineComponent({
  name: 'DateRangePanel',
  props: useDualCalendar.props,
  setup (props) {
    return useDualCalendar(props, 'daterange')
  },
  render () {
    const { mergedClsPrefix, mergedTheme } = this
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={`${mergedClsPrefix}-date-panel ${mergedClsPrefix}-date-panel--daterange`}
        onClick={this.resetSelectingStatus}
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
              <FastBackwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.startCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class={`${mergedClsPrefix}-date-panel-month__month-year`}>
              {this.locale.monthBeforeYear
                ? `${this.startCalendarMonth} ${this.startCalendarYear}`
                : `${this.startCalendarYear} ${this.startCalendarMonth}`}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.startCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.startCalendarNextYear}
            >
              <FastForwardIcon />
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
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
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
              <FastBackwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.endCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class={`${mergedClsPrefix}-date-panel-month__month-year`}>
              {this.locale.monthBeforeYear
                ? `${this.endCalendarMonth} ${this.endCalendarYear}`
                : `${this.endCalendarYear} ${this.endCalendarMonth}`}
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.endCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.endCalendarNextYear}
            >
              <FastForwardIcon />
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
                    [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                    [`${mergedClsPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                    [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem.selected,
                    [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                    [`${mergedClsPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                    [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class={`${mergedClsPrefix}-date-panel-date__sup`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {this.actions?.length ? (
          <div class={`${mergedClsPrefix}-date-panel-actions`}>
            {this.actions.includes('clear') ? (
              <NButton
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size="tiny"
                onClick={this.handleClearClick}
              >
                {{ default: () => this.locale.clear }}
              </NButton>
            ) : null}
            {this.actions.includes('confirm') ? (
              <NButton
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size="tiny"
                type="primary"
                disabled={this.isRangeInvalid}
                onClick={this.handleConfirmClick}
              >
                {{ default: () => this.locale.confirm }}
              </NButton>
            ) : null}
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
