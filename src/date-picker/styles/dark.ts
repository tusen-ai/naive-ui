import { changeColor, composite } from 'seemly'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { timePickerDark } from '../../time-picker/styles'
import commonVars from './_common'
import type { DatePickerTheme } from './light'

const datePickerDark: DatePickerTheme = {
  name: 'DatePicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    TimePicker: timePickerDark
  },
  self (vars) {
    const {
      hoverColor,
      fontSize,
      textColorDisabled,
      textColor2,
      textColor1,
      popoverColor,
      primaryColor,
      borderRadiusSmall,
      iconColor,
      iconColorDisabled,
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
      itemColorDisabled: composite(popoverColor, hoverColor),
      itemColorIncluded: changeColor(primaryColor, { alpha: 0.15 }),
      itemColorHover: composite(popoverColor, hoverColor),
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
      panelBorderRadius: borderRadius,
      panelBoxShadow: boxShadow2,
      calendarTitleFontWeight: fontWeightStrong,
      iconColor: iconColor,
      iconColorDisabled: iconColorDisabled
    }
  }
}

export default datePickerDark
