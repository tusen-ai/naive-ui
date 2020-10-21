import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../../_utils/color'
import suffixStyle from '../../suffix/styles/dark'

export default create({
  name: 'BaseSelection',
  theme: 'light',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      default: {
        textColor: derived.textColor2,
        textColorDisabled: derived.textColor4,
        placeholderColor: derived.textColor4,
        placeholderColorDisabled: derived.textColor5,
        backgroundColor: derived.inputColor,
        disabledBackgroundColor: derived.inputColorDisabled,
        activeBackgroundColor: derived.inputColor,
        borderMaskBoxShadow: 'inset 0 0 0 1px transparent',
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}, 0 0 0 2px ${changeColor(derived.primaryColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryColorHover}`,
        disabled: 'inset 0 0 0 1px transparent',
        boxShadow: `inset 0 0 0 1px ${derived.borderColor}`,
        disabledBoxShadow: `inset 0 0 0 1px ${derived.borderColor}`,
        caretColor: derived.primaryColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}, 0 0 0 2px ${changeColor(derived.warningColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColorHover}`,
        activeBackgroundColor: derived.inputColor,
        caretColor: derived.warningColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}, 0 0 0 2px ${changeColor(derived.errorColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColorHover}`,
        activeBackgroundColor: derived.inputColor,
        caretColor: derived.errorColor
      }
    }
  }
})
