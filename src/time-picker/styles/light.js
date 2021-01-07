import commonVars from './_common'
import { iconLight } from '../../icon/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'TimePicker',
  common: commonLight,
  peers: {
    Icon: iconLight,
    Scrollbar: scrollbarDark
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
      borderRadius
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
      borderRadius
    }
  }
}
