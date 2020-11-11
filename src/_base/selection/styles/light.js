import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../../_utils/color'
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
      borderColor: derived.borderColor,
      boxShadowHover: `inset 0 0 0 1px ${derived.primaryColorHover}`,
      boxShadowActive: `inset 0 0 0 1px ${derived.primaryColorHover}, 0 0 0 2px ${changeColor(derived.primaryColor, { alpha: 0.2 })}`,
      boxShadowFocus: `inset 0 0 0 1px ${derived.primaryColorHover}`,
      caretColor: derived.primaryColor,
      // warning
      borderColorWarning: derived.warningColor,
      boxShadowHoverWarning: `inset 0 0 0 1px ${derived.warningColorHover}`,
      boxShadowActiveWarning: `inset 0 0 0 1px ${derived.warningColorHover}, 0 0 0 2px ${changeColor(derived.warningColor, { alpha: 0.2 })}`,
      boxShadowFocusWarning: `inset 0 0 0 1px ${derived.warningColorHover}`,
      colorActiveWarning: derived.inputColor,
      caretColorWarning: derived.warningColor,
      // error
      borderColorError: derived.errorColor,
      boxShadowHoverError: `inset 0 0 0 1px ${derived.errorColorHover}`,
      boxShadowActiveError: `inset 0 0 0 1px ${derived.errorColorHover}, 0 0 0 2px ${changeColor(derived.errorColor, { alpha: 0.2 })}`,
      boxShadowFocusError: `inset 0 0 0 1px ${derived.errorColorHover}`,
      colorActiveError: derived.inputColor,
      caretColorError: derived.errorColor
    }
  }
})
