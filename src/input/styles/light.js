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
      errorHoverColor,
      quaternaryOpacity,
      quinaryOpacity,
      baseTextColor
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
        textColorDisabled: quaternaryTextColor,
        caretColor: primaryColor,
        placeholderColor: quaternaryTextColor,
        placeholderColorDisabled: quinaryTextColor,
        backgroundColor: inputBackgroundColor,
        colorDisabled: disabledInputBackgroundColor,
        colorFocus: inputBackgroundColor,
        iconColor: baseTextColor,
        iconOpacity: quaternaryOpacity,
        iconColorDisabled: baseTextColor,
        iconOpacityDisabled: quinaryOpacity,
        borderMaskColor: 'transparent',
        borderMaskColorHover: primaryHoverColor,
        borderMaskColorDisabled: 'transparent !important',
        borderMaskColorFocus: primaryHoverColor,
        borderMaskBoxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`
      },
      warning: {
        borderMaskColor: warningColor,
        borderMaskColorHover: warningHoverColor,
        colorFocus: inputBackgroundColor,
        borderMaskColorFocus: warningHoverColor,
        borderMaskBoxShadowFocus: `0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
        caretColor: warningColor
      },
      error: {
        borderMaskColor: errorColor,
        borderMaskColorHover: errorHoverColor,
        colorFocus: inputBackgroundColor,
        borderMaskColorFocus: errorHoverColor,
        borderMaskBoxShadowFocus: `0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
        caretColor: errorColor
      }
    }
  }
})
