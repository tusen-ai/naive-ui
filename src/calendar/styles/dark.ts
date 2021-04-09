import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { CalendarTheme } from './light'
import { buttonDark } from '../../button/styles'

const calendarDark: CalendarTheme = {
  name: 'Calendar',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
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
      hoverColor,
      cardColor,
      modalColor
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
      cellColor: cardColor,
      cellColorModal: modalColor,
      barColor: primaryColor
    }
  }
}

export default calendarDark
