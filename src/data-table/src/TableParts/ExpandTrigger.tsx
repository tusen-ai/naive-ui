import { h, defineComponent, PropType } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'

export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    onClick: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  render () {
    return (
      <NBaseIcon clsPrefix={this.clsPrefix} onClick={this.onClick}>
        {{
          default: () => {
            return (
              <ChevronRightIcon
                style={this.expanded ? 'transform: rotate(90deg);' : undefined}
              />
            )
          }
        }}
      </NBaseIcon>
    )
  }
})
