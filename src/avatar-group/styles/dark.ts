import type { AvatarGroupTheme } from './light'
import { commonDark } from '../../_styles/common'
import { avatarDark } from '../../avatar/styles'
import { self } from './light'

const avatarGroupDark: AvatarGroupTheme = {
  name: 'AvatarGroup',
  common: commonDark,
  peers: {
    Avatar: avatarDark
  },
  self
}

export default avatarGroupDark
