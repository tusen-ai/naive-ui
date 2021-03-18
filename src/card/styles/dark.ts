import { commonDark } from '../../_styles/common'
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
      modalColor,
      textColor2,
      textColor1,
      dividerColor,
      actionColor,
      fontWeightStrong,
      closeColor,
      closeColorHover,
      closeColorPressed,
      boxShadow1
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      color: cardColor,
      colorModal: modalColor,
      textColor: textColor2,
      titleTextColor: textColor1,
      borderColor: dividerColor,
      actionColor: actionColor,
      titleFontWeight: fontWeightStrong,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      fontSizeSmall: fontSize,
      fontSizeMedium: fontSize,
      fontSizeLarge: fontSize,
      fontSizeHuge: fontSize,
      boxShadow: boxShadow1,
      borderRadius
    }
  }
}

export default cardDark
