import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { avatarLight } from '../../avatar/styles'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AvatarGroupThemeVars = Record<string, unknown>

export const self = () => {
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
