import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import commonVariables from './_common'

const self = (vars: ThemeCommonVars) => {
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

export type CardThemeVars = ReturnType<typeof self>

const cardLight = {
  name: 'Card',
  common: commonLight,
  self
}

export default cardLight
export type CardTheme = typeof cardLight
