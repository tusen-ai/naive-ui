import commonVars from './_common'
import { iconDark } from '../../icon/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Dialog',
  common: commonDark,
  peers: {
    Icon: iconDark,
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
      fontSize
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
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      titleFontWeight: fontWeightStrong
    }
  }
}
