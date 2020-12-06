import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { composite } from 'seemly'
import {
  checkboxLight
} from '../../checkbox/styles'
import {
  scrollbarLight
} from '../../scrollbar/styles'
import {
  inputLight
} from '../../input/styles'

export default create({
  theme: 'light',
  name: 'Transfer',
  peer: [
    checkboxLight,
    scrollbarLight,
    inputLight
  ],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      borderColor: vars.borderColor,
      listColor: vars.cardColor,
      headerColor: composite(
        vars.cardColor,
        vars.tableHeaderColorOverlay
      ),
      headerTextColor: vars.textColor1,
      headerTextColorDisabled: vars.textColorDisabled,
      headerExtraTextColor: vars.textColor2,
      buttonColor: 'rgba(0, 0, 0, 0.2)',
      buttonColorHover: vars.primaryColorHover,
      buttonColorActive: vars.primaryColorPressed,
      buttonColorDisabled: 'rgba(0, 0, 0, 0.1)',
      filterBorderColor: vars.borderColorOverlay,
      itemTextColor: vars.textColor2,
      itemTextColorDisabled: vars.textColorDisabled,
      itemColorPending: vars.hoverColorOverlay
    }
  }
})
