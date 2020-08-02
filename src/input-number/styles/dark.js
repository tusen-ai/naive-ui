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
      disabledInputBackgroundOverlayColor: colorDisabled,
      textColorDisabled,
      placeholdeColor,
      placeholderColorDisabled,
      actionBackgroundOverlayColor
    } = derived
    const color = inputBackgroundOverlayColor
    const borderColorHover = primaryHoverColor
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColor = actionBackgroundOverlayColor
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryHoverColor
    const buttonTextColorActive = primaryActiveColor
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
        borderColor: 'transparent',
        borderColorHover,
        buttonColor,
        buttonColorHover,
        buttonColorActive,
        buttonTextColor,
        buttonTextColorHover,
        buttonTextColorActive,
        caretColor,
        color,
        colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${primaryHoverColor}, 0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${primaryHoverColor}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${warningHoverColor}, 0 0 8px 0 ${changeColor(warningColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${warningHoverColor}`,
        colorFocus: changeColor(warningColor, { alpha: 0.1 }),
        caretColor: warningHoverColor,
        buttonTextColorHover: warningHoverColor,
        buttonTextColorActive: warningActiveColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${errorHoverColor}, 0 0 8px 0 ${changeColor(errorColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${errorHoverColor}`,
        colorFocus: changeColor(errorColor, { alpha: 0.1 }),
        caretColor: errorHoverColor,
        buttonTextColorHover: errorHoverColor,
        buttonTextColorActive: errorActiveColor
      }
    }
  }
})
