import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'
import inputCommonVariables from '../../styles/_common-style/input'
import inputNumberCommonVariables from '../../styles/_common-style/input-number'

export default create({
  name: 'InputNumber',
  theme: 'dark',
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
      secondaryTextColor: textColor,
      inputBackgroundOverlayColor,
      disabledInputBackgroundOverlayColor: disabledBackgroundColor,
      disabledTextColor,
      placeholdeColor,
      disabledPlaceholderColor,
      actionBackgroundOverlayColor
    } = derived
    const backgroundColor = inputBackgroundOverlayColor
    const borderHoverColor = primaryHoverColor
    const buttonTextColor = textColor
    const disabledButtonBackgroundColor = disabledBackgroundColor
    const disabledButtonTextColor = disabledTextColor
    const buttonBackgroundColor = actionBackgroundOverlayColor
    const hoverButtonBackgroundColor = buttonBackgroundColor
    const activeButtonBackgroundColor = buttonBackgroundColor
    const caretColor = null
    const hoverButtonTextColor = primaryHoverColor
    const activeButtonTextColor = primaryActiveColor
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
        borderColor: 'transparent',
        borderHoverColor,
        buttonBackgroundColor,
        hoverButtonBackgroundColor,
        activeButtonBackgroundColor,
        buttonTextColor,
        hoverButtonTextColor,
        activeButtonTextColor,
        caretColor,
        backgroundColor,
        focusBackgroundColor: changeColor(primaryColor, { alpha: 0.1 }),
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${primaryHoverColor}, 0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${primaryHoverColor}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${warningHoverColor}, 0 0 8px 0 ${changeColor(warningColor, { alpha: 0.2 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${warningHoverColor}`,
        focusBackgroundColor: changeColor(warningColor, { alpha: 0.1 }),
        caretColor: warningHoverColor,
        hoverButtonTextColor: warningHoverColor,
        activeButtonTextColor: warningActiveColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${errorHoverColor}, 0 0 8px 0 ${changeColor(errorColor, { alpha: 0.2 })}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${errorHoverColor}`,
        focusBackgroundColor: changeColor(errorColor, { alpha: 0.1 }),
        caretColor: errorHoverColor,
        hoverButtonTextColor: errorHoverColor,
        activeButtonTextColor: errorActiveColor
      }
    }
  }
})
