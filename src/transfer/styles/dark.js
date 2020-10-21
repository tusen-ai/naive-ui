import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import checkboxStyle from '../../checkbox/styles/dark'

export default create({
  theme: 'dark',
  name: 'Transfer',
  peer: [
    checkboxStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      borderColor: 'transparent',
      listColor: derived.inputColorOverlay,
      headerColor: derived.tableHeaderColorOverlay,
      headerTextColor: derived.textColor1Overlay,
      headerTextColorDisabled: derived.textColorDisabledOverlay,
      headerExtraTextColor: derived.textColor2Overlay,
      buttonColor: 'rgba(255, 255, 255, 0.3)',
      buttonColorHover: derived.primaryColorHover,
      buttonColorActive: derived.primaryColorPressed,
      buttonColorDisabled: 'rgba(255, 255, 255, 0.15)',
      filterBorderColor: derived.dividerColorOverlay,
      itemTextColor: derived.textColor2Overlay,
      itemTextColorDisabled: derived.textColorDisabledOverlay
    }
  }
})
