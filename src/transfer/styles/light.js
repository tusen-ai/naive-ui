import commonVariables from './_common'
import { composite } from 'seemly'
import { checkboxLight } from '../../checkbox/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/new-common'
import { emptyLight } from '../../empty/styles'
import { buttonLight } from '../../button/styles'

export default {
  name: 'Transfer',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Input: inputLight,
    Empty: emptyLight,
    Button: buttonLight
  },
  self (vars) {
    const {
      fontSizeLarge,
      fontSizeMedium,
      fontSizeSmall,
      heightLarge,
      heightMedium,
      heightSmall,
      borderRadius,
      cardColor,
      tableHeaderColorOverlay,
      textColor1,
      textColorDisabled,
      textColor2,
      borderColorOverlay,
      hoverColorOverlay,
      borderColor
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
      borderColor: borderColor,
      listColor: cardColor,
      headerColor: composite(cardColor, tableHeaderColorOverlay),
      titleTextColor: textColor1,
      titleTextColorDisabled: textColorDisabled,
      headerExtraTextColor: textColor2,
      filterDividerColor: borderColorOverlay,
      itemTextColor: textColor2,
      itemTextColorDisabled: textColorDisabled,
      itemColorPending: hoverColorOverlay,
      titleFontWeight: 400
    }
  }
}
