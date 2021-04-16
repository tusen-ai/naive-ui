import { defineComponent, h } from 'vue'
import { NButton } from '../../../button'
import { NInput } from '../../../input'
import { NTimePicker } from '../../../time-picker'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_internal/icons'
import { NBaseFocusDetector } from '../../../_internal'
import { useDualCalendar } from './use-dual-calendar'

export default defineComponent({
  name: 'DateTimeRangePanel',
  props: useDualCalendar.props,
  setup (props) {
    return useDualCalendar(props, 'datetimerange')
  },
  render () {
    const { NDatePicker } = this
    const { cPrefix } = NDatePicker
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={`${cPrefix}-date-panel ${cPrefix}-date-panel--datetimerange`}
        onClick={this.resetSelectingStatus}
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div class={`${cPrefix}-date-panel-header`}>
          <NInput
            value={this.startDateDisplayString}
            theme={NDatePicker.mergedTheme.peers.Input}
            themeOverrides={NDatePicker.mergedTheme.peerOverrides.Input}
            size={this.timePickerSize}
            stateful={false}
            class={`${cPrefix}-date-panel-date-input`}
            textDecoration={this.isStartValueInvalid ? 'line-through' : ''}
            placeholder={this.locale.selectDate}
            onBlur={this.handleStartDateInputBlur}
            onUpdateValue={this.handleStartDateInput}
          />
          <NTimePicker
            size={this.timePickerSize}
            to={false}
            showIcon={false}
            theme={NDatePicker.mergedTheme.peers.TimePicker}
            themeOverrides={NDatePicker.mergedTheme.peerOverrides.TimePicker}
            stateful={false}
            placeholder={this.locale.selectTime}
            format={this.timeFormat}
            value={this.startTimeValue}
            isHourDisabled={this.isStartHourDisabled}
            isMinuteDisabled={this.isStartMinuteDisabled}
            isSecondDisabled={this.isStartSecondDisabled}
            onUpdateValue={this.handleStartTimePickerChange}
          />
          <NInput
            value={this.endDateInput}
            theme={NDatePicker.mergedTheme.peers.Input}
            themeOverrides={NDatePicker.mergedTheme.peerOverrides.Input}
            stateful={false}
            size={this.timePickerSize}
            class={`${cPrefix}-date-panel-date-input`}
            textDecoration={this.isEndValueInvalid ? 'line-through' : ''}
            placeholder={this.locale.selectDate}
            onBlur={this.handleEndDateInputBlur}
            onUpdateValue={this.handleEndDateInput}
          />
          <NTimePicker
            showIcon={false}
            theme={NDatePicker.mergedTheme.peers.TimePicker}
            themeOverrides={NDatePicker.mergedTheme.peerOverrides.TimePicker}
            to={false}
            size={this.timePickerSize}
            stateful={false}
            format={this.timeFormat}
            placeholder={this.locale.selectTime}
            value={this.endTimeValue}
            isHourDisabled={this.isEndHourDisabled}
            isMinuteDisabled={this.isEndMinuteDisabled}
            isSecondDisabled={this.isEndSecondDisabled}
            onUpdateValue={this.handleEndTimePickerChange}
          />
        </div>
        <div
          ref="startDatesElRef"
          class={`${cPrefix}-date-panel-calendar ${cPrefix}-date-panel-calendar--start`}
        >
          <div class={`${cPrefix}-date-panel-month`}>
            <div
              class={`${cPrefix}-date-panel-month__fast-prev`}
              onClick={this.startCalendarPrevYear}
            >
              <FastBackwardIcon />
            </div>
            <div
              class={`${cPrefix}-date-panel-month__prev`}
              onClick={this.startCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class={`${cPrefix}-date-panel-month__month-year`}>
              {this.locale.monthBeforeYear
                ? `${this.startCalendarMonth} ${this.startCalendarYear}`
                : `${this.startCalendarYear} ${this.startCalendarMonth}`}
            </div>
            <div
              class={`${cPrefix}-date-panel-month__next`}
              onClick={this.startCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class={`${cPrefix}-date-panel-month__fast-next`}
              onClick={this.startCalendarNextYear}
            >
              <FastForwardIcon />
            </div>
          </div>
          <div class={`${cPrefix}-date-panel-weekdays`}>
            {this.weekdays.map((weekday) => (
              <div key={weekday} class={`${cPrefix}-date-panel-weekdays__day`}>
                {weekday}
              </div>
            ))}
          </div>
          <div class={`${cPrefix}-date-panel__divider`} />
          <div class={`${cPrefix}-date-panel-dates`}>
            {this.startDateArray.map((dateItem, i) => (
              <div
                key={i}
                class={[
                  `${cPrefix}-date-panel-date`,
                  {
                    [`${cPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                    [`${cPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                    [`${cPrefix}-date-panel-date--selected`]: dateItem.selected,
                    [`${cPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                    [`${cPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                    [`${cPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                    [`${cPrefix}-date-panel-date--transition-disabled`]: this
                      .transitionDisabled,
                    [`${cPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class={`${cPrefix}-date-panel-date__sup`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div class={`${cPrefix}-date-panel__vertical-divider`} />
        <div
          ref="endDatesElRef"
          class={`${cPrefix}-date-panel-calendar ${cPrefix}-date-panel-calendar--end`}
        >
          <div class={`${cPrefix}-date-panel-month`}>
            <div
              class={`${cPrefix}-date-panel-month__fast-prev`}
              onClick={this.endCalendarPrevYear}
            >
              <FastBackwardIcon />
            </div>
            <div
              class={`${cPrefix}-date-panel-month__prev`}
              onClick={this.endCalendarPrevMonth}
            >
              <BackwardIcon />
            </div>
            <div class={`${cPrefix}-date-panel-month__month-year`}>
              {this.locale.monthBeforeYear
                ? `${this.endCalendarMonth} ${this.endCalendarYear}`
                : `${this.endCalendarYear} ${this.endCalendarMonth}`}
            </div>
            <div
              class={`${cPrefix}-date-panel-month__next`}
              onClick={this.endCalendarNextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class={`${cPrefix}-date-panel-month__fast-next`}
              onClick={this.endCalendarNextYear}
            >
              <FastForwardIcon />
            </div>
          </div>
          <div class={`${cPrefix}-date-panel-weekdays`}>
            {this.weekdays.map((weekday) => (
              <div key={weekday} class={`${cPrefix}-date-panel-weekdays__day`}>
                {weekday}
              </div>
            ))}
          </div>
          <div class={`${cPrefix}-date-panel__divider`} />
          <div class={`${cPrefix}-date-panel-dates`}>
            {this.endDateArray.map((dateItem, i) => (
              <div
                key={i}
                class={[
                  `${cPrefix}-date-panel-date`,
                  {
                    [`${cPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                    [`${cPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                    [`${cPrefix}-date-panel-date--selected`]: dateItem.selected,
                    [`${cPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                    [`${cPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                    [`${cPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                    [`${cPrefix}-date-panel-date--transition-disabled`]: this
                      .transitionDisabled,
                    [`${cPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(
                      dateItem.ts
                    )
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
                onMouseenter={() => this.handleDateMouseEnter(dateItem)}
              >
                {dateItem.dateObject.date}
                {dateItem.isCurrentDate ? (
                  <div class={`${cPrefix}-date-panel-date__sup`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {this.actions?.length ? (
          <div class={`${cPrefix}-date-panel-actions`}>
            {this.actions.includes('clear') ? (
              <NButton
                theme={NDatePicker.mergedTheme.peers.Button}
                themeOverrides={NDatePicker.mergedTheme.peerOverrides.Button}
                size="tiny"
                onClick={this.handleClearClick}
              >
                {{ default: () => this.locale.clear }}
              </NButton>
            ) : null}
            {this.actions.includes('confirm') ? (
              <NButton
                theme={NDatePicker.mergedTheme.peers.Button}
                themeOverrides={NDatePicker.mergedTheme.peerOverrides.Button}
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
