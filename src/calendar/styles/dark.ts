import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { CalendarTheme } from './light'
import { changeColor } from 'seemly'

const calendarDark: CalendarTheme = {
  name: 'Calendar',
  common: commonDark,
  self (vars) {
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
      titleTextColor: textColor1,
      titleFontWeight: fontWeightStrong,
      dayTextColor: textColorDisabled,
      fontSize,
      lineHeight,
      dateColorCurrent: primaryColor,
      dateTextColorCurrent: baseColor,
      cellColorHover: hoverColor,
      cellColorActive: changeColor(primaryColor, { alpha: 0.12 })
    }
  }
}

export default calendarDark
