import { iconLight } from '../../icon/styles'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'InputNumber',
  common: commonLight,
  peers: {
    Icon: iconLight,
    Button: buttonLight
  },
  self (vars) {
    const { textColorDisabled } = vars
    return {
      iconColorDisabled: textColorDisabled
    }
  }
}
