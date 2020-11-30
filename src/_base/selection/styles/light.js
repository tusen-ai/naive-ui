import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
import suffixStyle from '../../suffix/styles/dark'

export default create({
  name: 'BaseSelection',
  theme: 'light',
  peer: [suffixStyle],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      // default
      textColor: derived.textColor2,
      textColorDisabled: derived.textColor4,
      placeholderColor: derived.textColor4,
      placeholderColorDisabled: derived.textColor5,
      color: derived.inputColor,
      colorDisabled: derived.inputColorDisabled,
      colorActive: derived.inputColor,
      border: `1px solid ${derived.borderColor}`,
      borderHover: `1px solid ${derived.primaryColorHover}`,
      borderActive: `1px solid ${derived.primaryColor}`,
      borderFocus: `1px solid ${derived.primaryColorHover}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 0 2px ${changeColor(derived.primaryColor, { alpha: 0.2 })}`,
      boxShadowFocus: null,
      caretColor: derived.primaryColor,
      // warning
      borderWarning: `1px solid ${derived.warningColor}`,
      borderHoverWarning: `1px solid ${derived.warningColorHover}`,
      borderActiveWarning: `1px solid ${derived.warningColor}`,
      borderFocusWarning: `1px solid ${derived.warningColorHover}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: `0 0 0 2px ${changeColor(derived.warningColor, { alpha: 0.2 })}`,
      boxShadowFocusWarning: null,
      colorActiveWarning: derived.inputColor,
      caretColorWarning: derived.warningColor,
      // error
      borderError: `1px solid ${derived.errorColor}`,
      borderHoverError: `1px solid ${derived.errorColorHover}`,
      borderActiveError: `1px solid ${derived.errorColor}`,
      borderFocusError: `1px solid ${derived.errorColorHover}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 0 2px ${changeColor(derived.errorColor, { alpha: 0.2 })}`,
      boxShadowFocusError: null,
      colorActiveError: derived.inputColor,
      caretColorError: derived.errorColor
    }
  }
})
