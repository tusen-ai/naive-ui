import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Transfer',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      borderColor: 'transparent',
      listColor: derived.inputBackgroundOverlayColor,
      headerColor: derived.tableHeaderBackgroundOverlayColor,
      headerTextColor: derived.primaryTextOverlayColor,
      headerTextColorDisabled: derived.disabledTextOverlayColor,
      headerExtraTextColor: derived.secondaryTextOverlayColor,
      buttonColor: 'rgba(255, 255, 255, 0.3)',
      buttonColorHover: derived.primaryHoverColor,
      buttonColorActive: derived.primaryActiveColor,
      buttonColorDisabled: 'rgba(255, 255, 255, 0.15)',
      filterBorderColor: derived.dividerOverlayColor,
      itemTextColor: derived.secondaryTextOverlayColor,
      itemTextColorDisabled: derived.disabledTextOverlayColor
    }
  }
})
