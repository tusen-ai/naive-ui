import { changeColor } from 'seemly'
import type { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'

const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    successColor,
    warningColor,
    errorColor,
    infoColor,
    fontWeightStrong
  } = vars
  return {
    fontWeight: fontWeightStrong,
    rotate: '252deg',
    colorStartPrimary: changeColor(primaryColor, { alpha: 0.6 }),
    colorEndPrimary: primaryColor,
    colorStartInfo: changeColor(infoColor, { alpha: 0.6 }),
    colorEndInfo: infoColor,
    colorStartWarning: changeColor(warningColor, { alpha: 0.6 }),
    colorEndWarning: warningColor,
    colorStartError: changeColor(errorColor, { alpha: 0.6 }),
    colorEndError: errorColor,
    colorStartSuccess: changeColor(successColor, { alpha: 0.6 }),
    colorEndSuccess: successColor
  }
}

export type GradientTextThemeVars = ReturnType<typeof self>

const gradientTextLight: Theme<'GradientText', GradientTextThemeVars> = {
  name: 'GradientText',
  common: commonLight,
  self
}

export default gradientTextLight
export type GradientTextTheme = typeof gradientTextLight
