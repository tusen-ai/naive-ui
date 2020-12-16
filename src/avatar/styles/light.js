import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Avatar',
  peer: [baseLight],
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
