import { changeColor, scaleColor } from 'seemly'
import { commonDark } from '../../../_styles/new-common'
import commonVars from './_common'
import type { BaseSelectionTheme } from './light'

const baseSelectionDark: BaseSelectionTheme = {
  name: 'BaseSelection',
  common: commonDark,
  self (vars) {
    const {
      borderRadius,
      textColor2Overlay,
      textColor4Overlay,
      textColor5Overlay,
      inputColorOverlay,
      inputColorDisabledOverlay,
      primaryColor,
      primaryColorHover,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      iconColorOverlay,
      iconColorDisabledOverlay
    } = vars
    return {
      ...commonVars,
      borderRadius: borderRadius,
      // default
      textColor: textColor2Overlay,
      textColorDisabled: textColor4Overlay,
      placeholderColor: textColor4Overlay,
      placeholderColorDisabled: textColor5Overlay,
      color: inputColorOverlay,
      colorDisabled: inputColorDisabledOverlay,
      colorActive: changeColor(primaryColor, { alpha: 0.1 }),
      border: '1px solid transparent',
      borderHover: `1px solid ${primaryColorHover}`,
      borderActive: `1px solid ${primaryColor}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.4
      })}`,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.4
      })}`,
      caretColor: primaryColor,
      arrowColor: iconColorOverlay,
      arrowColorDisabled: iconColorDisabledOverlay,
      loadingColor: primaryColor,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      borderActiveWarning: `1px solid ${warningColor}`,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.4
      })}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.4
      })}`,
      colorActiveWarning: changeColor(warningColor, { alpha: 0.1 }),
      caretColorWarning: warningColor,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      borderActiveError: `1px solid ${errorColor}`,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.4
      })}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.4
      })}`,
      colorActiveError: changeColor(errorColor, { alpha: 0.1 }),
      caretColorError: errorColor,
      clearColor: textColor4Overlay,
      clearColorHover: scaleColor(textColor4Overlay, { alpha: 1.25 }),
      clearColorPressed: scaleColor(textColor4Overlay, { alpha: 0.75 })
    }
  }
}

export default baseSelectionDark
