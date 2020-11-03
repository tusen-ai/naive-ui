import create from '../../_styles/utils/create-component-base'
import { baseSuffixLight } from '../../_base/suffix/styles'
import { baseLight } from '../../styles'

export default create({
  name: 'Pagination',
  theme: 'light',
  peer: [baseSuffixLight, baseLight],
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      primaryColor,
      inputColorDisabled,
      textColorDisabled,
      cardColor,
      baseColor,
      borderColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColor: textColor2,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabled,
      itemColor: cardColor,
      itemColorActive: baseColor,
      itemColorDisabled: inputColorDisabled,
      itemBorderColor: borderColor,
      itemBorderColorActive: primaryColor,
      itemBorderColorDisabled: borderColor,
      itemBorderRadius: borderRadius,
      jumperTextColor: textColor2,
      jumperTextColorDisabled: textColorDisabled
    }
  }
})
