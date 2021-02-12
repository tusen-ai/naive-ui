import commonVariables from './_common'
import { composite } from 'seemly'
import { checkboxLight } from '../../checkbox/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { emptyLight } from '../../empty/styles'
import { buttonLight } from '../../button/styles'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    fontWeight,
    iconColorDisabled,
    iconColor,
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
    extraTextColor: textColor2,
    filterDividerColor: borderColorOverlay,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemColorPending: hoverColorOverlay,
    titleFontWeight: fontWeight,
    iconColor,
    iconColorDisabled
  }
}

export type TransferThemeVars = ReturnType<typeof self>

const transferLight = createTheme({
  name: 'Transfer',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Input: inputLight,
    Empty: emptyLight,
    Button: buttonLight
  },
  self
})

export default transferLight
export type TransferTheme = typeof transferLight
