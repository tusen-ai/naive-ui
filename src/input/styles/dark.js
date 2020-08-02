import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/input'
import { changeColor } from '../../_utils/color/index'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Input',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      quaternaryTextOverlayColor,
      quinaryTextOverlayColor,
      quinaryOpacity,
      quaternaryOpacity,
      primaryColor,
      primaryHoverColor,
      inputBackgroundOverlayColor,
      disabledInputBackgroundOverlayColor,
      warningColor,
      warningHoverColor,
      errorColor,
      errorHoverColor,
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
        textColor: secondaryTextOverlayColor,
        textColorDisabled: quaternaryTextOverlayColor,
        caretColor: primaryColor,
        placeholderColor: quaternaryTextOverlayColor,
        placeholderColorDisabled: quinaryTextOverlayColor,
        backgroundColor: inputBackgroundOverlayColor,
        colorDisabled: disabledInputBackgroundOverlayColor,
        colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
        iconColor: baseTextColor,
        iconColorDisabled: baseTextColor,
        iconOpacity: quaternaryOpacity,
        iconOpacityDisabled: quinaryOpacity,
        borderMaskColor: 'transparent',
        borderMaskColorHover: primaryHoverColor,
        borderMaskColorDisabled: 'transparent !important',
        borderMaskColorFocus: primaryHoverColor,
        borderMaskBoxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
        boxShadow: 'inset 0 0 0 1px transparent',
        boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
        boxShadowDisabled: 'inset 0 0 0 1px transparent'
      },
      warning: {
        borderMaskColor: 'transparent',
        borderMaskColorHover: warningHoverColor,
        colorFocus: changeColor(warningColor, { alpha: 0.1 }),
        borderMaskColorFocus: warningHoverColor,
        borderMaskBoxShadowFocus: `0 0 8px 0 ${changeColor(warningColor, { alpha: 0.3 })}`,
        caretColor: warningColor
      },
      error: {
        borderMaskColor: 'transparent',
        borderMaskColorHover: errorHoverColor,
        colorFocus: changeColor(errorColor, { alpha: 0.1 }),
        borderMaskColorFocus: errorHoverColor,
        borderMaskBoxShadowFocus: `0 0 8px 0 ${changeColor(errorColor, { alpha: 0.3 })}`,
        caretColor: errorColor
      }
    }
  }
})
