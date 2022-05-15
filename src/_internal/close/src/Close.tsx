import { h, defineComponent, PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { resolveSlot } from '../../../_utils'
import NBaseIcon from '../../icon'
import { CloseIcon } from '../../icons'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseClose',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('-base-close', style, toRef(props, 'clsPrefix'))
  },
  render () {
    const { clsPrefix, disabled } = this
    return (
      <NBaseIcon
        role="button"
        ariaDisabled={disabled}
        ariaLabel="close"
        clsPrefix={clsPrefix}
        class={[
          `${clsPrefix}-base-close`,
          disabled && `${clsPrefix}-base-close--disabled`
        ]}
        onClick={disabled ? undefined : this.onClick}
      >
        {{
          default: () =>
            resolveSlot(this.$slots['close-icon'], () => [<CloseIcon />])
        }}
      </NBaseIcon>
    )
  }
})
