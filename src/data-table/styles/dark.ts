import { ellipsisDark } from '../../ellipsis/styles'
import { buttonDark } from '../../button/styles'
import { checkboxDark } from '../../checkbox/styles'
import { radioDark } from '../../radio/styles'
import { paginationDark } from '../../pagination/styles'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { popoverDark } from '../../popover/styles'
import { emptyDark } from '../../empty/styles'
import { dropdownDark } from '../../dropdown/styles'
import { commonDark } from '../../_styles/common'
import type { DataTableTheme } from './light'
import { self } from './light'

const dataTableDark: DataTableTheme = {
  name: 'DataTable',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Checkbox: checkboxDark,
    Radio: radioDark,
    Pagination: paginationDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark,
    Popover: popoverDark,
    Ellipsis: ellipsisDark,
    Dropdown: dropdownDark
  },
  self (vars) {
    const commonSelf = self(vars)
    commonSelf.boxShadowAfter = 'inset 12px 0 8px -12px rgba(0, 0, 0, .36)'
    commonSelf.boxShadowBefore = 'inset -12px 0 8px -12px rgba(0, 0, 0, .36)'
    return commonSelf
  }
}

export default dataTableDark
