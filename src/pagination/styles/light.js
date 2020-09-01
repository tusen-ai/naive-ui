import create from '../../styles/_utils/create-component-base'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Pagination',
  theme: 'light',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      primaryColor,
      disabledInputBackgroundColor,
      disabledTextColor,
      cardBackgroundColor,
      baseBackgroundColor,
      borderColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColor: secondaryTextColor,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: disabledTextColor,
      itemColor: cardBackgroundColor,
      itemColorActive: baseBackgroundColor,
      itemColorDisabled: disabledInputBackgroundColor,
      itemBorderColor: borderColor,
      itemBorderColorActive: primaryColor,
      itemBorderColorDisabled: borderColor,
      itemBorderRadius: borderRadius,
      jumperTextColor: secondaryTextColor,
      jumperTextColorDisabled: disabledTextColor
    }
  }
})
