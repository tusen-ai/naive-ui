import commonVars from './_common'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import type { TimePickerTheme } from './light'

const timePickerDark: TimePickerTheme = {
  name: 'TimePicker',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark,
    Input: inputDark
  },
  self (vars) {
    const {
      popoverColor,
      textColor2,
      primaryColor,
      hoverColor,
      dividerColor,
      opacityDisabled,
      boxShadow2,
      borderRadius,
      iconColor,
      iconColorDisabled
    } = vars
    return {
      ...commonVars,
      panelColor: popoverColor,
      panelBoxShadow: boxShadow2,
      panelDividerColor: dividerColor,
      itemTextColor: textColor2,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColor,
      itemOpacityDisabled: opacityDisabled,
      borderRadius,
      iconColor: iconColor,
      iconColorDisabled: iconColorDisabled
    }
  }
}

export default timePickerDark
