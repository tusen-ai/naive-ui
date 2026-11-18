import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDynamicTagsImpl from './src/DynamicTags'

export { dynamicTagsProps } from './src/DynamicTags'
export type { DynamicTagsProps, DynamicTagsSlots } from './src/DynamicTags'
export type {
  DynamicTagsInputSlotProps,
  DynamicTagsOption,
  DynamicTagsTriggerSlotProps
} from './src/interface'
export type * from './src/public-types'

export const NDynamicTags: WithNativeAttrs<
  typeof NDynamicTagsImpl,
  HTMLAttributes
> = NDynamicTagsImpl
