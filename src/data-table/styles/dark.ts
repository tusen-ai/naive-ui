import { composite } from 'seemly'
import commonVariables from './_common'
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
    Popover: popoverDark
  },
  self (vars) {
    const {
      cardColor,
      modalColor,
      dividerColorOverlay,
      textColor2Overlay,
      textColor1Overlay,
      tableHeaderColorOverlay,
      tableColorHoverOverlay,
      iconColorOverlay,
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
      actionDividerColor: dividerColorOverlay,
      borderRadius,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderColor: composite(cardColor, dividerColorOverlay),
      tdColorHover: composite(cardColor, tableColorHoverOverlay),
      thColor: composite(cardColor, tableHeaderColorOverlay),
      thColorHover: composite(
        composite(cardColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      tdColor: cardColor,
      tdTextColor: textColor2Overlay,
      thTextColor: textColor1Overlay,
      thFontWeight: fontWeightStrong,
      thButtonColorHover: tableColorHoverOverlay,
      thIconColor: iconColorOverlay,
      thIconColorActive: primaryColor,
      // modal
      borderColorModal: composite(modalColor, dividerColorOverlay),
      tdColorHoverModal: composite(modalColor, tableColorHoverOverlay),
      thColorModal: composite(modalColor, tableHeaderColorOverlay),
      thColorHoverModal: composite(
        composite(modalColor, tableHeaderColorOverlay),
        tableHeaderColorOverlay
      ),
      tdColorModal: modalColor
    }
  }
}

export default dataTableDark
