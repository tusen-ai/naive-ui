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
      borderColor: derived.dividerColorOverlay,
      listColor: derived.cardColor,
      headerColor: composite(
        derived.cardColor,
        derived.tableHeaderColorOverlay
      ),
      headerTextColor: derived.textColorPrimary,
      headerTextColorDisabled: derived.textColorDisabled,
      headerExtraTextColor: derived.textColorSecondary,
      buttonColor: 'rgba(0, 0, 0, 0.2)',
      buttonColorHover: derived.primaryColorHover,
      buttonColorActive: derived.primaryColorActive,
      buttonColorDisabled: 'rgba(0, 0, 0, 0.1)',
      filterBorderColor: derived.dividerColorOverlay,
      itemTextColor: derived.textColorSecondary,
      itemTextColorDisabled: derived.textColorDisabled
    }
  }
})
