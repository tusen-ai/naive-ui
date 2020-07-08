import create from '../../../styles/_utils/create-component-base'
import commonVariables from '../../../styles/_common-style/base-selection'
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
        textColor: derived.secondaryTextOverlayColor,
        disabledTextColor: derived.quaternaryTextOverlayColor,
        placeholderColor: derived.quaternaryTextOverlayColor,
        disabledPlaceholderColor: derived.quinaryTextOverlayColor,
        backgroundColor: derived.inputBackgroundOverlayColor,
        disabledBackgroundColor: derived.disabledInputBackgroundOverlayColor,
        activeBackgroundColor: changeColor(derived.primaryColor, { alpha: 0.1 }),
        borderMaskBoxShadow: 'inset 0 0 0 1px transparent',
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}, 0 0 8px 0 ${changeColor(derived.primaryColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.primaryHoverColor}`,
        disabled: 'inset 0 0 0 1px transparent',
        boxShadow: 'none',
        disabledBoxShadow: 'none',
        caretColor: derived.primaryColor
      },
      warning: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}, 0 0 8px 0 ${changeColor(derived.warningColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.warningHoverColor}`,
        activeBackgroundColor: changeColor(derived.warningColor, { alpha: 0.1 }),
        caretColor: derived.warningColor
      },
      error: {
        borderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorColor}`,
        hoverBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}`,
        activeBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}, 0 0 8px 0 ${changeColor(derived.errorColor, { alpha: 0.4 })}`,
        focusBorderMaskBoxShadow: `inset 0 0 0 1px ${derived.errorHoverColor}`,
        activeBackgroundColor: changeColor(derived.errorColor, { alpha: 0.1 }),
        caretColor: derived.errorColor
      }
    }
  }
})
