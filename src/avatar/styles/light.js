import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Avatar',
  common: commonLight,
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
