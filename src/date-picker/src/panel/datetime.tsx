import { h, defineComponent } from 'vue'
import { NButton } from '../../../button'
import { NTimePicker } from '../../../time-picker'
import { NInput } from '../../../input'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_base/icons'
import { NBaseFocusDetector } from '../../../_base'
import { useCalendar } from './use-calendar'

export default defineComponent({
  name: 'DateTimePanel',
  props: useCalendar.props,
  setup (props) {
    return useCalendar(props, 'datetime')
  },
  render () {
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class="n-date-panel n-date-panel--datetime"
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div class="n-date-panel-header">
          <NInput
            value={this.displayDateString}
            unstableTheme={this.NDatePicker.mergedTheme.peers.Input}
            unstableThemeOverrides={
              this.NDatePicker.mergedTheme.overrides.Input
            }
            stateful={false}
            size={this.timePickerSize}
            class="n-date-panel-date-input"
            textDecoration={this.isDateInvalid ? 'line-through' : ''}
            placeholder={this.locale.selectDate}
            onBlur={this.handleDateInputBlur}
            onUpdateValue={this.handleDateInput}
          />
          <NTimePicker
            showIcon={false}
            format={this.timeFormat}
            stateful={false}
            unstableTheme={this.NDatePicker.mergedTheme.peers.TimePicker}
            unstableThemeOverrides={
              this.NDatePicker.mergedTheme.overrides.TimePicker
            }
            teleport-disabled
            size={this.timePickerSize}
            value={this.value}
            placeholder="locale.selectTime"
            isHourDisabled={this.isHourDisabled}
            isMinuteDisabled={this.isMinuteDisabled}
            isSecondDisabled={this.isSecondDisabled}
            onUpdateValue={this.handleTimePickerChange}
          />
        </div>
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
                {this.locale.clear}
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
                {this.locale.now}
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
                {this.locale.confirm}
              </NButton>
            ) : null}
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
