import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../../_utils/color/index.js'
import suffixStyle from '../../suffix/styles/light'

export default create({
  name: 'BaseSelection',
  theme: 'dark',
  peer: [suffixStyle],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      // default
      textColor: derived.textColor2Overlay,
      textColorDisabled: derived.textColor4Overlay,
      placeholderColor: derived.textColor4Overlay,
      placeholderColorDisabled: derived.textColor5Overlay,
      color: derived.inputColorOverlay,
      colorDisabled: derived.inputColorDisabledOverlay,
      colorActive: changeColor(derived.primaryColor, { alpha: 0.1 }),
      borderColor: 'transparent',
      boxShadowHover: `inset 0 0 0 1px ${derived.primaryColorHover}`,
      boxShadowActive: `inset 0 0 0 1px ${derived.primaryColorHover}, 0 0 8px 0 ${changeColor(derived.primaryColor, { alpha: 0.4 })}`,
      boxShadowFocus: `inset 0 0 0 1px ${derived.primaryColorHover}`,
      caretColor: derived.primaryColor,
      // warning
      borderColorWarning: derived.warningColor,
      boxShadowHoverWarning: `inset 0 0 0 1px ${derived.warningColorHover}`,
      boxShadowActiveWarning: `inset 0 0 0 1px ${derived.warningColorHover}, 0 0 8px 0 ${changeColor(derived.warningColor, { alpha: 0.4 })}`,
      boxShadowFocusWarning: `inset 0 0 0 1px ${derived.warningColorHover}`,
      colorActiveWarning: changeColor(derived.warningColor, { alpha: 0.1 }),
      caretColorWarning: derived.warningColor,
      // error
      borderColorError: derived.errorColor,
      boxShadowHoverError: `inset 0 0 0 1px ${derived.errorColorHover}`,
      boxShadowActiveError: `inset 0 0 0 1px ${derived.errorColorHover}, 0 0 8px 0 ${changeColor(derived.errorColor, { alpha: 0.4 })}`,
      boxShadowFocusError: `inset 0 0 0 1px ${derived.errorColorHover}`,
      colorActiveError: changeColor(derived.errorColor, { alpha: 0.1 }),
      caretColorError: derived.errorColor
    }
  }
})
