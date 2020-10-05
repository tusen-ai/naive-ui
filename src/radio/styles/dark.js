import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Radio',
  getDerivedVariables ({ base, derived }) {
    const {
      borderColorOverlay,
      primaryColor,
      baseColor,
      textColorDisabledOverlay,
      disabledBackgroundColor,
      textColorSecondaryOverlay,
      opacityDisabled
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      boxShadow: `inset 0 0 0 1px ${borderColorOverlay}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `(inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })})`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColorOverlay}`,
      color: 'transparent',
      colorDisabled: disabledBackgroundColor,
      textColor: textColorSecondaryOverlay,
      textColorDisabled: textColorDisabledOverlay,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColorOverlay,
      buttonBorderColor: borderColorOverlay,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: primaryColor,
      buttonColor: 'transparent',
      buttonColorActive: primaryColor,
      buttonTextColor: textColorSecondaryOverlay,
      buttonTextColorActive: baseColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled: opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      buttonBoxShadow: 'inset 0 0 0 1px transparent',
      buttonBorderRadius: borderRadius
    }
  }
})
