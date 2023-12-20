import { defineComponent, type PropType, type CSSProperties } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { DESCRIPTION_ITEM_FLAG } from './utils'

export const descriptionsItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelClass: String,
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentClass: String,
  contentStyle: [Object, String] as PropType<string | CSSProperties>
} as const

export type DescriptionItemProps = ExtractPublicPropTypes<
  typeof descriptionsItemProps
>

export default defineComponent({
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: descriptionsItemProps,
  render () {
    return null
  }
})
