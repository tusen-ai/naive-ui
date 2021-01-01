import { iconLight } from '../../icon/styles'
import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  common: commonLight,
  peers: [iconLight],
  self (vars) {
    const {
      borderRadius,
      lineHeight,
      fontSize,
      cardColor,
      textColor2,
      textColor1,
      dividerColorOverlay,
      actionColorOverlay,
      fontWeightStrong,
      closeColor,
      closeColorHover,
      closeColorPressed
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      color: cardColor,
      textColor: textColor2,
      titleTextColor: textColor1,
      borderColor: dividerColorOverlay,
      actionColor: actionColorOverlay,
      titleFontWeight: fontWeightStrong,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      fontSizeSmall: fontSize,
      fontSizeMedium: fontSize,
      fontSizeLarge: fontSize,
      fontSizeHuge: fontSize,
      borderRadius
    }
  }
}
