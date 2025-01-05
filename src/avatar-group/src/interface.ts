import type { AvatarGroupOption } from './AvatarGroup'

export interface AvatarGroupAvatarSlotProps {
  option: AvatarGroupOption
}

export interface AvatarGroupRestSlotProps {
  options: Array<AvatarGroupOption>
  rest: number
}
