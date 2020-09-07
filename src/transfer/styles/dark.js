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
