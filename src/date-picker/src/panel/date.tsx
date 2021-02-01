import { h, defineComponent } from 'vue'
import { NButton } from '../../../button'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_internal/icons'
import { NBaseFocusDetector } from '../../../_internal'
import { useCalendar } from './use-calendar'

export default defineComponent({
  name: 'DatePanel',
  props: useCalendar.props,
  setup (props) {
    return useCalendar(props, 'date')
  },
  render () {
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class="n-date-panel n-date-panel--date"
        onFocus={this.handlePanelFocus}
        onKeydown={this.handlePanelKeyDown}
      >
        <div class="n-date-panel-calendar">
          <div class="n-date-panel-month">
            <div class="n-date-panel-month__fast-prev" onClick={this.prevYear}>
              <FastBackwardIcon />
            </div>
            <div class="n-date-panel-month__prev" onClick={this.prevMonth}>
              <BackwardIcon />
            </div>
            <div class="n-date-panel-month__month-year">
              {this.locale.monthBeforeYear
                ? `${this.calendarMonth} ${this.calendarYear}`
                : `${this.calendarYear} ${this.calendarMonth}`}
            </div>
            <div class="n-date-panel-month__next" onClick={this.nextMonth}>
              <ForwardIcon />
            </div>
            <div class="n-date-panel-month__fast-next" onClick={this.nextYear}>
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
          <div class="n-date-panel-dates">
            {this.dateArray.map((dateItem, i) => (
              <div
                key={i}
                class={[
                  'n-date-panel-date',
                  {
                    'n-date-panel-date--current': dateItem.isCurrentDate,
                    'n-date-panel-date--selected': dateItem.selected,
                    'n-date-panel-date--excluded': !dateItem.inCurrentMonth,
                    'n-date-panel-date--transition-disabled': this
                      .transitionDisabled,
                    'n-date-panel-date--disabled': this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
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
                unstableTheme={this.NDatePicker.mergedTheme.peers.Button}
                unstableThemeOverrides={
                  this.NDatePicker.mergedTheme.overrides.Button
                }
                size="tiny"
                onClick={this.handleClearClick}
              >
                {{ default: () => this.locale.clear }}
              </NButton>
            ) : null}
            {this.actions.includes('now') ? (
              <NButton
                unstableTheme={this.NDatePicker.mergedTheme.peers.Button}
                unstableThemeOverrides={
                  this.NDatePicker.mergedTheme.overrides.Button
                }
                size="tiny"
                onClick={this.handleNowClick}
              >
                {{ default: () => this.locale.now }}
              </NButton>
            ) : null}
            {this.actions.includes('confirm') ? (
              <NButton
                unstableTheme={this.NDatePicker.mergedTheme.peers.Button}
                unstableThemeOverrides={
                  this.NDatePicker.mergedTheme.overrides.Button
                }
                size="tiny"
                type="primary"
                disabled={this.isDateInvalid}
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
