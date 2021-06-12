import { h, defineComponent, PropType, toRef, computed } from 'vue'
import { useStyle } from '../../../_mixins'
import { formatLength } from '../../../_utils'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: undefined
    },
    ariaHidden: {
      type: Boolean,
      default: undefined
    },
    clsPrefix: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    color: {
      type: String,
      default: undefined
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onMousedown: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('BaseIcon', style, toRef(props, 'clsPrefix'))
    return {
      mergedStyle: computed(() => {
        const { size, color } = props
        return {
          fontSize: formatLength(size),
          color
        }
      })
    }
  },
  render () {
    return (
      <i
        class={`${this.clsPrefix}-base-icon`}
        onClick={this.onClick}
        onMousedown={this.onMousedown}
        role={this.role}
        aria-label={this.ariaLabel}
        aria-hidden={this.ariaHidden}
        aria-disabled={this.ariaDisabled}
        style={this.mergedStyle}
      >
        {this.$slots}
      </i>
    )
  }
})
