import commonVars from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Empty',
  common: commonLight,
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
