import type { Theme } from '../../_mixins/use-theme'
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
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontWeight
  } = vars
  return {
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeCircleTiny: '9px',
    fontSizeCircleSmall: '15px',
    fontSizeCircleMedium: '28px',
    fontSizeCircleLarge: '32px',
    fontWeightCircle: fontWeight,
    railColor: progressRailColor,
    railHeightTiny: '3px',
    railHeightSmall: '6px',
    railHeightMedium: '8px',
    railHeightLarge: '12px',
    circleWidthTiny: '40px',
    circleWidthSmall: '60px',
    circleWidthMedium: '120px',
    circleWidthLarge: '200px',
    multipleCircleWidthTiny: '60px',
    multipleCircleWidthSmall: '120px',
    multipleCircleWidthMedium: '200px',
    multipleCircleWidthLarge: '250px',
    multipleCircleFontSizeTiny: '8px',
    multipleCircleFontSizeSmall: '10px',
    multipleCircleFontSizeMedium: '14px',
    multipleCircleFontSizeLarge: '20px',
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
