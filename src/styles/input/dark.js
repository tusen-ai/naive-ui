import create from '../_utils/create-component-base'
import commonVariables from '../_common-style/input'
import { changeColor } from '../../_utils/color/index'

export default create({
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      quaternaryTextOverlayColor,
      quinaryTextColor,
      quaternaryTextColor,
      primaryColor,
      primaryHoverColor,
      inputBackgroundOverlayColor,
      disabledInputBackgroundOverlayColor,
      warningColor,
      warningHoverColor,
      errorColor,
      errorHoverColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      iconSize: '16px',
      default: {
        textColor: secondaryTextOverlayColor,
        disabledTextColor: quaternaryTextOverlayColor,
        caretColor: primaryColor,
        placeholderColor: quaternaryTextOverlayColor,
        disabledPlaceholderColor: quinaryTextColor,
        backgroundColor: inputBackgroundOverlayColor,
        disabledBackgroundColor: disabledInputBackgroundOverlayColor,
        focusBackgroundColor: changeColor(primaryColor, { alpha: 0.1 }),
        iconColor: quaternaryTextColor,
        disabledIconColor: quinaryTextColor,
        borderMaskColor: 'transparent',
        hoverBorderMaskColor: primaryHoverColor,
        disabledBorderMaskColor: 'transparent !important',
        focusBorderMaskColor: primaryHoverColor,
        focusBorderMaskBoxShadow: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.4 })}`,
        boxShadow: 'inset 0 0 0 1px transparent',
        focusBoxShadow: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.4 })}`,
        disabledBoxShadow: 'inset 0 0 0 1px transparent'
      },
      warning: {
        borderMaskColor: 'transparent',
        hoverBorderMaskColor: warningHoverColor,
        focusBackgroundColor: changeColor(warningColor, { alpha: 0.1 }),
        focusBorderMaskColor: warningHoverColor,
        focusBorderMaskBoxShadow: `0 0 8px 0 ${changeColor(warningColor, { alpha: 0.4 })}`,
        caretColor: warningColor
      },
      error: {
        borderMaskColor: 'transparent',
        hoverBorderMaskColor: errorHoverColor,
        focusBackgroundColor: changeColor(errorColor, { alpha: 0.1 }),
        focusBorderMaskColor: errorHoverColor,
        focusBorderMaskBoxShadow: `0 0 8px 0 ${changeColor(errorColor, { alpha: 0.4 })}`,
        caretColor: errorColor
      }
    }
  }
})
