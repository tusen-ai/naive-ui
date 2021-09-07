import sizeVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor3,
    infoColor,
    errorColor,
    successColor,
    warningColor,
    textColor1,
    textColor2,
    railColor,
    fontWeightStrong,
    fontSize
  } = vars
  return {
    ...sizeVariables,
    contentFontSize: fontSize,
    titleFontWeight: fontWeightStrong,
    circleBorder: `2px solid ${textColor3}`,
    circleBorderInfo: `2px solid ${infoColor}`,
    circleBorderError: `2px solid ${errorColor}`,
    circleBorderSuccess: `2px solid ${successColor}`,
    circleBorderWarning: `2px solid ${warningColor}`,
    iconColor: textColor3,
    iconColorInfo: infoColor,
    iconColorError: errorColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    titleTextColor: textColor1,
    contentTextColor: textColor2,
    metaTextColor: textColor3,
    lineColor: railColor
  }
}

export type TimelineThemeVars = ReturnType<typeof self>

const timelineLight: Theme<'Timeline', TimelineThemeVars> = {
  name: 'Timeline',
  common: commonLight,
  self
}

export default timelineLight
export type TimelineTheme = typeof timelineLight
