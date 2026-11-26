import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NEllipsisImpl from './src/Ellipsis'
import { NPerformantEllipsis as NPerformantEllipsisImpl } from './src/PerformantEllipsis'

export { ellipsisProps } from './src/Ellipsis'
export type { EllipsisProps, EllipsisSlots } from './src/Ellipsis'

export const NEllipsis: WithNativeAttrs<typeof NEllipsisImpl, HTMLAttributes>
  = NEllipsisImpl
export const NPerformantEllipsis: WithNativeAttrs<
  typeof NPerformantEllipsisImpl,
  HTMLAttributes
> = NPerformantEllipsisImpl
