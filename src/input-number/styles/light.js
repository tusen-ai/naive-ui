import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'
import inputCommonVariables from '../../input/styles/_common'
import inputNumberCommonVariables from './_common'

export default create({
  name: 'InputNumber',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
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
      inputColor: color
    } = derived
    const borderColorHover = primaryColorHover
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryColorHover
    const buttonTextColorActive = primaryColorPressed
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
      borderColor,
      borderColorHover,
      buttonColor,
      buttonColorHover,
      buttonColorActive,
      buttonTextColor,
      buttonTextColorHover,
      buttonTextColorActive,
      caretColor,
      color,
      colorFocus,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColorHover}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColorHover}`,
      placeholderColor,
      // warning
      boxShadowWarning: `inset 0 0 0 1px ${warningColor}`,
      boxShadowFocusWarning: `inset 0 0 0 1px ${warningColorHover}, 0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
      boxShadowHoverWarning: `inset 0 0 0 1px ${warningColorHover}`,
      colorFocusWarning: colorFocus,
      caretColorWarning: warningColorHover,
      buttonTextColorHoverWarning: warningColorHover,
      buttonTextColorActiveWarning: warningColorPressed,
      // error
      boxShadowError: `inset 0 0 0 1px ${errorColor}`,
      boxShadowFocusError: `inset 0 0 0 1px ${errorColorHover}, 0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
      boxShadowHoverError: `inset 0 0 0 1px ${errorColorHover}`,
      colorFocusError: colorFocus,
      caretColorError: errorColorHover,
      buttonTextColorHoverError: errorColorHover,
      buttonTextColorActiveError: errorColorPressed
    }
  }
})
