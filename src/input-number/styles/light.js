import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import inputCommonVariables from '../../input/styles/_common'
import inputNumberCommonVariables from './_common'

export default create({
  name: 'InputNumber',
  theme: 'light',
  getDerivedVars (vars) {
    const {
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      errorColor,
      errorColorHover,
      errorColorPressed,
      warningColor,
      warningColorHover,
      warningColorPressed,
      borderColor,
      textColor2: textColor,
      actionColor: buttonColor,
      inputColorDisabled: colorDisabled,
      textColorDisabled,
      placeholderColor,
      textColor5: placeholderColorDisabled,
      inputColor: color,
      borderRadius
    } = vars
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryColorHover
    const buttonTextColorPressed = primaryColorPressed
    const colorFocus = color
    return {
      ...inputCommonVariables,
      ...inputNumberCommonVariables,
      borderRadius,
      // default
      buttonColorDisabled,
      buttonTextColorDisabled,
      placeholderColorDisabled,
      colorDisabled,
      textColorDisabled,
      textColor,
      border: `1px solid ${borderColor}`,
      borderHover: `1px solid ${primaryColorHover}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      buttonColor,
      buttonColorHover,
      buttonColorActive,
      buttonTextColor,
      buttonTextColorHover,
      buttonTextColorPressed,
      caretColor,
      color,
      colorFocus,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      placeholderColor,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
      colorFocusWarning: colorFocus,
      caretColorWarning: warningColorHover,
      buttonTextColorHoverWarning: warningColorHover,
      buttonTextColorPressedWarning: warningColorPressed,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
      colorFocusError: colorFocus,
      caretColorError: errorColorHover,
      buttonTextColorHoverError: errorColorHover,
      buttonTextColorPressedError: errorColorPressed
    }
  }
})
