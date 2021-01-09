import commonVars from './_common'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Dialog',
  common: commonLight,
  peers: {
    Button: buttonLight
  },
  self (vars) {
    const {
      textColor1,
      textColor2,
      cardColor,
      closeColor,
      closeColorHover,
      closeColorPressed,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      dividerColor,
      borderRadius,
      fontWeightStrong,
      lineHeight,
      fontSize
    } = vars
    return {
      ...commonVars,
      fontSize,
      lineHeight,
      border: `1px solid ${dividerColor}`,
      titleTextColor: textColor1,
      textColor: textColor2,
      color: cardColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      titleFontWeight: fontWeightStrong
    }
  }
}
