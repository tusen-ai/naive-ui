import { iconDark } from '../../icon/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'InputNumber',
  common: commonDark,
  peers: {
    Icon: iconDark,
    Button: buttonDark
  },
  self (vars) {
    const { textColorDisabled } = vars
    return {
      iconColorDisabled: textColorDisabled
    }
  }
}
