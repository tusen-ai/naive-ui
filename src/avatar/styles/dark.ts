import { commonDark } from '../../_styles/common'
import { AvatarTheme } from './light'

const avatarDark: AvatarTheme = {
  name: 'Avatar',
  common: commonDark,
  self (vars) {
    const {
      borderRadius,
      avatarColorOverlay,
      fontSize,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge
    } = vars
    return {
      borderRadius,
      fontSize,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge,
      color: avatarColorOverlay
    }
  }
}

export default avatarDark
