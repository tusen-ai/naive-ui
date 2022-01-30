import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'
import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'

export const self = (vars: ThemeCommonVars) => {
  const {
    fontSize,
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    borderColor,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor
  } = vars
  return {
    panelFontSize: fontSize,
    boxShadow: boxShadow2,
    color: popoverColor,
    textColor: textColor2,
    borderRadius,
    border: `1px solid ${borderColor}`,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor
  }
}

export type GradientPickerThemeVars = ReturnType<typeof self>

const gradientPickerLight = createTheme({
  name: 'GradientPicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight
  },
  self
})

export default gradientPickerLight
export type GradientPickerTheme = typeof gradientPickerLight
