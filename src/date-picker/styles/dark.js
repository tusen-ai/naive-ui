import { changeColor } from 'seemly'
import { inputDark } from '../../input/styles'
import { iconDark } from '../../icon/styles'
import { commonDark } from '../../_styles/new-common'
import { buttonDark } from '../../button/styles'
import { timePickerDark } from '../../time-picker/styles'
import commonVars from './_common'

export default {
  name: 'DatePicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Icon: iconDark,
    Button: buttonDark,
    TimePicker: timePickerDark
  },
  self (vars) {
    const {
      fontSize,
      textColorDisabledOverlay,
      textColor2Overlay,
      textColor1Overlay,
      popoverColor,
      primaryColor,
      borderRadiusSmall,
      iconColorOverlay,
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
      itemColorHover: changeColor(primaryColor, { alpha: 0.15 }),
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
      calendarTitleFontWeight: fontWeightStrong
    }
  }
}
