import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { AvatarTheme } from '../../avatar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { avatarLight } from '../../avatar/styles'

export function self() {
  return {
    gap: '-12px'
  }
}

export interface AvatarGroupThemeVars extends ReturnType<typeof self> {}

const avatarGroupLight: AvatarGroupTheme = createTheme({
  name: 'AvatarGroup',
  common: commonLight,
  peers: {
    Avatar: avatarLight
  },
  self
})

export interface AvatarGroupTheme extends Theme<
  'AvatarGroup',
  AvatarGroupThemeVars,
  {
    Avatar: AvatarTheme
  }
> {}

export interface AvatarGroupThemeOverrides extends ExtractThemeOverrides<AvatarGroupTheme> {}

export default avatarGroupLight
