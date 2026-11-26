import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDescriptionsImpl from './src/Descriptions'

export { descriptionsProps } from './src/Descriptions'
export type {
  DescriptionProps,
  DescriptionsProps,
  DescriptionsSlots
} from './src/Descriptions'
export {
  descriptionsItemProps,
  default as NDescriptionsItem
} from './src/DescriptionsItem'
export type {
  DescriptionItemProps,
  DescriptionItemSlots
} from './src/DescriptionsItem'
export type * from './src/public-types'

export const NDescriptions: WithNativeAttrs<
  typeof NDescriptionsImpl,
  HTMLAttributes
> = NDescriptionsImpl
