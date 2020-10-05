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
      textColorSecondary: textColor,
      actionColor: buttonColor,
      inputColorDisabled: colorDisabled,
      textColorDisabled,
      placeholdeColor,
      textColorQuinary: placeholderColorDisabled,
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
      default: {
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
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${primaryColorHover}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${primaryColorHover}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${warningColorHover}, 0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${warningColorHover}`,
        colorFocus,
        caretColor: warningColorHover,
        buttonTextColorHover: warningColorHover,
        buttonTextColorActive: warningColorPressed
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${errorColorHover}, 0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${errorColorHover}`,
        colorFocus,
        caretColor: errorColorHover,
        buttonTextColorHover: errorColorHover,
        buttonTextColorActive: errorColorPressed
      }
    }
  }
})
