import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    lineHeight,
    fontSize,
    cardColor,
    textColor2,
    textColor1,
    dividerColor,
    actionColor,
    fontWeightStrong,
    closeColor,
    closeColorHover,
    closeColorPressed,
    modalColor,
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

export type CardThemeVars = ReturnType<typeof self>

const cardLight: Theme<'Card', CardThemeVars> = {
  name: 'Card',
  common: commonLight,
  self
}

export default cardLight
export type CardTheme = typeof cardLight
