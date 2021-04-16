import { defineComponent } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { DESCRIPTION_ITEM_FLAG } from './utils'

const descriptionItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  }
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
