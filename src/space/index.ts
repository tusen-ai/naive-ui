import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSpaceImpl from './src/Space'

export type * from './src/public-types'
export { spaceProps } from './src/Space'
export type { SpaceProps } from './src/Space'

export const NSpace: WithNativeAttrs<typeof NSpaceImpl, HTMLAttributes>
  = NSpaceImpl
