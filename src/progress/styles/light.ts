import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    infoColor,
    successColor,
    warningColor,
    errorColor,
    textColor2,
    progressRailColor,
    fontSize,
    fontWeight
  } = vars
  return {
    fontSize,
    fontSizeCircle: '28px',
    fontWeightCircle: fontWeight,
    railColor: progressRailColor,
    railHeight: '8px',
    iconSizeCircle: '36px',
    iconSizeLine: '18px',
    iconColor: infoColor,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    textColorCircle: textColor2,
    textColorLineInner: 'rgb(255, 255, 255)',
    textColorLineOuter: textColor2,
    fillColor: infoColor,
    fillColorInfo: infoColor,
    fillColorSuccess: successColor,
    fillColorWarning: warningColor,
    fillColorError: errorColor,
    lineBgProcessing:
      'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
  }
}

export interface ProgressThemeVars extends ReturnType<typeof self> {}

const progressLight: ProgressTheme = {
  name: 'Progress',
  common: commonLight,
  self
}

export interface ProgressTheme extends Theme<'Progress', ProgressThemeVars> {}

export interface ProgressThemeOverrides extends ExtractThemeOverrides<ProgressTheme> {}

export default progressLight
