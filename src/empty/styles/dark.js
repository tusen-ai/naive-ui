import { commonDark } from '../../_styles/new-common'
import sizeVarables from './_common'
import { iconDark } from '../../icon/styles'

export default {
  name: 'Empty',
  common: commonDark,
  peers: {
    Icon: iconDark
  },
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
