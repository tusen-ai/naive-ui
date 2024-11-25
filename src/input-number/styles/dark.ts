import type { InputNumberTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'

const inputNumberDark: InputNumberTheme = {
  name: 'InputNumber',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Input: inputDark
  },
  self(vars) {
    const { textColorDisabled } = vars
    return {
      iconColorDisabled: textColorDisabled
    }
  }
}

export default inputNumberDark
