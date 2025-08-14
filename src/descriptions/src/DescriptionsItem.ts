import type { ExtractPublicPropTypes } from '../../_utils'
import {
  defineComponent,
  type PropType,
  type SlotsType,
  type StyleValue,
  type VNode
} from 'vue'
import { DESCRIPTION_ITEM_FLAG } from './utils'

export const descriptionsItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelClass: String,
  labelStyle: Object as PropType<StyleValue>,
  contentClass: String,
  contentStyle: Object as PropType<StyleValue>
} as const

export type DescriptionItemProps = ExtractPublicPropTypes<
  typeof descriptionsItemProps
>

export interface DescriptionItemSlots {
  default?: () => VNode[]
  label?: () => VNode[]
}

export default defineComponent({
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: descriptionsItemProps,
  slots: Object as SlotsType<DescriptionItemSlots>,
  render() {
    return null
  }
})
