import {
  h,
  defineComponent,
  Transition,
  withDirectives,
  type PropType,
  ref
} from 'vue'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { getPreciseEventTarget } from 'seemly'
import MonthPanel from './month'

export default defineComponent({
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    value: Number,
    monthBeforeYear: {
      type: Boolean,
      required: true
    },
    calendarMonth: {
      type: String,
      required: true
    },
    calendarYear: {
      type: String,
      required: true
    },
    onUpdateValue: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
  },
  setup () {
    const triggerRef = ref<HTMLElement | null>(null)
    const monthPanelRef = ref<InstanceType<typeof MonthPanel> | null>(null)
    const showRef = ref(false)
    function handleClickOutside (e: MouseEvent): void {
      if (
        showRef.value &&
        !triggerRef.value?.contains(getPreciseEventTarget(e) as Node | null)
      ) {
        showRef.value = false
      }
    }
    function handleHeaderClick (): void {
      showRef.value = !showRef.value
    }
    return {
      show: showRef,
      triggerRef,
      monthPanelRef,
      handleHeaderClick,
      handleClickOutside
    }
  },
  render () {
    const { handleClickOutside, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-date-panel-month__month-year`}
        ref="triggerRef"
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <div
                      class={[
                        `${mergedClsPrefix}-date-panel-month__text`,
                        this.show &&
                          `${mergedClsPrefix}-date-panel-month__text--active`
                      ]}
                      onClick={this.handleHeaderClick}
                    >
                      {this.monthBeforeYear
                        ? [this.calendarMonth, ' ', this.calendarYear]
                        : [this.calendarYear, ' ', this.calendarMonth]}
                    </div>
                  )
                }}
              </VTarget>,
              <VFollower show={this.show} teleportDisabled>
                {{
                  default: () => (
                    <Transition name="fade-in-scale-up-transition" appear>
                      {{
                        default: () =>
                          this.show
                            ? withDirectives(
                                <MonthPanel
                                  ref="monthPanelRef"
                                  onUpdateValue={this.onUpdateValue}
                                  actions={[]}
                                  // month and year click show month type
                                  type="month"
                                  key="month"
                                  useAsQuickJump
                                  value={this.value}
                                />,
                                [
                                  [
                                    clickoutside,
                                    handleClickOutside,
                                    undefined as unknown as string,
                                    { capture: true }
                                  ]
                                ]
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
