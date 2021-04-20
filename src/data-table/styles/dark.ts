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
    Spin: spinDark,
    Empty: emptyDark,
    Popover: popoverDark,
    Ellipsis: ellipsisDark
  },
  self
}

export default dataTableDark
