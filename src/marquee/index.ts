import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NMarqueeImpl from './src/Marquee'

export type * from './src/public-types'

export const NMarquee: WithNativeAttrs<typeof NMarqueeImpl, HTMLAttributes>
  = NMarqueeImpl
