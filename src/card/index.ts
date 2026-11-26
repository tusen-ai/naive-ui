import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCardImpl from './src/Card'

export { cardProps } from './src/Card'
export type { CardProps, CardSegmented, CardSlots } from './src/Card'
export type * from './src/public-types'

export const NCard: WithNativeAttrs<typeof NCardImpl, HTMLAttributes>
  = NCardImpl
