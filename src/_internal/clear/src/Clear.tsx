import { h, defineComponent, PropType, toRef } from 'vue'
import { useStyle, useConfig } from '../../../_mixins'
import { ClearIcon } from '../../icons'
import NBaseIcon from '../../icon'
import NIconSwitchTransition from '../../icon-switch-transition'
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
  setup (props) {
    useStyle('-base-clear', style, toRef(props, 'clsPrefix'))
    const { NConfigProvider } = useConfig()
    return {
      NConfigProvider,
      handleMouseDown (e: MouseEvent) {
        e.preventDefault()
      }
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-base-clear`}>
        <NIconSwitchTransition>
          {{
            default: () => {
              return this.show ? (
                <NBaseIcon
                  clsPrefix={clsPrefix}
                  key="dismiss"
                  class={`${clsPrefix}-base-clear__clear`}
                  onClick={this.onClear}
                  onMousedown={this.handleMouseDown}
                  data-clear
                >
                  {{
                    default: () => <ClearIcon />
                  }}
                </NBaseIcon>
              ) : (
                <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
                  {this.$slots.default?.()}
                </div>
              )
            }
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
