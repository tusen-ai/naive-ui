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
      disabledBackgroundColor,
      disabledTextColor,
      cardBackgroundColor,
      baseBackgroundColor,
      borderColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      itemTextColorDefault: secondaryTextColor,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: disabledTextColor,
      itemBackgroundColorDefault: cardBackgroundColor,
      itemBackgroundColorActive: baseBackgroundColor,
      itemBackgroundColorDisabled: disabledBackgroundColor,
      itemBorderColorDefault: borderColor,
      itemBorderColorActive: primaryColor,
      itemBorderColorDisabled: borderColor,
      textColorDefault: secondaryTextColor,
      textColorDisabled: disabledTextColor,
      borderRadius: borderRadius
    }
  }
})
