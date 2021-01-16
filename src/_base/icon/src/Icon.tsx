import { h, defineComponent, renderSlot } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseIcon',
  setup () {
    useStyle('BaseIcon', style)
  },
  render () {
    return <i class="n-base-icon">{renderSlot(this.$slots, 'default')}</i>
  }
})
