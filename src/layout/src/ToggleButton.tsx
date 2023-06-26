import { h, defineComponent, type PropType } from 'vue'
import { NBaseIcon } from '../../_internal'
import { ChevronRightIcon } from '../../_internal/icons'

export default defineComponent({
  name: 'LayoutToggleButton',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-layout-toggle-button`} onClick={this.onClick}>
        <NBaseIcon clsPrefix={clsPrefix}>
          {{
            default: () => <ChevronRightIcon />
          }}
        </NBaseIcon>
      </div>
    )
  }
})
