import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { inputLight } from '../../input/styles'

export function self() {
  return {
    inputWidthSmall: '24px',
    inputWidthMedium: '30px',
    inputWidthLarge: '36px',
    gapSmall: '8px',
    gapMedium: '8px',
    gapLarge: '8px'
  }
}

const inputOtpLight = createTheme({
  name: 'InputOtp',
  common: commonLight,
  peers: {
    Input: inputLight
  },
  self
})

export default inputOtpLight
export type InputOtpTheme = typeof inputOtpLight
