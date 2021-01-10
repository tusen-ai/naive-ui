import commonVars from './_common'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/new-common'
import { buttonDark } from '../../button/styles'

export default {
  name: 'TimePicker',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark
  },
  self (vars) {
    const {
      modalColor,
      textColor2Overlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled,
      boxShadow2,
      borderRadius,
      iconColor,
      iconColorDisabled
    } = vars
    return {
      ...commonVars,
      panelColor: modalColor,
      panelBoxShadow: boxShadow2,
      panelDividerColor: dividerColorOverlay,
      itemTextColor: textColor2Overlay,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemOpacityDisabled: opacityDisabled,
      borderRadius,
      iconColor,
      iconColorDisabled
    }
  }
}
