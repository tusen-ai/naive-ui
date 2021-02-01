import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { textColorDisabled } = vars
  return {
    iconColorDisabled: textColorDisabled
  }
}

export type InputNumberThemeVars = ReturnType<typeof self>

const inputNumberLight = createTheme({
  name: 'InputNumber',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Input: inputLight
  },
  self
})

export default inputNumberLight
export type InputNumberTheme = typeof inputNumberLight
