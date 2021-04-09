import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { Theme } from '../../_mixins'
import { changeColor } from 'seemly'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    fontSize,
    lineHeight,
    textColor2,
    textColor1,
    textColorDisabled,
    dividerColor,
    fontWeightStrong,
    primaryColor,
    baseColor,
    hoverColor
  } = vars
  return {
    ...commonVariables,
    borderRadius,
    borderColor: dividerColor,
    textColor: textColor2,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    dayTextColor: textColorDisabled,
    fontSize,
    lineHeight,
    dateColorCurrent: primaryColor,
    dateTextColorCurrent: baseColor,
    cellColorHover: hoverColor,
    cellColorActive: changeColor(primaryColor, { alpha: 0.12 })
  }
}

export type CalendarThemeVars = ReturnType<typeof self>

const calendarLight: Theme<'Calendar', CalendarThemeVars> = {
  name: 'Calendar',
  common: commonLight,
  self
}

export default calendarLight
export type CalendarTheme = typeof calendarLight
