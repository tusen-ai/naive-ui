import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
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

export type ProgressThemeVars = ReturnType<typeof self>

const progressLight: Theme<'Progress', ProgressThemeVars> = {
  name: 'Progress',
  common: commonLight,
  self
}

export default progressLight
export type ProgressTheme = typeof progressLight
