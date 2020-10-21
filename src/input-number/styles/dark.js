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
      textColor2: textColor,
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
      // default
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
      placeholdeColor,
      // warning
      borderMaskBoxShadowWarning: `inset 0 0 0 1px ${warningColor}`,
      borderMaskBoxShadowWarningFocus: `inset 0 0 0 1px ${warningColorHover}, 0 0 8px 0 ${changeColor(warningColor, { alpha: 0.2 })}`,
      borderMaskBoxShadowWarningHover: `inset 0 0 0 1px ${warningColorHover}`,
      colorWarningFocus: changeColor(warningColor, { alpha: 0.1 }),
      caretColorWarning: warningColorHover,
      buttonTextColorWarningHover: warningColorHover,
      buttonTextColorWarningActive: warningColorPressed,
      // error
      borderMaskBoxShadowError: `inset 0 0 0 1px ${errorColor}`,
      borderMaskBoxShadowErrorFocus: `inset 0 0 0 1px ${errorColorHover}, 0 0 8px 0 ${changeColor(errorColor, { alpha: 0.2 })}`,
      borderMaskBoxShadowErrorHover: `inset 0 0 0 1px ${errorColorHover}`,
      colorErrorFocus: changeColor(errorColor, { alpha: 0.1 }),
      caretColorError: errorColorHover,
      buttonTextColorErrorHover: errorColorHover,
      buttonTextColorErrorActive: errorColorPressed
    }
  }
})
