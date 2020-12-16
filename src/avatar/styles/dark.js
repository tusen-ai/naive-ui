import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Avatar',
  peer: [baseDark],
  getLocalVars (vars) {
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
})
