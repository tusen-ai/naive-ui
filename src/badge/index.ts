import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NBadgeImpl from './src/Badge'

export { badgeProps } from './src/Badge'
export type { BadgeProps } from './src/Badge'

export const NBadge: WithNativeAttrs<typeof NBadgeImpl, HTMLAttributes>
  = NBadgeImpl
