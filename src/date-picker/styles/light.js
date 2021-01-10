import { changeColor } from 'seemly'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/new-common'
import { buttonLight } from '../../button/styles'
import { timePickerLight } from '../../time-picker/styles'
import commonVars from './_common'

export default {
  name: 'DatePicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    TimePicker: timePickerLight
  },
  self (vars) {
    const {
      fontSize,
      textColor2,
      textColorDisabled,
      popoverColor,
      primaryColor,
      borderRadiusSmall,
      iconColor,
      iconColorDisabled,
      textColorPrimary,
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
      itemColorHover: changeColor(primaryColor, { alpha: 0.1 }),
      itemColorActive: primaryColor,
      itemBorderRadius: borderRadiusSmall,
      panelColor: popoverColor,
      panelTextColor: textColor2,
      arrowColor: iconColor,
      calendarTitleTextColor: textColorPrimary,
      calendarDaysTextColor: textColor2,
      panelHeaderDividerColor: dividerColor,
      calendarDaysDividerColor: dividerColor,
      calendarDividerColor: dividerColor,
      panelActionDividerColor: dividerColor,
      panelBoxShadow: boxShadow2,
      panelBorderRadius: borderRadius,
      calendarTitleFontWeight: fontWeightStrong,
      iconColor: iconColor,
      iconColorDisabled: iconColorDisabled
    }
  }
}
