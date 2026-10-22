import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    primaryColor,
    borderRadius,
    lineHeight,
    fontSize,
    cardColor,
    textColor2,
    textColor1,
    dividerColor,
    fontWeightStrong,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    modalColor,
    boxShadow1,
    popoverColor,
    actionColor
  } = vars
  return {
    ...commonVariables,
    lineHeight,
    color: cardColor,
    colorModal: modalColor,
    colorPopover: popoverColor,
    colorTarget: primaryColor,
    colorEmbedded: actionColor,
    colorEmbeddedModal: actionColor,
    colorEmbeddedPopover: actionColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    borderColor: dividerColor,
    actionColor,
    titleFontWeight: fontWeightStrong,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    fontSizeSmall: fontSize,
    fontSizeMedium: fontSize,
    fontSizeLarge: fontSize,
    fontSizeHuge: fontSize,
    boxShadow: boxShadow1,
    borderRadius
  }
}

export interface CardThemeVars extends ReturnType<typeof self> {}

const cardLight: CardTheme = {
  name: 'Card',
  common: commonLight,
  self
}

export interface CardTheme extends Theme<'Card', CardThemeVars> {}

export interface CardThemeOverrides extends ExtractThemeOverrides<CardTheme> {}

export default cardLight
