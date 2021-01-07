import sizeVariables from './_common'
import { iconLight } from '../../icon/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Result',
  common: commonLight,
  peers: {
    Icon: iconLight
  },
  self (vars) {
    const {
      textColor2,
      textColor1,
      errorColor,
      successColor,
      infoColor,
      warningColor,
      lineHeight,
      fontWeightStrong
    } = vars
    return {
      ...sizeVariables,
      lineHeight,
      titleFontWeight: fontWeightStrong,
      titleTextColor: textColor1,
      textColor: textColor2,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
}
