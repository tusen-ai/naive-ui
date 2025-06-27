import type { BubbleTheme } from './light'
import { commonDark } from '../../_styles/common'
import { avatarDark } from '../../styles'
import { self } from './light'

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
