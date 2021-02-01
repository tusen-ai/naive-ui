import { h, defineComponent, PropType } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onMousedown: Function as PropType<(e: MouseEvent) => void>
  },
  setup () {
    useStyle('BaseIcon', style)
  },
  render () {
    return (
      <i
        class="n-base-icon"
        onClick={this.onClick}
        onMousedown={this.onMousedown}
      >
        {this.$slots}
      </i>
    )
  }
})
