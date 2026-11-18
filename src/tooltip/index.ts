import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTooltipImpl from './src/Tooltip'

export { tooltipProps } from './src/Tooltip'
export type { TooltipInst, TooltipProps, TooltipSlots } from './src/Tooltip'

export const NTooltip: WithNativeAttrs<typeof NTooltipImpl, HTMLAttributes>
  = NTooltipImpl
