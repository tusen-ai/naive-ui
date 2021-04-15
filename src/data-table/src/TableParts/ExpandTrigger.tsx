import { h, defineComponent, PropType, CSSProperties } from 'vue'
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
    const style: CSSProperties = {
      cursor: 'pointer',
      fontSize: '16px'
    }
    return (
      <NBaseIcon
        clsPrefix={this.clsPrefix}
        onClick={this.onClick}
        style={style}
      >
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
