import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NPopoverImpl from './src/Popover'

export type { PopoverInst, PopoverTrigger } from './src/interface'
export { popoverProps } from './src/Popover'
export type { PopoverProps, PopoverSlots } from './src/Popover'
export type { FollowerPlacement as PopoverPlacement } from 'vueuc'

export const NPopover: WithNativeAttrs<typeof NPopoverImpl, HTMLAttributes>
  = NPopoverImpl
