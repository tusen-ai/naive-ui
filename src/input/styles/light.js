import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/input'
import { changeColor } from '../../_utils/color/index'
import suffixStyle from '../../_base/suffix/styles/light'

export default create({
  name: 'Input',
  theme: 'light',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      quaternaryTextColor,
      quinaryTextColor,
      primaryColor,
      primaryHoverColor,
      inputBackgroundColor,
      disabledInputBackgroundColor,
      borderColor,
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
        textColor: secondaryTextColor,
        disabledTextColor: quaternaryTextColor,
        caretColor: primaryColor,
        placeholderColor: quaternaryTextColor,
        disabledPlaceholderColor: quinaryTextColor,
        backgroundColor: inputBackgroundColor,
        disabledBackgroundColor: disabledInputBackgroundColor,
        focusBackgroundColor: inputBackgroundColor,
        iconColor: quaternaryTextColor,
        iconOpacity: 1,
        disabledIconColor: quinaryTextColor,
        disabledIconOpacity: 1,
        borderMaskColor: 'transparent',
        hoverBorderMaskColor: primaryHoverColor,
        disabledBorderMaskColor: 'transparent !important',
        focusBorderMaskColor: primaryHoverColor,
        focusBorderMaskBoxShadow: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        disabledBoxShadow: `inset 0 0 0 1px ${borderColor}`
      },
      warning: {
        borderMaskColor: warningColor,
        hoverBorderMaskColor: warningHoverColor,
        focusBackgroundColor: inputBackgroundColor,
        focusBorderMaskColor: warningHoverColor,
        focusBorderMaskBoxShadow: `0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
        caretColor: warningColor
      },
      error: {
        borderMaskColor: errorColor,
        hoverBorderMaskColor: errorHoverColor,
        focusBackgroundColor: inputBackgroundColor,
        focusBorderMaskColor: errorHoverColor,
        focusBorderMaskBoxShadow: `0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
        caretColor: errorColor
      }
    }
  }
})
