import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import type { CheckboxTheme } from '../../checkbox/styles'
import type { EmptyTheme } from '../../empty/styles'
import type { InputTheme } from '../../input/styles'
import { composite } from 'seemly'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { checkboxLight } from '../../checkbox/styles'
import { emptyLight } from '../../empty/styles'
import { inputLight } from '../../input/styles'
import commonVariables from './_common'

function self(vars: ThemeCommonVars) {
  const {
    fontWeight,
    fontSizeLarge,
    fontSizeMedium,
    fontSizeSmall,
    heightLarge,
    heightMedium,
    borderRadius,
    cardColor,
    tableHeaderColor,
    textColor1,
    textColorDisabled,
    textColor2,
    textColor3,
    borderColor,
    hoverColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed
  } = vars
  return {
    ...commonVariables,
    itemHeightSmall: heightMedium,
    itemHeightMedium: heightMedium,
    itemHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius,
    dividerColor: borderColor,
    borderColor,
    listColor: cardColor,
    headerColor: composite(cardColor, tableHeaderColor),
    titleTextColor: textColor1,
    titleTextColorDisabled: textColorDisabled,
    extraTextColor: textColor3,
    extraTextColorDisabled: textColorDisabled,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemColorPending: hoverColor,
    titleFontWeight: fontWeight,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed
  }
}

export interface TransferThemeVars extends ReturnType<typeof self> {}

const transferLight: TransferTheme = createTheme({
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

export interface TransferTheme extends Theme<
  'Transfer',
  TransferThemeVars,
  {
    Checkbox: CheckboxTheme
    Scrollbar: ScrollbarTheme
    Input: InputTheme
    Empty: EmptyTheme
    Button: ButtonTheme
  }
> {}

export interface TransferThemeOverrides extends ExtractThemeOverrides<TransferTheme> {}

export default transferLight
