import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { avatarLight } from '../../avatar/styles'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AvatarGroupThemeVars = {}

const avatarGroupLight = createTheme({
  name: 'AvatarGroup',
  common: commonLight,
  peers: {
    Avatar: avatarLight
  }
})

export default avatarGroupLight
export type AvatarGroupTheme = typeof avatarGroupLight
