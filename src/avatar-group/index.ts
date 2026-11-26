import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAvatarGroupImpl from './src/AvatarGroup'

export { avatarGroupProps } from './src/AvatarGroup'
export type { AvatarGroupProps, AvatarGroupSlots } from './src/AvatarGroup'
export type * from './src/generic-public-types'
export type * from './src/public-types'

export const NAvatarGroup: WithNativeAttrs<
  typeof NAvatarGroupImpl,
  HTMLAttributes
> = NAvatarGroupImpl
