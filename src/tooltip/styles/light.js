import { commonLight } from '../../_styles/new-common'
import { popoverLight } from '../../popover/styles'
import commonVars from './_common'

export default {
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self (vars) {
    const { borderRadius, boxShadow2, baseColor } = vars
    return {
      ...commonVars,
      borderRadius: borderRadius,
      boxShadow: boxShadow2,
      color: 'rgba(0, 0, 0, .85)',
      textColor: baseColor
    }
  }
}
