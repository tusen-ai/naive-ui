import type { DynamicInputTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import commonVariables from './_common'

const dynamicInputDark: DynamicInputTheme = {
  name: 'DynamicInput',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self() {
    return commonVariables
  }
}

export default dynamicInputDark
