export interface AvatarGroupAvatarSlotProps<
  T extends AvatarGroupOption = AvatarGroupOption
> {
  option: T
}

export interface AvatarGroupRestSlotProps<
  T extends AvatarGroupOption = AvatarGroupOption
> {
  options: Array<T>
  rest: number
}

export interface AvatarGroupOption {
  src: string
}
