import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'
import { inputLight } from '../../input/styles'

const self = (vars: ThemeCommonVars) => {
  const {
    fontSize,
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    borderColor
  } = vars
  return {
    fontSize,
    boxShadow: boxShadow2,
    color: popoverColor,
    textColor: textColor2,
    borderRadius,
    border: `1px solid ${borderColor}`
  }
}

export type ColorPickerThemeVars = ReturnType<typeof self>

const colorPickerLight = createTheme({
  name: 'ColorPicker',
  common: commonLight,
  peers: {
    Input: inputLight
  },
  self
})

export default colorPickerLight
export type ColorPickerTheme = typeof colorPickerLight
