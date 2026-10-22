import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
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

export interface GradientTextThemeVars extends ReturnType<typeof self> {}

const gradientTextLight: GradientTextTheme = {
  name: 'GradientText',
  common: commonLight,
  self
}

export interface GradientTextTheme extends Theme<
  'GradientText',
  GradientTextThemeVars
> {}

export interface GradientTextThemeOverrides extends ExtractThemeOverrides<GradientTextTheme> {}

export default gradientTextLight
