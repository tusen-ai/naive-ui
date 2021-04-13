import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import type { ColorPickerTheme } from './light'

const colorPickerDark: ColorPickerTheme = {
  name: 'ColorPicker',
  common: commonDark,
  peers: {
    Input: inputDark
  },
  self (vars) {
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
      fontSizeLarge
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
      fontSizeLarge
    }
  }
}

export default colorPickerDark
