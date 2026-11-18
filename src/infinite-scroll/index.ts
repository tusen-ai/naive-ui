import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NInfiniteScrollImpl from './src/InfiniteScroll'

export { infiniteScrollProps } from './src/InfiniteScroll'
export type { InfiniteScrollProps } from './src/InfiniteScroll'

export const NInfiniteScroll: WithNativeAttrs<
  typeof NInfiniteScrollImpl,
  Omit<HTMLAttributes, 'role'>
> = NInfiniteScrollImpl
