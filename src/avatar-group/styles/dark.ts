import { commonDark } from '../../_styles/common'
import { avatarDark } from '../../avatar/styles'
import type { AvatarGroupTheme } from './light'

const avatarGroupDark: AvatarGroupTheme = {
  name: 'AvatarGroup',
  common: commonDark,
  peers: {
    Avatar: avatarDark
  }
}

export default avatarGroupDark
