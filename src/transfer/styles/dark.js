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
      listBackgroundColor: derived.inputBackgroundOverlayColor,
      headerBackgroundColor: derived.tableHeaderBackgroundOverlayColor,
      headerTextColor: derived.primaryTextOverlayColor,
      disabledHeaderTextColor: derived.disabledTextOverlayColor,
      headerExtraTextColor: derived.secondaryTextOverlayColor,
      // TODO refactor
      buttonBackgroundColor: 'rgba(255, 255, 255, 0.3)',
      buttonHoverBackgroundColor: derived.primaryHoverColor,
      buttonActiveBackgroundColor: derived.primaryActiveColor,
      buttonDisabledBackgroundColor: 'rgba(255, 255, 255, 0.15)',
      filterBorderColor: derived.dividerOverlayColor,
      itemTextColor: derived.secondaryTextOverlayColor,
      itemDisabledTextColor: derived.disabledTextOverlayColor
    }
  }
})
