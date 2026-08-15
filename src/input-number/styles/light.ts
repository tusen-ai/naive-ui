import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'

function self(vars: ThemeCommonVars) {
  const { textColorDisabled } = vars
  return {
    iconColorDisabled: textColorDisabled
  }
}

export interface InputNumberThemeVars extends ReturnType<typeof self> {}

const inputNumberLight: InputNumberTheme = createTheme({
  name: 'InputNumber',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Input: inputLight
  },
  self
})

export interface InputNumberTheme extends Theme<
  'InputNumber',
  InputNumberThemeVars,
  {
    Button: ButtonTheme
    Input: InputTheme
  }
> {}

export interface InputNumberThemeOverrides extends ExtractThemeOverrides<InputNumberTheme> {}

export default inputNumberLight
