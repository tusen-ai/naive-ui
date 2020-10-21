import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../../_utils/color/index.js'
import suffixStyle from '../../suffix/styles/light'

export default create({
  name: 'BaseSelection',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      default: {
        textColor: derived.textColor2Overlay,
        textColorDisabled: derived.textColor4Overlay,
        placeholderColor: derived.textColor4Overlay,
        placeholderColorDisabled: derived.textColor5Overlay,
        backgroundColor: derived.inputColorOverlay,
        disabledBackgroundColor: derived.inputColorDisabledOverlay,
        activeBackgroundColor: changeColor(derived.primaryColor, { alpha: 0.1 }),
        borderMaskBoxShadow: 'inset 0 0 0 1px transparent',
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}, 0 0 8px 0 ${changeColor(derived.primaryColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}`,
        disabled: 'inset 0 0 0 1px transparent',
        boxShadow: 'none',
        disabledBoxShadow: 'none',
        caretColor: derived.primaryColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}, 0 0 8px 0 ${changeColor(derived.warningColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}`,
        activeBackgroundColor: changeColor(derived.warningColor, { alpha: 0.1 }),
        caretColor: derived.warningColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}, 0 0 8px 0 ${changeColor(derived.errorColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}`,
        activeBackgroundColor: changeColor(derived.errorColor, { alpha: 0.1 }),
        caretColor: derived.errorColor
      }
    }
  }
})
