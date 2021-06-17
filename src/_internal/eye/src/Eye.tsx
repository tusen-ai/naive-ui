import { h, defineComponent, PropType, toRef, ref } from 'vue'
import { useStyle, useConfig } from '../../../_mixins'
import { EyeIcon, EyeInvisibleIcon } from '../../icons'
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
    onClick: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup (props) {
    useStyle('BaseClear', style, toRef(props, 'clsPrefix'))
    const { NConfigProvider } = useConfig()
    const showPassWord = ref(false)
    return {
      NConfigProvider,
      handleMouseDown (e: MouseEvent) {
        e.preventDefault()
      },
      showPassWord,
      handleShowPassWord () {
        showPassWord.value = !showPassWord.value
      }
    }
  },
  render () {
    const { clsPrefix, showPassWord, handleShowPassWord, onClick } = this
    return (
      <div class={`${clsPrefix}-base-clear`} data-clear>
        <NIconSwitchTransition>
          {{
            default: () => {
              return (
                <NBaseIcon
                  clsPrefix={clsPrefix}
                  key="dismiss"
                  class={`${clsPrefix}-base-clear__clear`}
                  onClick={() => {
                    handleShowPassWord()
                    onClick()
                  }}
                  onMousedown={this.handleMouseDown}
                >
                  {{
                    default: () => {
                      if (showPassWord) {
                        return <EyeIcon />
                      } else {
                        return <EyeInvisibleIcon />
                      }
                    }
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
