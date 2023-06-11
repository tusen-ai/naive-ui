import { changeColor } from 'seemly'
import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    borderColor,
    primaryColor,
    baseColor,
    textColorDisabled,
    inputColorDisabled,
    textColor2,
    opacityDisabled,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightSmall,
    heightMedium,
    heightLarge,
    lineHeight
  } = vars
  return {
    ...commonVariables,
    labelLineHeight: lineHeight,
    buttonHeightSmall: heightSmall,
    buttonHeightMedium: heightMedium,
    buttonHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    boxShadow: `inset 0 0 0 1px ${borderColor}`,
    boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
      primaryColor,
      { alpha: 0.2 }
    )}`,
    boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
    color: baseColor,
    colorDisabled: inputColorDisabled,
    colorActive: '#0000',
    textColor: textColor2,
    textColorDisabled,
    dotColorActive: primaryColor,
    dotColorDisabled: borderColor,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
      primaryColor,
      { alpha: 0.3 }
    )}`,
    buttonBoxShadowHover: 'inset 0 0 0 1px #0000',
    buttonBoxShadow: 'inset 0 0 0 1px #0000',
    buttonBorderRadius: borderRadius
  }
}

export type RadioThemeVars = ReturnType<typeof self>

const radioLight: Theme<'Radio', RadioThemeVars> = {
  name: 'Radio',
  common: commonLight,
  self
}

export default radioLight
export type RadioTheme = typeof radioLight
