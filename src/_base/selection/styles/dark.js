import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
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
      border: '1px solid transparent',
      borderHover: `1px solid ${derived.primaryColorHover}`,
      borderActive: `1px solid ${derived.primaryColor}`,
      borderFocus: `1px solid ${derived.primaryColorHover}`,
      boxShadowHover: null,
      boxShadowActive: `0 0 8px 0 ${changeColor(derived.primaryColor, { alpha: 0.4 })}`,
      boxShadowFocus: null,
      caretColor: derived.primaryColor,
      // warning
      borderWarning: '1px solid transparent',
      borderHoverWarning: `1px solid ${derived.warningColorHover}`,
      borderActiveWarning: `1px solid ${derived.warningColor}`,
      borderFocusWarning: `1px solid ${derived.warningColorHover}`,
      boxShadowHoverWarning: null,
      boxShadowActiveWarning: ` 0 0 8px 0 ${changeColor(derived.warningColor, { alpha: 0.4 })}`,
      boxShadowFocusWarning: null,
      colorActiveWarning: changeColor(derived.warningColor, { alpha: 0.1 }),
      caretColorWarning: derived.warningColor,
      // error
      borderError: '1px solid transparent',
      borderHoverError: `1px solid ${derived.errorColorHover}`,
      borderActiveError: `1px solid ${derived.errorColor}`,
      borderFocusError: `1px solid ${derived.errorColorHover}`,
      boxShadowHoverError: null,
      boxShadowActiveError: `0 0 8px 0 ${changeColor(derived.errorColor, { alpha: 0.4 })}`,
      boxShadowFocusError: null,
      colorActiveError: changeColor(derived.errorColor, { alpha: 0.1 }),
      caretColorError: derived.errorColor
    }
  }
})
