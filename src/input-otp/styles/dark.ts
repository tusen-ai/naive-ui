import type { InputOtpTheme } from './light'
import { commonDark } from '../../_styles/common'
import { inputDark } from '../../input/styles'
import { self } from './light'

const inputOtpDark: InputOtpTheme = {
  name: 'InputOtp',
  common: commonDark,
  peers: {
    Input: inputDark
  },
  self
}

export default inputOtpDark
