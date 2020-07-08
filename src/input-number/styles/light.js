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
      actionBackgroundColor: buttonBackgroundColor,
      disabledInputBackgroundColor: disabledBackgroundColor,
      disabledTextColor,
      placeholdeColor,
      quinaryTextColor: disabledPlaceholderColor,
      inputBackgroundColor: backgroundColor
    } = derived
    const borderHoverColor = primaryHoverColor
    const buttonTextColor = textColor
    const disabledButtonBackgroundColor = disabledBackgroundColor
    const disabledButtonTextColor = disabledTextColor
    const hoverButtonBackgroundColor = buttonBackgroundColor
    const activeButtonBackgroundColor = buttonBackgroundColor
    const caretColor = null
    const hoverButtonTextColor = primaryHoverColor
    const activeButtonTextColor = primaryActiveColor
    const focusBackgroundColor = backgroundColor
    return {
      ...inputCommonVariables,
      ...inputNumberCommonVariables,
      borderRadius,
      default: {
        disabledButtonBackgroundColor,
        disabledButtonTextColor,
        disabledPlaceholderColor,
        disabledBackgroundColor,
        disabledTextColor,
        textColor,
        borderColor,
        borderHoverColor,
        buttonBackgroundColor,
        hoverButtonBackgroundColor,
        activeButtonBackgroundColor,
        buttonTextColor,
        hoverButtonTextColor,
        activeButtonTextColor,
        caretColor,
        backgroundColor,
        focusBackgroundColor,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${primaryHoverColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${primaryHoverColor}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${warningHoverColor}, 0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${warningHoverColor}`,
        focusBackgroundColor,
        caretColor: warningHoverColor,
        hoverButtonTextColor: warningHoverColor,
        activeButtonTextColor: warningActiveColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${errorHoverColor}, 0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${errorHoverColor}`,
        focusBackgroundColor,
        caretColor: errorHoverColor,
        hoverButtonTextColor: errorHoverColor,
        activeButtonTextColor: errorActiveColor
      }
    }
  }
})
