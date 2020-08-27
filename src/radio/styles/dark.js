import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Radio',
  getDerivedVariables ({ base, derived }) {
    const {
      borderOverlayColor,
      primaryColor,
      baseBackgroundColor,
      disabledTextOverlayColor,
      disabledBackgroundColor,
      secondaryTextOverlayColor,
      disabledOpacity
    } = derived
    const {
      borderRadius
    } = base
    const borderMaskWidth = '1px'
    return {
      ...commonVariables,
      boxShadow: `inset 0 0 0 1px ${borderOverlayColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `(inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })})`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderOverlayColor}`,
      color: 'transparent',
      colorDisabled: disabledBackgroundColor,
      textColor: secondaryTextOverlayColor,
      textColorDisabled: disabledTextOverlayColor,
      dotColorActive: primaryColor,
      dotColorDisabled: borderOverlayColor,
      buttonBorderColor: borderOverlayColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: primaryColor,
      buttonColor: 'transparent',
      buttonColorActive: primaryColor,
      buttonTextColor: secondaryTextOverlayColor,
      buttonTextColorActive: baseBackgroundColor,
      buttonTextColorHover: primaryColor,
      disabledOpacity: disabledOpacity,
      borderMaskWidth: borderMaskWidth,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 ${borderMaskWidth} ${primaryColor}`,
      buttonBorderRadius: borderRadius
    }
  }
})
