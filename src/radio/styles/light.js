import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Radio',
  getDerivedVariables ({ base, derived }) {
    const {
      borderColor,
      primaryColor,
      baseColor,
      textColorDisabled,
      disabledBackgroundColor,
      textColorSecondary,
      opacityDisabled
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      color: baseColor,
      colorDisabled: disabledBackgroundColor,
      textColor: textColorSecondary,
      textColorDisabled: textColorDisabled,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: borderColor,
      buttonColor: baseColor,
      buttonColorActive: baseColor,
      buttonTextColor: textColorSecondary,
      buttonTextColorActive: primaryColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled: opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 1px transparent`,
      buttonBoxShadow: 'inset 0 0 0 1px transparent',
      buttonBorderRadius: borderRadius
    }
  }
})
