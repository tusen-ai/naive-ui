import { internalSelectionLight } from '../../_internal/selection/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { checkboxLight } from '../../checkbox/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { emptyLight } from '../../empty/styles'

export const self = (vars: ThemeCommonVars) => {
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

export type CascaderThemeVars = ReturnType<typeof self>

const cascaderLight = createTheme({
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

export default cascaderLight
export type CascaderTheme = typeof cascaderLight
