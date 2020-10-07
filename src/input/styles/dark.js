import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color/index'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Input',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      textColorQuaternaryOverlay,
      textColorQuinaryOverlay,
      opacityQuinary,
      opacityQuaternary,
      primaryColor,
      primaryColorHover,
      inputColorOverlay,
      inputColorDisabledOverlay,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      textColorBase
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      iconSize: '16px',
      textColor: textColorSecondaryOverlay,
      textColorDisabled: textColorQuaternaryOverlay,
      caretColor: primaryColor,
      placeholderColor: textColorQuaternaryOverlay,
      placeholderColorDisabled: textColorQuinaryOverlay,
      backgroundColor: inputColorOverlay,
      colorDisabled: inputColorDisabledOverlay,
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      iconColor: textColorBase,
      iconColorDisabled: textColorBase,
      iconOpacity: opacityQuaternary,
      iconOpacityDisabled: opacityQuinary,
      borderMaskColor: 'transparent',
      borderMaskColorHover: primaryColorHover,
      borderMaskColorDisabled: 'transparent !important',
      borderMaskColorFocus: primaryColorHover,
      borderMaskBoxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
      boxShadow: 'inset 0 0 0 1px transparent',
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      boxShadowDisabled: 'inset 0 0 0 1px transparent',
      // warning
      borderMaskColorWarning: 'transparent',
      borderMaskColorWarningHover: warningColorHover,
      colorWarningFocus: changeColor(warningColor, { alpha: 0.1 }),
      borderMaskColorWarningFocus: warningColorHover,
      borderMaskBoxShadowWarningFocus: `0 0 8px 0 ${changeColor(warningColor, { alpha: 0.3 })}`,
      caretColorWarning: warningColor,
      // error
      borderMaskColorError: 'transparent',
      borderMaskColorErrorHover: errorColorHover,
      colorErrorFocus: changeColor(errorColor, { alpha: 0.1 }),
      borderMaskColorErrorFocus: errorColorHover,
      borderMaskBoxShadowErrorFocus: `0 0 8px 0 ${changeColor(errorColor, { alpha: 0.3 })}`,
      caretColorError: errorColor
    }
  }
})
