import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { composite } from '../../_utils/color'
import baseTrackingRectStyle from '../../_base/tracking-rect/styles/light'
import checkboxStyle from '../../checkbox/styles/light'

export default create({
  theme: 'light',
  name: 'Transfer',
  peer: [
    baseTrackingRectStyle,
    checkboxStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      borderColor: derived.dividerOverlayColor,
      listColor: derived.cardBackgroundColor,
      headerColor: composite(
        derived.cardBackgroundColor,
        derived.tableHeaderBackgroundOverlayColor
      ),
      headerTextColor: derived.primaryTextColor,
      headerTextColorDisabled: derived.disabledTextColor,
      headerExtraTextColor: derived.secondaryTextColor,
      buttonColor: 'rgba(0, 0, 0, 0.2)',
      buttonColorHover: derived.primaryHoverColor,
      buttonColorActive: derived.primaryActiveColor,
      buttonColorDisabled: 'rgba(0, 0, 0, 0.1)',
      filterBorderColor: derived.dividerOverlayColor,
      itemTextColor: derived.secondaryTextColor,
      itemTextColorDisabled: derived.disabledTextColor
    }
  }
})
