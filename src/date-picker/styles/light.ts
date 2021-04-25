import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { timePickerLight } from '../../time-picker/styles'
import commonVars from './_common'
import { changeColor } from 'seemly'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    hoverColor,
    fontSize,
    textColor2,
    textColorDisabled,
    popoverColor,
    primaryColor,
    borderRadiusSmall,
    iconColor,
    iconColorDisabled,
    textColor1,
    dividerColor,
    boxShadow2,
    borderRadius,
    fontWeightStrong
  } = vars
  return {
    ...commonVars,
    itemFontSize: fontSize,
    calendarDaysFontSize: fontSize,
    calendarTitleFontSize: fontSize,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemTextColorActive: popoverColor,
    itemTextColorCurrent: primaryColor,
    itemColorIncluded: changeColor(primaryColor, { alpha: 0.1 }),
    itemColorHover: hoverColor,
    itemColorDisabled: hoverColor,
    itemColorActive: primaryColor,
    itemBorderRadius: borderRadiusSmall,
    panelColor: popoverColor,
    panelTextColor: textColor2,
    arrowColor: iconColor,
    calendarTitleTextColor: textColor1,
    calendarDaysTextColor: textColor2,
    panelHeaderDividerColor: dividerColor,
    calendarDaysDividerColor: dividerColor,
    calendarDividerColor: dividerColor,
    panelActionDividerColor: dividerColor,
    panelBoxShadow: boxShadow2,
    panelBorderRadius: borderRadius,
    calendarTitleFontWeight: fontWeightStrong,
    iconColor,
    iconColorDisabled
  }
}

export type DatePickerThemeVars = ReturnType<typeof self>

const datePickerLight = createTheme({
  name: 'DatePicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    TimePicker: timePickerLight
  },
  self
})

export default datePickerLight
export type DatePickerTheme = typeof datePickerLight
