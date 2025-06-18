import type { BubbleTheme } from './light'
import { commonDark } from '../../_styles/common'
import { self } from './light'
import { avatarDark } from '../../styles'

const bubbleDark: BubbleTheme = {
  name: 'Bubble',
  common: commonDark,
  peers: {
    avatar: avatarDark
  },
  self(vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default bubbleDark
