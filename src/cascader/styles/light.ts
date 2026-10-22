import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { InternalSelectionTheme } from '../../_internal/selection/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { CheckboxTheme } from '../../checkbox/styles'
import type { EmptyTheme } from '../../empty/styles'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { internalSelectionLight } from '../../_internal/selection/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { checkboxLight } from '../../checkbox/styles'
import { emptyLight } from '../../empty/styles'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadius,
    boxShadow2,
    popoverColor,
    textColor2,
    textColor3,
    primaryColor,
    textColorDisabled,
    dividerColor,
    hoverColor,
    fontSizeMedium,
    heightMedium
  } = vars
  return {
    menuBorderRadius: borderRadius,
    menuColor: popoverColor,
    menuBoxShadow: boxShadow2,
    menuDividerColor: dividerColor,
    menuHeight: 'calc(var(--n-option-height) * 6.6)',
    optionArrowColor: textColor3,
    optionHeight: heightMedium,
    optionFontSize: fontSizeMedium,
    optionColorHover: hoverColor,
    optionTextColor: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorDisabled: textColorDisabled,
    optionCheckMarkColor: primaryColor,
    loadingColor: primaryColor,
    columnWidth: '180px'
  }
}

export interface CascaderThemeVars extends ReturnType<typeof self> {}

const cascaderLight: CascaderTheme = createTheme({
  name: 'Cascader',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    InternalSelection: internalSelectionLight,
    Scrollbar: scrollbarLight,
    Checkbox: checkboxLight,
    Empty: emptyLight
  },
  self
})

export interface CascaderTheme extends Theme<
  'Cascader',
  CascaderThemeVars,
  {
    InternalSelectMenu: InternalSelectMenuTheme
    InternalSelection: InternalSelectionTheme
    Scrollbar: ScrollbarTheme
    Checkbox: CheckboxTheme
    Empty: EmptyTheme
  }
> {}

export interface CascaderThemeOverrides extends ExtractThemeOverrides<CascaderTheme> {}

export default cascaderLight
