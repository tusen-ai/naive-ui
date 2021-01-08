import { commonDark } from '../../_styles/new-common'

export default {
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
