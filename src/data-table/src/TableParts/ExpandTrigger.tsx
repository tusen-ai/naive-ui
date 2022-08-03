import { h, defineComponent, PropType, VNodeChild } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import {
  NBaseIcon,
  NBaseLoading,
  NIconSwitchTransition
} from '../../../_internal'

export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function as PropType<() => void>,
      required: true
    },
    renderExpandIcon: {
      type: Function as PropType<(expanded: boolean) => VNodeChild>
    }
  },
  render () {
    return (
      <NBaseIcon
        class={`${this.clsPrefix}-data-table-expand-trigger`}
        clsPrefix={this.clsPrefix}
        onClick={this.onClick}
      >
        {{
          default: () => {
            return (
              <NIconSwitchTransition>
                {{
                  default: () =>
                    this.loading ? (
                      <NBaseLoading
                        clsPrefix={this.clsPrefix}
                        radius={85}
                        strokeWidth={15}
                        scale={0.88}
                      />
                    ) : this.renderExpandIcon ? (
                      this.renderExpandIcon(this.expanded)
                    ) : (
                      <ChevronRightIcon
                        class={`${this.clsPrefix}-data-table-expand-trigger__icon`}
                        style={
                          this.expanded
                            ? 'transform: rotate(90deg);'
                            : undefined
                        }
                      />
                    )
                }}
              </NIconSwitchTransition>
            )
          }
        }}
      </NBaseIcon>
    )
  }
})
