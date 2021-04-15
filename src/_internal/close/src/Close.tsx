import { h, defineComponent, PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
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
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('BaseClose', style, toRef(props, 'clsPrefix'))
    return () => {
      const { clsPrefix } = props
      return (
        <NBaseIcon
          clsPrefix={clsPrefix}
          class={[
            `${clsPrefix}-base-close`,
            props.disabled && `${clsPrefix}-base-close--disabled`
          ]}
          onClick={props.onClick}
        >
          {{
            default: () => <CloseIcon />
          }}
        </NBaseIcon>
      )
    }
  }
})
