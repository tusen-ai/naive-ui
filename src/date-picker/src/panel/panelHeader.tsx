import {
  h,
  defineComponent,
  Transition,
  withDirectives,
  PropType,
  ref
} from 'vue'
import MonthPanel from './month'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useIsMounted } from 'vooks'
import { usePanelCommon, usePanelCommonProps } from './use-panel-common'

export default defineComponent({
  props: {
    ...usePanelCommonProps,
    mergedClsPrefix: String,
    calendarMonth: String,
    calendarYear: String,
    onUpdateCalendarValue: Function as PropType<(value: number) => void>
  },
  setup (props) {
    const panelCommon = usePanelCommon(props)
    const triggerPanelMonthRef = ref<HTMLElement | null>(null)
    const monthPanelRef = ref<InstanceType<typeof MonthPanel> | null>(null)
    function handleClickOutside (e: MouseEvent): void {
      if (
        panelCommon.showMonthYearPanel.value &&
        !triggerPanelMonthRef.value?.contains(e.target as Node)
      ) {
        panelCommon.showMonthYearPanel.value = false
      }
    }
    return {
      ...panelCommon,
      triggerPanelMonthRef,
      monthPanelRef,
      handleClickOutside,
      monthPanelIsMounted: useIsMounted()
    }
  },
  render () {
    const { handleClickOutside, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-date-panel-month__month-year`}
        ref="triggerPanelMonthRef"
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () =>
                    this.locale.monthBeforeYear ? (
                      <div onClick={this.handleOpenQuickSelectMonthPanel}>
                        <span>{this.calendarMonth}</span>
                        <span>{this.calendarYear}</span>
                      </div>
                    ) : (
                      <div onClick={this.handleOpenQuickSelectMonthPanel}>
                        <span>{this.calendarYear}</span>
                        <span>{this.calendarMonth}</span>
                      </div>
                    )
                }}
              </VTarget>,
              <VFollower show={this.showMonthYearPanel}>
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.monthPanelIsMounted}
                    >
                      {{
                        default: () =>
                          this.showMonthYearPanel
                            ? withDirectives(
                                <MonthPanel
                                  ref="monthPanelRef"
                                  {...this.$props}
                                  style={this.$attrs.style}
                                  actions={[]}
                                  // month and year click show month type
                                  type="month"
                                  key="month"
                                  quickMonth={true}
                                  onUpdatePanelValue={
                                    this.onUpdateCalendarValue
                                  }
                                />,
                                [[clickoutside, handleClickOutside]]
                            )
                            : null
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
