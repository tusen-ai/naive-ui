import { h, defineComponent } from 'vue'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/input-group.cssr'

export const inputGroupProps: { [key in any]: never } = {}

export type InputGroupProps = ExtractPublicPropTypes<typeof inputGroupProps>

export default defineComponent({
  name: 'InputGroup',
  props: inputGroupProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useStyle('-input-group', style, mergedClsPrefixRef)
    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return <div class={`${mergedClsPrefix}-input-group`}>{this.$slots}</div>
  }
})
