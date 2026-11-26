import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import { NIcon as NIconImpl } from './src/Icon'

export { iconProps } from './src/Icon'
export type { IconProps } from './src/Icon'

export const NIcon: WithNativeAttrs<
  typeof NIconImpl,
  Omit<HTMLAttributes, 'role'>
> = NIconImpl
