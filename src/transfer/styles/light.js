import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { composite } from '../../_utils/color'
import checkboxStyle from '../../checkbox/styles/light'

export default create({
  theme: 'light',
  name: 'Transfer',
  peer: [
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
      headerTextColor: derived.textColor1,
      headerTextColorDisabled: derived.textColorDisabled,
      headerExtraTextColor: derived.textColor2,
      buttonColor: 'rgba(0, 0, 0, 0.2)',
      buttonColorHover: derived.primaryColorHover,
      buttonColorActive: derived.primaryColorPressed,
      buttonColorDisabled: 'rgba(0, 0, 0, 0.1)',
      filterBorderColor: derived.dividerColorOverlay,
      itemTextColor: derived.textColor2,
      itemTextColorDisabled: derived.textColorDisabled
    }
  }
})
