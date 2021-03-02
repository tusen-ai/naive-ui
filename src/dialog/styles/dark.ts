import commonVars from './_common'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/common'
import type { DialogTheme } from './light'

const dialogDark: DialogTheme = {
  name: 'Dialog',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self (vars) {
    const {
      textColor1,
      textColor2,
      modalColor,
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
      fontSize,
      primaryColor
    } = vars
    return {
      ...commonVars,
      fontSize,
      lineHeight,
      border: `1px solid ${dividerColor}`,
      titleTextColor: textColor1,
      textColor: textColor2,
      color: modalColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      iconColor: primaryColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      titleFontWeight: fontWeightStrong
    }
  }
}

export default dialogDark
