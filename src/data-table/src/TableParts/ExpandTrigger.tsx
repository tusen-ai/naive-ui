import type { RenderExpandIcon, RowData } from '../interface'
import { defineComponent, h, type PropType } from 'vue'
import {
  NBaseIcon,
  NBaseLoading,
  NIconSwitchTransition
} from '../../../_internal'
import { ChevronRightIcon } from '../../../_internal/icons'

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
    },
    rowData: {
      type: Object as PropType<RowData>,
      required: true
    }
  },
  render() {
    const { clsPrefix } = this
    return (
      <div
        class={[
          `${clsPrefix}-data-table-expand-trigger`,
          this.expanded && `${clsPrefix}-data-table-expand-trigger--expanded`
        ]}
        onClick={this.onClick}
        onMousedown={(e) => {
          e.preventDefault()
        }}
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
                  expanded: this.expanded,
                  rowData: this.rowData
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
