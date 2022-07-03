import { defineComponent, PropType, CSSProperties } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { DESCRIPTION_ITEM_FLAG } from './utils'

export const descriptionItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentStyle: [Object, String] as PropType<string | CSSProperties>
} as const

export type DescriptionItemProps = ExtractPublicPropTypes<
  typeof descriptionItemProps
>

export default defineComponent({
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: descriptionItemProps,
  render () {
    return null
  }
})
