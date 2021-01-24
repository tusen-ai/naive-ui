import { h, PropType, defineComponent, provide } from 'vue'
import { useStyle } from '../../_mixins'
import type { Size } from './interface'
import style from './styles/button-group.cssr'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    size: {
      type: String as PropType<Size | undefined>,
      default: undefined
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    useStyle('ButtonGroup', style)
    provide<ButtonGroupInjection>('NButtonGroup', props)
  },
  render () {
    return (
      <div
        class={[
          'n-button-group',
          {
            'n-button-group--vertical': this.vertical
          }
        ]}
      >
        {this.$slots}
      </div>
    )
  }
})
