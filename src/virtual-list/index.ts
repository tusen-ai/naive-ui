import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NVirtualListImpl from './src/VirtualList'

export { virtualListProps } from './src/VirtualList'
export type { VirtualListInst, VirtualListProps } from './src/VirtualList'

export const NVirtualList: WithNativeAttrs<
  typeof NVirtualListImpl,
  Omit<HTMLAttributes, 'role'>
> = NVirtualListImpl
