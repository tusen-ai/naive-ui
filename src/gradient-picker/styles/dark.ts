import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import type { GradientPickerTheme } from './light'
import { self } from './light'

const gradientPickerDark: GradientPickerTheme = {
  name: 'GradientPicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self
}

export default gradientPickerDark
