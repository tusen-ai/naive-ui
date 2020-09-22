import create from '../../styles/_utils/create-component-base'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Pagination',
  theme: 'light',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
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
      itemTextColor: textColorSecondary,
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
      jumperTextColor: textColorSecondary,
      jumperTextColorDisabled: textColorDisabled
    }
  }
})
