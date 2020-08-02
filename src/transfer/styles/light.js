import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { composite } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Transfer',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      borderColor: derived.dividerOverlayColor,
      listBackgroundColor: derived.cardBackgroundColor,
      headerBackgroundColor: composite(
        derived.cardBackgroundColor,
        derived.tableHeaderBackgroundOverlayColor
      ),
      headerTextColor: derived.primaryTextColor,
      disabledHeaderTextColor: derived.disabledTextColor,
      headerExtraTextColor: derived.secondaryTextColor,
      // TODO refactor
      buttonBackgroundColor: 'rgba(0, 0, 0, 0.2)',
      buttonHoverBackgroundColor: derived.primaryHoverColor,
      buttonActiveBackgroundColor: derived.primaryActiveColor,
      buttonDisabledBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      filterBorderColor: derived.dividerOverlayColor,
      itemTextColor: derived.secondaryTextColor,
      itemDisabledTextColor: derived.disabledTextColor
    }
  }
})
