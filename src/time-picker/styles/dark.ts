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
      textColor2Overlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled,
      boxShadow2,
      borderRadius,
      iconColorOverlay,
      iconColorDisabledOverlay
    } = vars
    return {
      ...commonVars,
      panelColor: popoverColor,
      panelBoxShadow: boxShadow2,
      panelDividerColor: dividerColorOverlay,
      itemTextColor: textColor2Overlay,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemOpacityDisabled: opacityDisabled,
      borderRadius,
      iconColor: iconColorOverlay,
      iconColorDisabled: iconColorDisabledOverlay
    }
  }
}

export default timePickerDark
