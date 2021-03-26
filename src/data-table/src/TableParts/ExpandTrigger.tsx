import { h, defineComponent, PropType, CSSProperties } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'

export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
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
      <NBaseIcon onClick={this.onClick} style={style}>
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
