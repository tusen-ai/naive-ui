import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import { NIconWrapper as NIconWrapperImpl } from './src/IconWrapper'

export { iconWrapperProps } from './src/IconWrapper'
export type { IconWrapperProps } from './src/IconWrapper'

export const NIconWrapper: WithNativeAttrs<
  typeof NIconWrapperImpl,
  HTMLAttributes
> = NIconWrapperImpl
