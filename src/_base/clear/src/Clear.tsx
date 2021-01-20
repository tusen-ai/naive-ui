import { h, defineComponent, PropType, renderSlot } from 'vue'
import { useStyle } from '../../../_mixins'
import { DismissCircleIcon } from '../../icons'
import NBaseIcon from '../../icon'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseClear',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function as PropType<((e: MouseEvent) => void) | undefined>,
      default: undefined
    }
  },
  setup () {
    useStyle('BaseClear', style)
    return {
      handleMouseDown (e: MouseEvent) {
        e.preventDefault()
      }
    }
  },
  render () {
    return (
      <div class="n-base-clear">
        <NIconSwitchTransition>
          {{
            default: () => {
              return this.show ? (
                <NBaseIcon
                  key="dismiss"
                  class="n-base-clear__clear"
                  onClick={this.onClear}
                  onMousedown={this.handleMouseDown}
                >
                  {{ default: () => <DismissCircleIcon /> }}
                </NBaseIcon>
              ) : (
                <div key="icon" class="n-base-clear__placeholder">
                  {renderSlot(this.$slots, 'default')}
                </div>
              )
            }
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
