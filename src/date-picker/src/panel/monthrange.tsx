import {
  defineComponent,
  h,
  renderSlot,
  watchEffect,
  type PropType,
  type VNode,
  onMounted
} from 'vue'
import { VirtualList } from 'vueuc'
import { NxButton } from '../../../button'
import { NBaseFocusDetector, NScrollbar } from '../../../_internal'
import { warnOnce } from '../../../_utils'
import type { MonthItem, QuarterItem, YearItem } from '../utils'
import { MONTH_ITEM_HEIGHT } from '../config'
import { useDualCalendar, useDualCalendarProps } from './use-dual-calendar'

export default defineComponent({
  name: 'MonthRangePanel',
  props: {
    ...useDualCalendarProps,
    type: {
      type: String as PropType<'monthrange' | 'yearrange' | 'quarterrange'>,
      required: true
    }
  },
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.actions?.includes('now')) {
          warnOnce(
            'date-picker',
            'The `now` action is not supported for n-date-picker of ' +
              `${props.type}` +
              'type'
          )
        }
      })
    }
    const useCalendarRef = useDualCalendar(props, props.type)
    const renderItem = (
      item: YearItem | MonthItem | QuarterItem,
      i: number,
      mergedClsPrefix: string,
      type: 'start' | 'end'
    ): VNode => {
      const { handleColItemClick } = useCalendarRef
      // TODO
      const disabled = false
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
                disabled
            }
          ]}
          onClick={
            disabled
              ? undefined
              : () => {
                  handleColItemClick(item, type)
                }
          }
        >
          {item.type === 'month'
            ? item.dateObject.month + 1
            : item.type === 'quarter'
              ? `Q${item.dateObject.quarter}`
              : item.dateObject.year}
        </div>
      )
    }
    onMounted(() => {
      useCalendarRef.justifyColumnsScrollState()
    })
    return { ...useCalendarRef, renderItem }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      type,
      renderItem,
      onRender
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
          <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
            <NScrollbar
              ref="startYearScrollbarRef"
              class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              container={() => this.virtualListContainer('start')}
              content={() => this.virtualListContent('start')}
              horizontalRailStyle={{ zIndex: 1 }}
              verticalRailStyle={{ zIndex: 1 }}
            >
              {{
                default: () => (
                  <VirtualList
                    ref="startYearVlRef"
                    items={this.startYearArray}
                    itemSize={MONTH_ITEM_HEIGHT}
                    showScrollbar={false}
                    keyField="ts"
                    onScroll={this.handleStartYearVlScroll}
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
                        return renderItem(item, index, mergedClsPrefix, 'start')
                      }
                    }}
                  </VirtualList>
                )
              }}
            </NScrollbar>
            {type === 'monthrange' || type === 'quarterrange' ? (
              <div
                class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
              >
                <NScrollbar
                  ref="startMonthScrollbarRef"
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () => [
                      (type === 'monthrange'
                        ? this.startMonthArray
                        : this.startQuarterArray
                      ).map((item, i) =>
                        renderItem(item, i, mergedClsPrefix, 'start')
                      ),
                      type === 'monthrange' && (
                        <div
                          class={`${mergedClsPrefix}-date-panel-month-calendar__padding`}
                        />
                      )
                    ]
                  }}
                </NScrollbar>
              </div>
            ) : null}
          </div>
        </div>
        <div class={`${mergedClsPrefix}-date-panel__vertical-divider`} />
        <div
          ref="endDatesElRef"
          class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`}
        >
          <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
            <NScrollbar
              ref="endYearScrollbarRef"
              class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
              theme={mergedTheme.peers.Scrollbar}
              themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              container={() => this.virtualListContainer('end')}
              content={() => this.virtualListContent('end')}
              horizontalRailStyle={{ zIndex: 1 }}
              verticalRailStyle={{ zIndex: 1 }}
            >
              {{
                default: () => (
                  <VirtualList
                    ref="endYearVlRef"
                    items={this.endYearArray}
                    itemSize={MONTH_ITEM_HEIGHT}
                    showScrollbar={false}
                    keyField="ts"
                    onScroll={this.handleEndYearVlScroll}
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
                        return renderItem(item, index, mergedClsPrefix, 'end')
                      }
                    }}
                  </VirtualList>
                )
              }}
            </NScrollbar>
            {type === 'monthrange' || type === 'quarterrange' ? (
              <div
                class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
              >
                <NScrollbar
                  ref="endMonthScrollbarRef"
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () => [
                      (type === 'monthrange'
                        ? this.endMonthArray
                        : this.endQuarterArray
                      ).map((item, i) =>
                        renderItem(item, i, mergedClsPrefix, 'end')
                      ),
                      type === 'monthrange' && (
                        <div
                          class={`${mergedClsPrefix}-date-panel-month-calendar__padding`}
                        />
                      )
                    ]
                  }}
                </NScrollbar>
              </div>
            ) : null}
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
                <NxButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  onClick={this.handleClearClick}
                >
                  {{ default: () => this.locale.clear }}
                </NxButton>
              ) : null}
              {this.actions?.includes('confirm') ? (
                <NxButton
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                  size="tiny"
                  type="primary"
                  disabled={this.isRangeInvalid}
                  onClick={this.handleConfirmClick}
                >
                  {{ default: () => this.locale.confirm }}
                </NxButton>
              ) : null}
            </div>
          </div>
        ) : null}
        <NBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
