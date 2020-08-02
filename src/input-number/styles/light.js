import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'
import inputCommonVariables from '../../styles/_common-style/input'
import inputNumberCommonVariables from '../../styles/_common-style/input-number'

export default create({
  name: 'InputNumber',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      primaryColor,
      primaryHoverColor,
      primaryActiveColor,
      errorColor,
      errorHoverColor,
      errorActiveColor,
      warningColor,
      warningHoverColor,
      warningActiveColor,
      borderColor,
      secondaryTextColor: textColor,
      actionBackgroundColor: buttonColor,
      disabledInputBackgroundColor: colorDisabled,
      textColorDisabled,
      placeholdeColor,
      quinaryTextColor: placeholderColorDisabled,
      inputBackgroundColor: color
    } = derived
    const borderColorHover = primaryHoverColor
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryHoverColor
    const buttonTextColorActive = primaryActiveColor
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
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${primaryHoverColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${primaryHoverColor}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${warningHoverColor}, 0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${warningHoverColor}`,
        colorFocus,
        caretColor: warningHoverColor,
        buttonTextColorHover: warningHoverColor,
        buttonTextColorActive: warningActiveColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${errorHoverColor}, 0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${errorHoverColor}`,
        colorFocus,
        caretColor: errorHoverColor,
        buttonTextColorHover: errorHoverColor,
        buttonTextColorActive: errorActiveColor
      }
    }
  }
})
