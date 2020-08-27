import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Radio',
  getDerivedVariables ({ base, derived }) {
    const {
      borderColor,
      primaryColor,
      baseBackgroundColor,
      disabledTextColor,
      disabledBackgroundColor,
      secondaryTextColor,
      disabledOpacity
    } = derived
    const {
      borderRadius
    } = base
    const borderMaskWidth = '0px'
    return {
      ...commonVariables,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      color: baseBackgroundColor,
      colorDisabled: disabledBackgroundColor,
      textColor: secondaryTextColor,
      textColorDisabled: disabledTextColor,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: borderColor,
      buttonColor: baseBackgroundColor,
      buttonColorActive: baseBackgroundColor,
      buttonTextColor: secondaryTextColor,
      buttonTextColorActive: primaryColor,
      buttonTextColorHover: primaryColor,
      disabledOpacity: disabledOpacity,
      borderMaskWidth: borderMaskWidth,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 ${borderMaskWidth} transparent`,
      buttonBorderRadius: borderRadius
    }
  }
})
