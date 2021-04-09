import { composite } from 'seemly'
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
      titleTextColor: textColor1,
      titleFontWeight: fontWeightStrong,
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
}

export default calendarDark
