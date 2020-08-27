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
      boxShadowDefault: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `(inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })})`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      backgroundColorDefault: baseBackgroundColor,
      backgroundColorDisabled: disabledBackgroundColor,
      labelTextColorDefault: secondaryTextColor,
      labelTextColorDisabled: disabledTextColor,
      controlBackgroundColorActive: primaryColor,
      controlBackgroundColorDisabled: borderColor,
      buttonBorderColorDefault: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: borderColor,
      buttonBackgroundColorDefault: baseBackgroundColor,
      buttonBackgroundColorActive: baseBackgroundColor,
      buttonLabelColorDefault: secondaryTextColor,
      buttonLabelColorActive: primaryColor,
      buttonLabelColorHover: primaryColor,
      disabledOpacity: disabledOpacity,
      borderMaskWidth: borderMaskWidth,
      buttonBoxShadowFocus: `(inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })})`,
      buttonBoxShadowHover: `inset 0 0 0 ${borderMaskWidth} transparent`,
      buttonBorderRadius: borderRadius
    }
  }
})
