import { h, defineComponent, PropType } from 'vue'
import { useStyle } from '../../../_mixins'
import NBaseIcon from '../../icon'
import { CloseIcon } from '../../icons'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseClose',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('BaseClose', style)
    return () => (
      <NBaseIcon
        class={[
          'n-base-close',
          {
            'n-base-close--disabled': props.disabled
          }
        ]}
        onClick={props.onClick}
      >
        {{ default: () => <CloseIcon /> }}
      </NBaseIcon>
    )
  }
})
