import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAvatarImpl from './src/Avatar'

export { avatarProps } from './src/Avatar'
export type { AvatarProps, AvatarSlots } from './src/Avatar'

export const NAvatar: WithNativeAttrs<typeof NAvatarImpl, HTMLAttributes>
  = NAvatarImpl
