import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import {
  checkboxDark
} from '../../checkbox/styles'
import {
  scrollbarDark
} from '../../scrollbar/styles'
import {
  inputDark
} from '../../input/styles'

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
      filterBorderColor: vars.borderColorOverlay,
      itemTextColor: vars.textColor2Overlay,
      itemTextColorDisabled: vars.textColorDisabledOverlay,
      itemColorPending: vars.hoverColorOverlay
    }
  }
})
