import { commonDark } from '../../_styles/new-common'
import sizeVarables from './_common'

export default {
  name: 'Empty',
  common: commonDark,
  self (vars) {
    const {
      textColorDisabledOverlay,
      iconColorOverlay,
      textColor2Overlay,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    } = vars
    return {
      ...sizeVarables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge,
      textColor: textColorDisabledOverlay,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2Overlay
    }
  }
}
