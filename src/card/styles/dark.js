import { iconDark } from '../../icon/styles'
import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  peers: [iconDark],
  self (vars) {
    const {
      borderRadius,
      lineHeight,
      fontSize,
      cardColor,
      textColor2Overlay,
      textColor1Overlay,
      dividerColorOverlay,
      actionColorOverlay,
      fontWeightStrong,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      color: cardColor,
      textColor: textColor2Overlay,
      titleTextColor: textColor1Overlay,
      borderColor: dividerColorOverlay,
      actionColor: actionColorOverlay,
      titleFontWeight: fontWeightStrong,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      fontSizeSmall: fontSize,
      fontSizeMedium: fontSize,
      fontSizeLarge: fontSize,
      fontSizeHuge: fontSize,
      borderRadius
    }
  }
}
