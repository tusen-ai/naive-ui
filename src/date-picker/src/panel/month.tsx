import { h, defineComponent, VNode, PropType } from 'vue'
import { VirtualList } from 'vueuc'
import { NButton, NxButton } from '../../../button'
import { NBaseFocusDetector, NScrollbar } from '../../../_internal'
import type { MonthItem, YearItem, QuarterItem } from '../utils'
import { MONTH_ITEM_HEIGHT } from '../config'
import { useCalendar, useCalendarProps } from './use-calendar'

/**
 * Month Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
export default defineComponent({
  name: 'MonthPanel',
  props: {
    ...useCalendarProps,
    type: {
      type: String as PropType<'month' | 'year' | 'quarter'>,
      required: true
    }
  },
  setup (props) {
    const useCalendarRef = useCalendar(props, props.type)
    const getRenderContent = (
      item: YearItem | MonthItem | QuarterItem
    ): number | string => {
      switch (item.type) {
        case 'year':
          return item.dateObject.year
        case 'month':
          return item.dateObject.month + 1
        case 'quarter':
          return `Q ${item.dateObject.quarter}`
      }
    }
    const renderItem = (
      item: YearItem | MonthItem | QuarterItem,
      i: number,
      mergedClsPrefix: string
    ): VNode => {
      const { mergedIsDateDisabled, handleDateClick } = useCalendarRef
      return (
        <div
          data-n-date
          key={i}
          class={[
            `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
            {
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`]:
                item.isCurrent,
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`]:
                item.selected,
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`]:
                mergedIsDateDisabled(item.ts)
            }
          ]}
          onClick={() => handleDateClick(item)}
        >
          {getRenderContent(item)}
        </div>
      )
    }
    return { ...useCalendarRef, renderItem }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      actions,
      renderItem,
      type
    } = this
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={[
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--month`
        ]}
        onFocus={this.handlePanelFocus}
        onKeydown={this.handlePanelKeyDown}
      >
        <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
          <NScrollbar
            ref="scrollbarInstRef"
            class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
            theme={mergedTheme.peers.Scrollbar}
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            container={this.virtualListContainer}
            content={this.virtualListContent}
            horizontalRailStyle={{ zIndex: 1 }}
            verticalRailStyle={{ zIndex: 1 }}
          >
            {{
              default: () => (
                <VirtualList
                  ref="yearScrollRef"
                  items={this.yearArray}
                  itemSize={MONTH_ITEM_HEIGHT}
                  showScrollbar={false}
                  keyField="ts"
                  onScroll={this.handleVirtualListScroll}
                  paddingBottom={4}
                >
                  {{
                    default: ({
                      item,
                      index
                    }: {
                      item: YearItem
                      index: number
                    }) => {
                      return renderItem(item, index, mergedClsPrefix)
                    }
                  }}
                </VirtualList>
              )
            }}
          </NScrollbar>
          {type === 'month' || type === 'quarter' ? (
            <div
              class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
            >
              <NScrollbar
                ref="monthScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    (type === 'month'
                      ? this.monthArray
                      : this.quarterArray
                    ).map((item, i) => renderItem(item, i, mergedClsPrefix)),
                    <div
                      class={`${mergedClsPrefix}-date-panel-${type}-calendar__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
        </div>
        {this.datePickerSlots.footer ? (
          <div class={`${mergedClsPrefix}-date-panel-footer`}>
            {{
              default: this.datePickerSlots.footer
            }}
          </div>
        ) : null}
        {actions?.length || shortcuts ? (
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
              {actions?.includes('clear') ? (
                <NButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  onClick={this.handleClearClick}
                >
                  {{ default: () => this.locale.clear }}
                </NButton>
              ) : null}
              {actions?.includes('now') ? (
                <NButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  onClick={this.handleNowClick}
                >
                  {{ default: () => this.locale.now }}
                </NButton>
              ) : null}
              {actions?.includes('confirm') ? (
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
              ) : null}
            </div>
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
