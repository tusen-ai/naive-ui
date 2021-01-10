import commonVars from './_common'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/new-common'
import { buttonDark } from '../../button/styles'

export default {
  name: 'TimePicker',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark
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
