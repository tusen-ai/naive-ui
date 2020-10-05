import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Pagination',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      primaryColor,
      inputColorDisabledOverlay,
      textColorDisabledOverlay,
      borderColorOverlay,
      opacityTertiary
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColor: textColorSecondaryOverlay,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemColor: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabledOverlay,
      itemBorderColor: borderColorOverlay,
      itemBorderColorActive: changeColor(primaryColor, { alpha: opacityTertiary }),
      itemBorderColorDisabled: 'transparent',
      itemBorderRadius: borderRadius,
      jumperTextColor: textColorSecondaryOverlay,
      jumperTextColorDisabled: textColorDisabledOverlay
    }
  }
})
