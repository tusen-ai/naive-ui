import { changeColor, scaleColor } from 'seemly'
import { commonLight } from '../../../_styles/new-common'
import type { ThemeCommonVars } from '../../../_styles/new-common'
import commonVariables from './_common'
import { createTheme } from '../../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    textColor2,
    textColor4,
    textColor5,
    inputColor,
    inputColorDisabled,
    primaryColor,
    primaryColorHover,
    warningColor,
    warningColorHover,
    errorColor,
    errorColorHover,
    borderColor,
    iconColor,
    iconColorDisabled
  } = vars
  return {
    ...commonVariables,
    borderRadius: borderRadius,
    // default
    textColor: textColor2,
    textColorDisabled: textColor4,
    placeholderColor: textColor4,
    placeholderColorDisabled: textColor5,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorActive: inputColor,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderActive: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    boxShadowHover: null,
    boxShadowActive: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.2
    })}`,
    caretColor: primaryColor,
    arrowColor: iconColor,
    arrowColorDisabled: iconColorDisabled,
    loadingColor: primaryColor,
    // warning
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    borderActiveWarning: `1px solid ${warningColor}`,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    boxShadowHoverWarning: null,
    boxShadowActiveWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
      alpha: 0.2
    })}`,
    colorActiveWarning: inputColor,
    caretColorWarning: warningColor,
    // error
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    borderActiveError: `1px solid ${errorColor}`,
    borderFocusError: `1px solid ${errorColorHover}`,
    boxShadowHoverError: null,
    boxShadowActiveError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
      alpha: 0.2
    })}`,
    colorActiveError: inputColor,
    caretColorError: errorColor,
    clearColor: textColor4,
    clearColorHover: scaleColor(textColor4, { lightness: 0.75 }),
    clearColorPressed: scaleColor(textColor4, { lightness: 0.9 })
  }
}

export type BaseSelectionThemeVars = ReturnType<typeof self>

const baseSelectionLight = createTheme({
  name: 'BaseSelection',
  common: commonLight,
  self
})

export default baseSelectionLight
export type BaseSelectionTheme = typeof baseSelectionLight
