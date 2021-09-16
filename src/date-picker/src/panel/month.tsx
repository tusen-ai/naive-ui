import { h, defineComponent, renderSlot, watchEffect, VNode } from 'vue'
import { NButton, NxButton } from '../../../button'
import { NBaseFocusDetector } from '../../../_internal'
import { useCalendar } from './use-calendar'
import { warnOnce } from '../../../_utils'
import { NScrollbar } from '../../../scrollbar'
import { VirtualList } from 'vueuc'

/**
 * Month Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
export default defineComponent({
  name: 'MonthPanel',
  props: useCalendar.props,
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
    return useCalendar(props, 'month')
  },
  render () {
    const { mergedClsPrefix, mergedTheme, shortcuts } = this
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={`${mergedClsPrefix}-date-panel ${mergedClsPrefix}-date-panel--month`}
        onFocus={this.handlePanelFocus}
        onKeydown={this.handlePanelKeyDown}
      >
        <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
          <div
            class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
          >
            <VirtualList
              ref="yearScrollRef"
              items={this.yearArray.map((yearItem, i) => (
                <div
                  data-n-date
                  key={i}
                  data-selected={yearItem.selected ? '' : null}
                  class={[
                    `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
                    {
                      [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`]:
                        yearItem.inCurrentYear,
                      [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`]:
                        yearItem.selected,
                      [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`]:
                        this.mergedIsDateDisabled(yearItem.ts)
                    }
                  ]}
                  onClick={() => this.handleDateClick(yearItem)}
                >
                  {yearItem.dateObject.year}
                  {yearItem.inCurrentYear ? (
                    <div
                      class={`${mergedClsPrefix}-date-panel-month-calendar__sup`}
                    />
                  ) : null}
                </div>
              ))}
              itemSize={40}
              showScrollbar={false}
            >
              {{
                default: ({ item }: { item: VNode }) => {
                  return item
                }
              }}
            </VirtualList>
          </div>
          <div
            class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
          >
            <NScrollbar
              ref="monthScrollRef"
              // theme={mergedTheme.peers.Scrollbar}
              // themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            >
              {{
                default: () => [
                  ...this.monthArray.map((monthItem, i) => (
                    <div
                      data-n-date
                      key={i}
                      data-selected={monthItem.selected ? '' : null}
                      class={[
                        `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
                        {
                          [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`]:
                            monthItem.inCurrentMonth,
                          [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`]:
                            monthItem.selected,
                          [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`]:
                            this.mergedIsDateDisabled(monthItem.ts)
                        }
                      ]}
                      onClick={() => this.handleDateClick(monthItem)}
                    >
                      {monthItem.showText}
                      {monthItem.inCurrentMonth ? (
                        <div
                          class={`${mergedClsPrefix}-date-panel-month-calendar__sup`}
                        />
                      ) : null}
                    </div>
                  )),
                  <div
                    class={`${mergedClsPrefix}-date-panel-month-calendar__padding`}
                  />
                ]
              }}
            </NScrollbar>
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
                        this.cachePendingValue()
                        this.doUpdateValue(shortcut, false)
                      }}
                      onClick={() => {
                        this.doUpdateValue(shortcut, false)
                        this.clearPendingValue()
                        this.handleConfirmClick()
                      }}
                      onMouseleave={() => {
                        this.restorePendingValue()
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
