import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'
import { baseSuffixDark } from '../../_base/suffix/styles'
import { baseDark } from '../../styles'

export default create({
  name: 'Pagination',
  theme: 'dark',
  peer: [baseSuffixDark, baseDark],
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      primaryColor,
      inputColorDisabledOverlay,
      textColorDisabledOverlay,
      borderColorOverlay,
      opacity3
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColor: textColor2Overlay,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemColor: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabledOverlay,
      itemBorderColor: borderColorOverlay,
      itemBorderColorActive: changeColor(primaryColor, { alpha: opacity3 }),
      itemBorderColorDisabled: 'transparent',
      itemBorderRadius: borderRadius,
      jumperTextColor: textColor2Overlay,
      jumperTextColorDisabled: textColorDisabledOverlay
    }
  }
})
