import { composite } from 'seemly'
import commonVariables from './_common'
import { ellipsisLight } from '../../ellipsis/styles'
import { buttonLight } from '../../button/styles'
import { checkboxLight } from '../../checkbox/styles'
import { radioLight } from '../../radio/styles'
import { paginationLight } from '../../pagination/styles'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { popoverLight } from '../../popover/styles'
import { emptyLight } from '../../empty/styles'
import { dropdownLight } from '../../dropdown/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    cardColor,
    modalColor,
    popoverColor,
    textColor2,
    textColor1,
    tableHeaderColor,
    tableColorHover,
    iconColor,
    primaryColor,
    fontWeightStrong,
    borderRadius,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor,
    heightSmall,
    opacityDisabled,
    tableColorStriped
  } = vars
  return {
    ...commonVariables,
    actionDividerColor: dividerColor,
    lineHeight,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderColor: composite(cardColor, dividerColor),
    tdColorHover: composite(cardColor, tableColorHover),
    tdColorStriped: composite(cardColor, tableColorStriped),
    thColor: composite(cardColor, tableHeaderColor),
    thColorHover: composite(
      composite(cardColor, tableHeaderColor),
      tableColorHover
    ),
    tdColor: cardColor,
    tdTextColor: textColor2,
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    thButtonColorHover: tableColorHover,
    thIconColor: iconColor,
    thIconColorActive: primaryColor,
    // modal
    borderColorModal: composite(modalColor, dividerColor),
    tdColorHoverModal: composite(modalColor, tableColorHover),
    tdColorStripedModal: composite(modalColor, tableColorStriped),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorHoverModal: composite(
      composite(modalColor, tableHeaderColor),
      tableColorHover
    ),
    tdColorModal: modalColor,
    // popover
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColorHoverPopover: composite(popoverColor, tableColorHover),
    tdColorStripedPopover: composite(popoverColor, tableColorStriped),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thColorHoverPopover: composite(
      composite(popoverColor, tableHeaderColor),
      tableColorHover
    ),
    tdColorPopover: popoverColor,
    boxShadowBefore: 'inset -12px 0 8px -12px rgba(0, 0, 0, .18)',
    boxShadowAfter: 'inset 12px 0 8px -12px rgba(0, 0, 0, .18)',
    // loading
    loadingColor: primaryColor,
    loadingSize: heightSmall,
    opacityLoading: opacityDisabled
  }
}

export type DataTableThemeVars = ReturnType<typeof self>

const dataTableLight = createTheme({
  name: 'DataTable',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Checkbox: checkboxLight,
    Radio: radioLight,
    Pagination: paginationLight,
    Scrollbar: scrollbarLight,
    Empty: emptyLight,
    Popover: popoverLight,
    Ellipsis: ellipsisLight,
    Dropdown: dropdownLight
  },
  self
})

export default dataTableLight
export type DataTableTheme = typeof dataTableLight
