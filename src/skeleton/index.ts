import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSkeletonImpl from './src/Skeleton'

export type * from './src/public-types'
export { skeletonProps } from './src/Skeleton'
export type { SkeletonProps } from './src/Skeleton'

export const NSkeleton: WithNativeAttrs<typeof NSkeletonImpl, HTMLAttributes>
  = NSkeletonImpl
