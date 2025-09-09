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
    return {
      ...commonSelf,
      filledBackgroundColor: '#313131',
      outlinedBorder: '1px solid #303030',
      shadowBoxShadow:
        '0px 12px 32px 4px rgba(0,0,0,.04),0px 8px 20px rgba(0,0,0,.08)'
    }
  }
}

export default bubbleDark
