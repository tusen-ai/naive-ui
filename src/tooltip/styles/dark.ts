import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'
import commonVars from './_common'
import type { TooltipTheme } from './light'

const tooltipDark: TooltipTheme = {
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

export default tooltipDark
