import { composite } from 'seemly'
import commonVariables from './_common'
import { ellipsisDark } from '../../ellipsis/styles'
import { buttonDark } from '../../button/styles'
import { checkboxDark } from '../../checkbox/styles'
import { radioDark } from '../../radio/styles'
import { paginationDark } from '../../pagination/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { popoverDark } from '../../popover/styles'
import { spinDark } from '../../spin/styles'
import { emptyDark } from '../../empty/styles'
import { commonDark } from '../../_styles/common'
import type { DataTableTheme } from './light'

const dataTableDark: DataTableTheme = {
  name: 'DataTable',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Checkbox: checkboxDark,
    Radio: radioDark,
    Pagination: paginationDark,
    Scrollbar: scrollbarDark,
    Spin: spinDark,
    Empty: emptyDark,
    Popover: popoverDark,
    Ellipsis: ellipsisDark
  },
  self (vars) {
    const {
      cardColor,
      modalColor,
      dividerColor,
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
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      actionDividerColor: dividerColor,
      borderRadius,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderColor: composite(cardColor, dividerColor),
      tdColorHover: composite(cardColor, tableColorHover),
      thColor: composite(cardColor, tableHeaderColor),
      thColorHover: composite(
        composite(cardColor, tableHeaderColor),
        tableHeaderColor
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
      thColorModal: composite(modalColor, tableHeaderColor),
      thColorHoverModal: composite(
        composite(modalColor, tableHeaderColor),
        tableHeaderColor
      ),
      tdColorModal: modalColor
    }
  }
}

export default dataTableDark
