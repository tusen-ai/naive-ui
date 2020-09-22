import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import baseTrackingRectStyle from '../../_base/tracking-rect/styles/dark'
import checkboxStyle from '../../checkbox/styles/dark'

export default create({
  theme: 'dark',
  name: 'Transfer',
  peer: [
    baseTrackingRectStyle,
    checkboxStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      borderColor: 'transparent',
      listColor: derived.inputColorOverlay,
      headerColor: derived.tableHeaderColorOverlay,
      headerTextColor: derived.textColorPrimaryOverlay,
      headerTextColorDisabled: derived.textColorDisabledOverlay,
      headerExtraTextColor: derived.textColorSecondaryOverlay,
      buttonColor: 'rgba(255, 255, 255, 0.3)',
      buttonColorHover: derived.primaryColorHover,
      buttonColorActive: derived.primaryColorActive,
      buttonColorDisabled: 'rgba(255, 255, 255, 0.15)',
      filterBorderColor: derived.dividerColorOverlay,
      itemTextColor: derived.textColorSecondaryOverlay,
      itemTextColorDisabled: derived.textColorDisabledOverlay
    }
  }
})
