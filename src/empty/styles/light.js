import commonVars from './_common'
import { commonLight } from '../../_styles/new-common'
import { iconLight } from '../../icon/styles'

export default {
  name: 'Empty',
  common: commonLight,
  peers: {
    Icon: iconLight
  },
  self (vars) {
    const {
      textColorDisabled,
      iconColorOverlay,
      textColor2,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    } = vars
    return {
      ...commonVars,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge,
      textColor: textColorDisabled,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2
    }
  }
}
