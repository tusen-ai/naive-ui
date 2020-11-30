import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Radio',
  getDerivedVars (vars) {
    const {
      borderColor,
      primaryColor,
      baseColor,
      textColorDisabled,
      disabledBackgroundColor,
      textColor2,
      opacityDisabled,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      color: baseColor,
      colorDisabled: disabledBackgroundColor,
      textColor: textColor2,
      textColorDisabled: textColorDisabled,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: borderColor,
      buttonColor: baseColor,
      buttonColorActive: baseColor,
      buttonTextColor: textColor2,
      buttonTextColorActive: primaryColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled: opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      buttonBoxShadowHover: 'inset 0 0 0 1px transparent',
      buttonBoxShadow: 'inset 0 0 0 1px transparent',
      buttonBorderRadius: borderRadius
    }
  }
})
