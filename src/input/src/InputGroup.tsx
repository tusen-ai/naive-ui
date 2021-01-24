import { h, defineComponent } from 'vue'
import { useStyle } from '../../_mixins'
import style from './styles/input-group.cssr'

export default defineComponent({
  name: 'InputGroup',
  setup () {
    useStyle('InputGroup', style)
  },
  render () {
    return <div class="n-input-group">{this.$slots}</div>
  }
})
