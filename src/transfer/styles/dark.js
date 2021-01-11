import commonVariables from './_common'
import { checkboxDark } from '../../checkbox/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/new-common'
import { emptyDark } from '../../empty/styles'
import { buttonDark } from '../../button/styles'

export default {
  name: 'Transfer',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Input: inputDark,
    Empty: emptyDark,
    Button: buttonDark
  },
  self (vars) {
    const {
      iconColorDisabledOverlay,
      iconColorOverlay,
      fontWeight,
      fontSizeLarge,
      fontSizeMedium,
      fontSizeSmall,
      heightLarge,
      heightMedium,
      heightSmall,
      borderRadius,
      inputColorOverlay,
      tableHeaderColorOverlay,
      textColor1Overlay,
      textColorDisabledOverlay,
      textColor2Overlay,
      dividerColorOverlay,
      hoverColorOverlay
    } = vars
    return {
      ...commonVariables,
      itemHeightSmall: heightSmall,
      itemHeightMedium: heightMedium,
      itemHeightLarge: heightLarge,
      fontSizeSmall: fontSizeSmall,
      fontSizeMedium: fontSizeMedium,
      fontSizeLarge: fontSizeLarge,
      borderRadius: borderRadius,
      borderColor: 'transparent',
      listColor: inputColorOverlay,
      headerColor: tableHeaderColorOverlay,
      titleTextColor: textColor1Overlay,
      titleTextColorDisabled: textColorDisabledOverlay,
      headerExtraTextColor: textColor2Overlay,
      filterDividerColor: dividerColorOverlay,
      itemTextColor: textColor2Overlay,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemColorPending: hoverColorOverlay,
      titleFontWeight: fontWeight,
      iconColor: iconColorOverlay,
      iconColorDisabled: iconColorDisabledOverlay
    }
  }
}
