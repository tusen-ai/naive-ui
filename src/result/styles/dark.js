import sizeVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Result',
  common: commonDark,
  self (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
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
      titleTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
}
