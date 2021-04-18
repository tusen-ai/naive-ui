import { h, defineComponent } from 'vue'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/input-group.cssr'

const inputGroupProps = {}

export type InputGroupProps = ExtractPublicPropTypes<typeof inputGroupProps>

export default defineComponent({
  name: 'InputGroup',
  props: inputGroupProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    useStyle('InputGroup', style, mergedClsPrefix)
    return {
      mergedClsPrefix
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return <div class={`${mergedClsPrefix}-input-group`}>{this.$slots}</div>
  }
})
