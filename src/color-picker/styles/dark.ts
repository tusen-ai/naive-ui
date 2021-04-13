import { commonDark } from '../../_styles/common'
import type { ColorPickerTheme } from './light'

const colorPickerDark: ColorPickerTheme = {
  name: 'ColorPicker',
  common: commonDark,
  self (vars) {
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
}

export default colorPickerDark
