import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { avatarLight } from '../../avatar/styles'

export type AvatarGroupThemeVars = Record<string, unknown>

export function self() {
  return {
    gap: '-12px'
  }
}

const avatarGroupLight = createTheme({
  name: 'AvatarGroup',
  common: commonLight,
  peers: {
    Avatar: avatarLight
  },
  self
})

export default avatarGroupLight
export type AvatarGroupTheme = typeof avatarGroupLight
