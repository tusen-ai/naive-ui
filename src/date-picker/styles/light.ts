import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import type { TimePickerTheme } from '../../time-picker/styles'
import { changeColor } from 'seemly'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { timePickerLight } from '../../time-picker/styles'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
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
    calendarTitleColorHover: hoverColor,
    calendarDaysTextColor: textColor2,
    panelHeaderDividerColor: dividerColor,
    calendarDaysDividerColor: dividerColor,
    calendarDividerColor: dividerColor,
    panelActionDividerColor: dividerColor,
    panelBoxShadow: boxShadow2,
    panelBorderRadius: borderRadius,
    calendarTitleFontWeight: fontWeightStrong,
    scrollItemBorderRadius: borderRadius,
    iconColor,
    iconColorDisabled
  }
}

export interface DatePickerThemeVars extends ReturnType<typeof self> {}

const datePickerLight: DatePickerTheme = createTheme({
  name: 'DatePicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    TimePicker: timePickerLight,
    Scrollbar: scrollbarLight
  },
  self
})

export interface DatePickerTheme extends Theme<
  'DatePicker',
  DatePickerThemeVars,
  {
    Input: InputTheme
    Button: ButtonTheme
    TimePicker: TimePickerTheme
    Scrollbar: ScrollbarTheme
  }
> {}

export interface DatePickerThemeOverrides extends ExtractThemeOverrides<DatePickerTheme> {}

export default datePickerLight
