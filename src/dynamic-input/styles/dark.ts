import { inputDark } from '../../input/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { DynamicInputTheme } from './light'

const dynamicInputDark: DynamicInputTheme = {
  name: 'DynamicInput',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self () {
    return commonVariables
  }
}

export default dynamicInputDark
