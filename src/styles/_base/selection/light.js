import create from '../../_utils/create-component-base'
import commonVariables from '../../_common-style/base-selection'
import { changeColor } from '../../../_utils/color'

export default create({
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      default: {
        textColor: derived.secondaryTextColor,
        disabledTextColor: derived.quaternaryTextColor,
        placeholderColor: derived.quaternaryTextColor,
        disabledPlaceholderColor: derived.quinaryTextColor,
        backgroundColor: derived.inputBackgroundColor,
        disabledBackgroundColor: derived.disabledInputBackgroundColor,
        activeBackgroundColor: derived.inputBackgroundColor,
        borderMaskBoxShadow: 'inset 0 0 0 1px transparent',
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}, 0 0 0 2px ${changeColor(derived.primaryColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}`,
        disabled: 'inset 0 0 0 1px transparent',
        boxShadow: `inset 0 0 0 1px ${derived.borderColor}`,
        disabledBoxShadow: `inset 0 0 0 1px ${derived.borderColor}`,
        caretColor: derived.primaryColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}, 0 0 0 2px ${changeColor(derived.warningColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}`,
        activeBackgroundColor: derived.inputBackgroundColor,
        caretColor: derived.warningColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}, 0 0 0 2px ${changeColor(derived.errorColor, { alpha: 0.2 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}`,
        activeBackgroundColor: derived.inputBackgroundColor,
        caretColor: derived.errorColor
      }
    }
  }
})
