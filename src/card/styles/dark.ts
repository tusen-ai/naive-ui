import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'
import type { CardTheme } from './light'

const cardDark: CardTheme = {
  name: 'Card',
  common: commonDark,
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

export default cardDark
