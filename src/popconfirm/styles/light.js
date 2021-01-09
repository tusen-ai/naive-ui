import { buttonLight } from '../../button/styles'
import { popoverLight } from '../../popover/styles'
import { commonLight } from '../../_styles/new-common'
import commonVars from './_common'

export default {
  name: 'Popconfirm',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Popover: popoverLight
  },
  self (vars) {
    const { fontSize, warningColor } = vars
    return {
      ...commonVars,
      fontSize,
      iconColor: warningColor
    }
  }
}
