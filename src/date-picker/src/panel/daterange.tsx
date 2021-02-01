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
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class="n-date-panel n-date-panel--daterange"
        onClick={this.resetSelectingStatus}
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div
          ref="startDatesElRef"
          class="n-date-panel-calendar n-date-panel-calendar--start"
        >
          <div class="n-date-panel-month">
            <div
              class="n-date-panel-month__fast-prev"
              onClick={this.startCalendarPrevYear}
            >
              <FastBackwardIcon />
            </div>
            <div
              class="n-date-panel-month__prev"
              onClick={this.startCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class="n-date-panel-month__month-year">
              {this.locale.monthBeforeYear
                ? `${this.startCalendarMonth} ${this.startCalendarYear}`
                : `${this.startCalendarYear} ${this.startCalendarMonth}`}
            </div>
            <div
              class="n-date-panel-month__next"
              onClick={this.startCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class="n-date-panel-month__fast-next"
              onClick={this.startCalendarNextYear}
            >
              <FastForwardIcon />
            </div>
          </div>
          <div class="n-date-panel-weekdays">
            {this.weekdays.map((weekday) => (
              <div key={weekday} class="n-date-panel-weekdays__day">
                {weekday}
              </div>
            ))}
          </div>
          <div class="n-date-panel__divider" />
          <div class="n-date-panel-dates">
            {this.startDateArray.map((dateItem, i) => (
              <div
                key={i}
                class={[
                  'n-date-panel-date',
                  {
                    'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
                    'n-date-panel-date--current': dateItem.isCurrentDate,
                    'n-date-panel-date--selected': dateItem.selected,
                    'n-date-panel-date--covered': dateItem.inSpan,
                    'n-date-panel-date--start': dateItem.startOfSpan,
                    'n-date-panel-date--end': dateItem.endOfSpan,
                    'n-date-panel-date--transition-disabled': this
                      .transitionDisabled,
                    'n-date-panel-date--disabled': this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class="n-date-panel-date__sup" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div class="n-date-panel__vertical-divider" />
        <div
          ref="endDatesElRef"
          class="n-date-panel-calendar n-date-panel-calendar--end"
        >
          <div class="n-date-panel-month">
            <div
              class="n-date-panel-month__fast-prev"
              onClick={this.endCalendarPrevYear}
            >
              <FastBackwardIcon />
            </div>
            <div
              class="n-date-panel-month__prev"
              onClick={this.endCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class="n-date-panel-month__month-year">
              {this.locale.monthBeforeYear
                ? `${this.endCalendarMonth} ${this.endCalendarYear}`
                : `${this.endCalendarYear} ${this.endCalendarMonth}`}
            </div>
            <div
              class="n-date-panel-month__next"
              onClick={this.endCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class="n-date-panel-month__fast-next"
              onClick={this.endCalendarNextYear}
            >
              <FastForwardIcon />
            </div>
          </div>
          <div class="n-date-panel-weekdays">
            {this.weekdays.map((weekday) => (
              <div key={weekday} class="n-date-panel-weekdays__day">
                {weekday}
              </div>
            ))}
          </div>
          <div class="n-date-panel__divider" />
          <div class="n-date-panel-dates">
            {this.endDateArray.map((dateItem, i) => (
              <div
                key={i}
                class={[
                  'n-date-panel-date',
                  {
                    'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
                    'n-date-panel-date--current': dateItem.isCurrentDate,
                    'n-date-panel-date--selected': dateItem.selected,
                    'n-date-panel-date--covered': dateItem.inSpan,
                    'n-date-panel-date--start': dateItem.startOfSpan,
                    'n-date-panel-date--end': dateItem.endOfSpan,
                    'n-date-panel-date--transition-disabled': this
                      .transitionDisabled,
                    'n-date-panel-date--disabled': this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class="n-date-panel-date__sup" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {this.actions?.length ? (
          <div class="n-date-panel-actions">
            {this.actions.includes('clear') ? (
              <NButton
                theme={this.NDatePicker.mergedTheme.peers.Button}
                themeOverrides={
                  this.NDatePicker.mergedTheme.peerOverrides.Button
                }
                size="tiny"
                onClick={this.handleClearClick}
              >
                {{ default: () => this.locale.clear }}
              </NButton>
            ) : null}
            {this.actions.includes('confirm') ? (
              <NButton
                theme={this.NDatePicker.mergedTheme.peers.Button}
                themeOverrides={
                  this.NDatePicker.mergedTheme.peerOverrides.Button
                }
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
