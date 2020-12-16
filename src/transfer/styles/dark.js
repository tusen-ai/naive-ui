import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { checkboxDark } from '../../checkbox/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { inputDark } from '../../input/styles'

export default create({
  theme: 'dark',
  name: 'Transfer',
  peer: [baseDark, checkboxDark, scrollbarDark, inputDark],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      itemHeightSmall: vars.heightSmall,
      itemHeightMedium: vars.heightMedium,
      itemHeightLarge: vars.heightLarge,
      fontSizeSmall: vars.fontSizeSmall,
      fontSizeMedium: vars.fontSizeMedium,
      fontSizeLarge: vars.fontSizeLarge,
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
