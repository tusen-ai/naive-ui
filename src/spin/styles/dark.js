import { commonDark } from '../../_styles/new-common'

export default {
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
