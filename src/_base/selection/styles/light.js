import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
import suffixStyle from '../../suffix/styles/dark'

export default create({
  name: 'BaseSelection',
  theme: 'light',
  peer: [suffixStyle],
  getDerivedVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      // default
      textColor: vars.textColor2,
      textColorDisabled: vars.textColor4,
      placeholderColor: vars.textColor4,
      placeholderColorDisabled: vars.textColor5,
      color: vars.inputColor,
      colorDisabled: vars.inputColorDisabled,
      colorActive: vars.inputColor,
      border: `1px solid ${vars.borderColor}`,
      borderHover: `1px solid ${vars.primaryColorHover}`,
      borderActive: `1px solid ${vars.primaryColor}`,
      borderFocus: `1px solid ${vars.primaryColorHover}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 0 2px ${changeColor(vars.primaryColor, { alpha: 0.2 })}`,
      boxShadowFocus: null,
      caretColor: vars.primaryColor,
      // warning
      borderWarning: `1px solid ${vars.warningColor}`,
      borderHoverWarning: `1px solid ${vars.warningColorHover}`,
      borderActiveWarning: `1px solid ${vars.warningColor}`,
      borderFocusWarning: `1px solid ${vars.warningColorHover}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: `0 0 0 2px ${changeColor(vars.warningColor, { alpha: 0.2 })}`,
      boxShadowFocusWarning: null,
      colorActiveWarning: vars.inputColor,
      caretColorWarning: vars.warningColor,
      // error
      borderError: `1px solid ${vars.errorColor}`,
      borderHoverError: `1px solid ${vars.errorColorHover}`,
      borderActiveError: `1px solid ${vars.errorColor}`,
      borderFocusError: `1px solid ${vars.errorColorHover}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 0 2px ${changeColor(vars.errorColor, { alpha: 0.2 })}`,
      boxShadowFocusError: null,
      colorActiveError: vars.inputColor,
      caretColorError: vars.errorColor
    }
  }
})
