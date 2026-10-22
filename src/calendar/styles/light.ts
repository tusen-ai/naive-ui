import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import { composite } from 'seemly'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
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
    hoverColor,
    cardColor,
    modalColor,
    popoverColor
  } = vars
  return {
    ...commonVariables,
    borderRadius,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    textColor: textColor2,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    dayTextColor: textColorDisabled,
    fontSize,
    lineHeight,
    dateColorCurrent: primaryColor,
    dateTextColorCurrent: baseColor,
    cellColorHover: composite(cardColor, hoverColor),
    cellColorHoverModal: composite(modalColor, hoverColor),
    cellColorHoverPopover: composite(popoverColor, hoverColor),
    cellColor: cardColor,
    cellColorModal: modalColor,
    cellColorPopover: popoverColor,
    barColor: primaryColor
  }
}

export interface CalendarThemeVars extends ReturnType<typeof self> {}

const calendarLight: CalendarTheme = createTheme({
  name: 'Calendar',
  common: commonLight,
  peers: {
    Button: buttonLight
  },
  self
})

export interface CalendarTheme extends Theme<
  'Calendar',
  CalendarThemeVars,
  {
    Button: ButtonTheme
  }
> {}

export interface CalendarThemeOverrides extends ExtractThemeOverrides<CalendarTheme> {}

export default calendarLight
