import { h, defineComponent, PropType } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import {
  NBaseIcon,
  NBaseLoading,
  NIconSwitchTransition
} from '../../../_internal'
import { RenderExpandIcon } from '../interface'

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
      type: Function as PropType<RenderExpandIcon>
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={[
          `${clsPrefix}-data-table-expand-trigger`,
          this.expanded && `${clsPrefix}-data-table-expand-trigger--expanded`
        ]}
        onClick={this.onClick}
      >
        <NIconSwitchTransition>
          {{
            default: () => {
              return this.loading ? (
                <NBaseLoading
                  key="loading"
                  clsPrefix={this.clsPrefix}
                  radius={85}
                  strokeWidth={15}
                  scale={0.88}
                />
              ) : this.renderExpandIcon ? (
                this.renderExpandIcon({
                  expanded: this.expanded
                })
              ) : (
                <NBaseIcon clsPrefix={clsPrefix} key="base-icon">
                  {{
                    default: () => <ChevronRightIcon />
                  }}
                </NBaseIcon>
              )
            }
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
