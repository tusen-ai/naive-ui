import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    textColor2,
    textColor1,
    errorColor,
    successColor,
    infoColor,
    warningColor,
    lineHeight,
    fontWeightStrong
  } = vars
  return {
    ...commonVariables,
    lineHeight,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    textColor: textColor2,
    iconColorError: errorColor,
    iconColorSuccess: successColor,
    iconColorInfo: infoColor,
    iconColorWarning: warningColor
  }
}

export interface ResultThemeVars extends ReturnType<typeof self> {}

const resultLight: ResultTheme = {
  name: 'Result',
  common: commonLight,
  self
}

export interface ResultTheme extends Theme<'Result', ResultThemeVars> {}

export interface ResultThemeOverrides extends ExtractThemeOverrides<ResultTheme> {}

export default resultLight
