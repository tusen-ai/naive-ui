import { h, defineComponent, Transition, withDirectives, PropType } from 'vue'
import MonthPanel from './month'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useCalendar, useCalendarProps } from './use-calendar'

export default defineComponent({
  props: {
    ...useCalendarProps,
    onClickOutside: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    const calendarProp = useCalendar(props, 'date')
    return {
      ...calendarProp
    }
  },
  render () {
    const { onClickOutside } = this
    return (
      <VBinder>
        {{
          default: () => [
            <VTarget>
              {{
                default: () =>
                  this.locale.monthBeforeYear ? (
                    <div>
                      <span>{this.calendarMonth}</span>
                      <span>{this.calendarYear}</span>
                    </div>
                  ) : (
                    <div>
                      <span onClick={this.quickSelectYear}>
                        {this.calendarYear}
                      </span>
                      <span onClick={this.quickSelectMonth}>
                        {this.calendarMonth}
                      </span>
                    </div>
                  )
              }}
            </VTarget>,
            <VFollower show={this.showMonthYearPanel}>
              {{
                default: () => (
                  <Transition>
                    {{
                      default: () =>
                        this.showMonthYearPanel
                          ? withDirectives(
                              <MonthPanel
                                {...this.$props}
                                style={this.$attrs.style}
                                actions={[]}
                                type="month"
                                key="month"
                                quickMonth={true}
                              />,
                              [[clickoutside, onClickOutside]]
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
    )
  }
})
