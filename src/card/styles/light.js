import { commonLight } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Card',
  common: commonLight,
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
