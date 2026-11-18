import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCollapseImpl from './src/Collapse'
import NCollapseItemImpl from './src/CollapseItem'

export { collapseProps } from './src/Collapse'
export type { CollapseProps, CollapseSlots } from './src/Collapse'
export { collapseItemProps } from './src/CollapseItem'
export type { CollapseItemProps, CollapseItemSlots } from './src/CollapseItem'
export type {
  CollapseArrowSlotProps,
  CollapseItemArrowSlotProps,
  CollapseItemHeaderExtraSlotProps,
  CollapseItemHeaderSlotProps
} from './src/interface'

export const NCollapse: WithNativeAttrs<typeof NCollapseImpl, HTMLAttributes>
  = NCollapseImpl
export const NCollapseItem: WithNativeAttrs<
  typeof NCollapseItemImpl,
  HTMLAttributes
> = NCollapseItemImpl
