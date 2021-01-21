import commonVars from './_common'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'
import type { DialogTheme } from './light'

const dialogDark: DialogTheme = {
  name: 'Dialog',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
      modalColor,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      dividerColorOverlay,
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
      border: `1px solid ${dividerColorOverlay}`,
      titleTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      color: modalColor,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
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
