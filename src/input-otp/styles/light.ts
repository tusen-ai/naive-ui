import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { InputTheme } from '../../input/styles'
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

export interface InputOtpThemeVars extends ReturnType<typeof self> {}

const inputOtpLight: InputOtpTheme = createTheme({
  name: 'InputOtp',
  common: commonLight,
  peers: {
    Input: inputLight
  },
  self
})

export interface InputOtpTheme extends Theme<
  'InputOtp',
  InputOtpThemeVars,
  {
    Input: InputTheme
  }
> {}

export interface InputOtpThemeOverrides extends ExtractThemeOverrides<InputOtpTheme> {}

export default inputOtpLight
