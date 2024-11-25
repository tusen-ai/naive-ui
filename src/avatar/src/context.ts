import type { AvatarGroupInjection } from '../../avatar-group/src/AvatarGroup'
import { createInjectionKey } from '../../_utils'

export const avatarGroupInjectionKey
  = createInjectionKey<AvatarGroupInjection>('n-avatar-group')
