import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'
import inputCommonVariables from '../../input/styles/_common'
import inputNumberCommonVariables from './_common'

export default create({
  name: 'InputNumber',
  theme: 'dark',
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
      textColorSecondary: textColor,
      inputColorOverlay,
      inputColorDisabledOverlay: colorDisabled,
      textColorDisabled,
      placeholdeColor,
      placeholderColorDisabled,
      actionColorOverlay
    } = derived
    const color = inputColorOverlay
    const borderColorHover = primaryColorHover
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColor = actionColorOverlay
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryColorHover
    const buttonTextColorActive = primaryColorPressed
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
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${primaryColorHover}, 0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${primaryColorHover}`,
        placeholdeColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${warningColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${warningColorHover}, 0 0 8px 0 ${changeColor(warningColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${warningColorHover}`,
        colorFocus: changeColor(warningColor, { alpha: 0.1 }),
        caretColor: warningColorHover,
        buttonTextColorHover: warningColorHover,
        buttonTextColorActive: warningColorPressed
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${errorColor}`,
        borderMaskBoxShadowFocus: `inset 0 0 0 1px ${errorColorHover}, 0 0 8px 0 ${changeColor(errorColor, { alpha: 0.2 })}`,
        borderMaskBoxShadowHover: `inset 0 0 0 1px ${errorColorHover}`,
        colorFocus: changeColor(errorColor, { alpha: 0.1 }),
        caretColor: errorColorHover,
        buttonTextColorHover: errorColorHover,
        buttonTextColorActive: errorColorPressed
      }
    }
  }
})
