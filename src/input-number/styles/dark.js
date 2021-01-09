import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'InputNumber',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self (vars) {
    const { textColorDisabled } = vars
    return {
      iconColorDisabled: textColorDisabled
    }
  }
}
