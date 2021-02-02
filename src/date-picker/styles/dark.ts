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
      hoverColorOverlay,
      fontSize,
      textColorDisabledOverlay,
      textColor2Overlay,
      textColor1Overlay,
      popoverColor,
      primaryColor,
      borderRadiusSmall,
      iconColorOverlay,
      iconColorDisabledOverlay,
      dividerColorOverlay,
      boxShadow2,
      borderRadius,
      fontWeightStrong
    } = vars
    return {
      ...commonVars,
      itemFontSize: fontSize,
      calendarDaysFontSize: fontSize,
      calendarTitleFontSize: fontSize,
      itemTextColor: textColor2Overlay,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemTextColorActive: popoverColor,
      itemTextColorCurrent: primaryColor,
      itemColorDisabled: composite(popoverColor, hoverColorOverlay),
      itemColorIncluded: changeColor(primaryColor, { alpha: 0.15 }),
      itemColorHover: composite(popoverColor, hoverColorOverlay),
      itemColorActive: primaryColor,
      itemBorderRadius: borderRadiusSmall,
      panelColor: popoverColor,
      panelTextColor: textColor2Overlay,
      arrowColor: iconColorOverlay,
      calendarTitleTextColor: textColor1Overlay,
      calendarDaysTextColor: textColor2Overlay,
      panelHeaderDividerColor: dividerColorOverlay,
      calendarDaysDividerColor: dividerColorOverlay,
      calendarDividerColor: dividerColorOverlay,
      panelActionDividerColor: dividerColorOverlay,
      panelBorderRadius: borderRadius,
      panelBoxShadow: boxShadow2,
      calendarTitleFontWeight: fontWeightStrong,
      iconColor: iconColorOverlay,
      iconColorDisabled: iconColorDisabledOverlay
    }
  }
}

export default datePickerDark
