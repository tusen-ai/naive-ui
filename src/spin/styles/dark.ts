import { commonDark } from '../../_styles/common'
import type { SpinTheme } from './light'

const spinDark: SpinTheme = {
  name: 'Spin',
  common: commonDark,
  self (vars) {
    const {
      opacityDisabled,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge,
      primaryColor
    } = vars
    return {
      sizeTiny: heightTiny,
      sizeSmall: heightSmall,
      sizeMedium: heightMedium,
      sizeLarge: heightLarge,
      sizeHuge: heightHuge,
      color: primaryColor,
      opacitySpinning: opacityDisabled
    }
  }
}

export default spinDark
