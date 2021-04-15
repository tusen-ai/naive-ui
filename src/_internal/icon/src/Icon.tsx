import { h, defineComponent, PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onMousedown: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('BaseIcon', style, toRef(props, 'clsPrefix'))
  },
  render () {
    return (
      <i
        class={`${this.clsPrefix}-base-icon`}
        onClick={this.onClick}
        onMousedown={this.onMousedown}
      >
        {this.$slots}
      </i>
    )
  }
})
