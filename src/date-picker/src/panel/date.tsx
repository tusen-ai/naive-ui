import { h, defineComponent, renderSlot, watchEffect, ref } from 'vue'
import { NButton, NxButton } from '../../../button'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon
} from '../../../_internal/icons'
import { NBaseFocusDetector } from '../../../_internal'
import { useCalendar, useCalendarProps } from './use-calendar'
import { warnOnce } from '../../../_utils'
import PanelHeader from './panelHeader'

/**
 * Date Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
export default defineComponent({
  name: 'DatePanel',
  props: useCalendarProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.actions?.includes('confirm')) {
          warnOnce(
            'date-picker',
            'The `confirm` action is not supported for n-date-picker of `date` type'
          )
        }
      })
    }
    const triggerPanelRef = ref<HTMLElement | null>(null)
    const panelHeaderRef = ref<InstanceType<typeof PanelHeader> | null>(null)
    const calendarProp = useCalendar(props, 'date')
    function handleClickOutside (e: MouseEvent): void {
      if (
        panelHeaderRef.value?.showMonthYearPanel &&
        !triggerPanelRef.value?.contains(e.target as Node)
      ) {
        panelHeaderRef.value.showMonthYearPanel = false
      }
    }
    return {
      ...calendarProp,
      triggerPanelRef,
      panelHeaderRef,
      handleClickOutside
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme, shortcuts } = this
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={`${mergedClsPrefix}-date-panel ${mergedClsPrefix}-date-panel--date`}
        onFocus={this.handlePanelFocus}
        onKeydown={this.handlePanelKeyDown}
      >
        <div class={`${mergedClsPrefix}-date-panel-calendar`}>
          <div class={`${mergedClsPrefix}-date-panel-month`}>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
              onClick={this.prevYear}
            >
              <FastBackwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__prev`}
              onClick={this.prevMonth}
            >
              <BackwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__month-year`}
              ref="triggerPanelRef"
            >
              <PanelHeader
                ref="panelHeaderRef"
                {...this.$props}
                {...this.$attrs}
                onClickOutside={handleClickOutside}
              />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__next`}
              onClick={this.nextMonth}
            >
              <ForwardIcon />
            </div>
            <div
              class={`${mergedClsPrefix}-date-panel-month__fast-next`}
              onClick={this.nextYear}
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
                      this.mergedIsDateDisabled(dateItem.ts)
                  }
                ]}
                onClick={() => this.handleDateClick(dateItem)}
              >
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
            {renderSlot(this.datePickerSlots, 'footer')}
          </div>
        ) : null}
        {this.actions?.length || shortcuts ? (
          <div class={`${mergedClsPrefix}-date-panel-actions`}>
            <div class={`${mergedClsPrefix}-date-panel-actions__prefix`}>
              {shortcuts &&
                Object.keys(shortcuts).map((key) => {
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
              {this.actions?.includes('now') ? (
                <NButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  onClick={this.handleNowClick}
                >
                  {{ default: () => this.locale.now }}
                </NButton>
              ) : null}
              {/** we don't need a confirm button for date picking */}
            </div>
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
