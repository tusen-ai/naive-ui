import { changeColor } from 'seemly'
import { iconDark } from '../../icon/styles'
import commonVars from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'InputNumber',
  common: commonDark,
  peers: {
    Icon: iconDark
  },
  self (vars) {
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
      actionColorOverlay,
      borderRadius,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge
    } = vars
    const color = inputColorOverlay
    const buttonTextColor = textColor
    const buttonColorDisabled = colorDisabled
    const buttonTextColorDisabled = textColorDisabled
    const buttonColor = actionColorOverlay
    const buttonColorHover = buttonColor
    const buttonColorActive = buttonColor
    const caretColor = null
    const buttonTextColorHover = primaryColorHover
    const buttonTextColorPressed = primaryColorPressed
    return {
      ...commonVars,
      borderRadius,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      // default
      buttonColorDisabled,
      buttonTextColorDisabled,
      placeholderColorDisabled,
      colorDisabled,
      textColorDisabled,
      textColor,
      border: '1px solid transparent',
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
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
      placeholdeColor,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.2
      })}`,
      colorFocusWarning: changeColor(warningColor, { alpha: 0.1 }),
      caretColorWarning: warningColorHover,
      buttonTextColorHoverWarning: warningColorHover,
      buttonTextColorPressedWarning: warningColorPressed,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.2
      })}`,
      colorFocusError: changeColor(errorColor, { alpha: 0.1 }),
      caretColorError: errorColorHover,
      buttonTextColorHoverError: errorColorHover,
      buttonTextColorPressedError: errorColorPressed
    }
  }
}
