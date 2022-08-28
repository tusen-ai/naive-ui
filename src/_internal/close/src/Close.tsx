import { h, defineComponent, PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { resolveSlot } from '../../../_utils'
import { NBaseIcon } from '../../icon'
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
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    absolute: Boolean
  },
  setup (props, { slots }) {
    useStyle('-base-close', style, toRef(props, 'clsPrefix'))
    return () => {
      const { clsPrefix, disabled, absolute, round } = props
      return (
        <button
          type="button"
          tabindex={disabled || !props.focusable ? -1 : 0}
          aria-disabled={disabled}
          aria-label="close"
          disabled={disabled}
          class={[
            `${clsPrefix}-base-close`,
            absolute && `${clsPrefix}-base-close--absolute`,
            disabled && `${clsPrefix}-base-close--disabled`,
            round && `${clsPrefix}-base-close--round`
          ]}
          onMousedown={(e) => {
            if (!props.focusable) {
              e.preventDefault()
            }
          }}
          onClick={props.onClick}
        >
          {resolveSlot(slots.default, () => [
            <NBaseIcon clsPrefix={clsPrefix}>
              {{
                default: () => <CloseIcon />
              }}
            </NBaseIcon>
          ])}
        </button>
      )
    }
  }
})
