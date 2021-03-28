import { h, defineComponent, PropType } from 'vue'
import { useStyle, useConfig } from '../../../_mixins'
import { ClearIcon } from '../../icons'
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
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
  setup () {
    useStyle('BaseClear', style)
    const { NConfigProvider } = useConfig()
    return {
      NConfigProvider,
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
                  {{
                    default: () => <ClearIcon />
                  }}
                </NBaseIcon>
              ) : (
                <div key="icon" class="n-base-clear__placeholder">
                  {this.$slots}
                </div>
              )
            }
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
