import { defineComponent, h, type PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { resolveSlot } from '../../../_utils'
import { NBaseIcon } from '../../icon'
import NIconSwitchTransition from '../../icon-switch-transition'
import { ClearIcon } from '../../icons'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseClear',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: Boolean,
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
  setup(props) {
    useStyle('-base-clear', style, toRef(props, 'clsPrefix'))
    return {
      handleMouseDown(e: MouseEvent) {
        e.preventDefault()
      }
    }
  },
  render() {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-base-clear`}>
        <NIconSwitchTransition>
          {{
            default: () => {
              return this.show ? (
                <div
                  key="dismiss"
                  class={`${clsPrefix}-base-clear__clear`}
                  onClick={this.onClear}
                  onMousedown={this.handleMouseDown}
                  data-clear
                >
                  {resolveSlot(this.$slots.icon, () => [
                    <NBaseIcon clsPrefix={clsPrefix}>
                      {{
                        default: () => <ClearIcon />
                      }}
                    </NBaseIcon>
                  ])}
                </div>
              ) : (
                <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
                  {this.$slots.placeholder?.()}
                </div>
              )
            }
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
