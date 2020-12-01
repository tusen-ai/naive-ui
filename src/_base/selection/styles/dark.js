import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
import suffixStyle from '../../suffix/styles/light'

export default create({
  name: 'BaseSelection',
  theme: 'dark',
  peer: [suffixStyle],
  getDerivedVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      // default
      textColor: vars.textColor2Overlay,
      textColorDisabled: vars.textColor4Overlay,
      placeholderColor: vars.textColor4Overlay,
      placeholderColorDisabled: vars.textColor5Overlay,
      color: vars.inputColorOverlay,
      colorDisabled: vars.inputColorDisabledOverlay,
      colorActive: changeColor(vars.primaryColor, { alpha: 0.1 }),
      border: '1px solid transparent',
      borderHover: `1px solid ${vars.primaryColorHover}`,
      borderActive: `1px solid ${vars.primaryColor}`,
      borderFocus: `1px solid ${vars.primaryColorHover}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 8px 0 ${changeColor(vars.primaryColor, { alpha: 0.4 })}`,
      boxShadowFocus: null,
      caretColor: vars.primaryColor,
      // warning
      borderWarning: `1px solid ${vars.warningColor}`,
      borderHoverWarning: `1px solid ${vars.warningColorHover}`,
      borderActiveWarning: `1px solid ${vars.warningColor}`,
      borderFocusWarning: `1px solid ${vars.warningColorHover}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: ` 0 0 8px 0 ${changeColor(vars.warningColor, { alpha: 0.4 })}`,
      boxShadowFocusWarning: null,
      colorActiveWarning: changeColor(vars.warningColor, { alpha: 0.1 }),
      caretColorWarning: vars.warningColor,
      // error
      borderError: `1px solid ${vars.errorColor}`,
      borderHoverError: `1px solid ${vars.errorColorHover}`,
      borderActiveError: `1px solid ${vars.errorColor}`,
      borderFocusError: `1px solid ${vars.errorColorHover}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 8px 0 ${changeColor(vars.errorColor, { alpha: 0.4 })}`,
      boxShadowFocusError: null,
      colorActiveError: changeColor(vars.errorColor, { alpha: 0.1 }),
      caretColorError: vars.errorColor
    }
  }
})
