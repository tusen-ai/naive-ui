import commonVariables from './_common'
import { checkboxDark } from '../../checkbox/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import { emptyDark } from '../../empty/styles'
import { buttonDark } from '../../button/styles'
import type { TransferTheme } from './light'

const transferDark: TransferTheme = {
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
      iconColorDisabled,
      iconColor,
      fontWeight,
      fontSizeLarge,
      fontSizeMedium,
      fontSizeSmall,
      heightLarge,
      heightMedium,
      heightSmall,
      borderRadius,
      inputColor,
      tableHeaderColor,
      textColor1,
      textColorDisabled,
      textColor2,
      dividerColor,
      hoverColor
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
      listColor: inputColor,
      headerColor: tableHeaderColor,
      titleTextColor: textColor1,
      titleTextColorDisabled: textColorDisabled,
      extraTextColor: textColor2,
      filterDividerColor: dividerColor,
      itemTextColor: textColor2,
      itemTextColorDisabled: textColorDisabled,
      itemColorPending: hoverColor,
      titleFontWeight: fontWeight,
      iconColor: iconColor,
      iconColorDisabled: iconColorDisabled
    }
  }
}

export default transferDark
