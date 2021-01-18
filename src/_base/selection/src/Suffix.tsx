import { h, defineComponent, PropType } from 'vue'
import NBaseClear from '../../clear'
import NBaseLoading from '../../loading'
import NBaseIcon from '../../icon'
import { ChevronDownIcon } from '../../icons'

export default defineComponent({
  name: 'BaseSelectionSuffix',
  props: {
    showArrow: {
      type: Boolean,
      default: undefined
    },
    showClear: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function as PropType<((e: MouseEvent) => void) | undefined>,
      default: undefined
    }
  },
  setup (props) {
    return () => (
      <NBaseLoading
        class="n-base-selection__mark"
        strokeWidth={20}
        scale={0.8}
        show={props.loading}
      >
        {{
          default: () =>
            props.showArrow ? (
              <NBaseClear show={props.showClear} onClear={props.onClear}>
                {{
                  default: () => (
                    <NBaseIcon class="n-base-selection__arrow">
                      {{ default: () => <ChevronDownIcon /> }}
                    </NBaseIcon>
                  )
                }}
              </NBaseClear>
            ) : null
        }}
      </NBaseLoading>
    )
  }
})
