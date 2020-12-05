import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import {
  checkboxDark,
  scrollbarDark,
  inputDark
} from '../../styles'

export default create({
  theme: 'dark',
  name: 'Transfer',
  peer: [
    checkboxDark,
    scrollbarDark,
    inputDark
  ],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      borderColor: 'transparent',
      listColor: vars.inputColorOverlay,
      headerColor: vars.tableHeaderColorOverlay,
      headerTextColor: vars.textColor1Overlay,
      headerTextColorDisabled: vars.textColorDisabledOverlay,
      headerExtraTextColor: vars.textColor2Overlay,
      buttonColor: 'rgba(255, 255, 255, 0.3)',
      buttonColorHover: vars.primaryColorHover,
      buttonColorActive: vars.primaryColorPressed,
      buttonColorDisabled: 'rgba(255, 255, 255, 0.15)',
      filterBorderColor: vars.borderColorOverlay,
      itemTextColor: vars.textColor2Overlay,
      itemTextColorDisabled: vars.textColorDisabledOverlay,
      itemColorPending: vars.hoverColorOverlay
    }
  }
})
