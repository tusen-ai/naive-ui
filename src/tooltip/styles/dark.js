import { commonDark } from '../../_styles/new-common'
import { popoverDark } from '../../popover/styles'
import commonVars from './_common'

export default {
  name: 'Tooltip',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self (vars) {
    const { borderRadius, boxShadow2, popoverColor, textColor2Overlay } = vars
    return {
      ...commonVars,
      borderRadius: borderRadius,
      boxShadow: boxShadow2,
      color: popoverColor,
      textColor: textColor2Overlay
    }
  }
}
