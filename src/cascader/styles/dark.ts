import { internalSelectionDark } from '../../_internal/selection/styles'
import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/common'
import type { CascaderTheme } from './light'
import { self } from './light'

const cascaderDark: CascaderTheme = {
  name: 'Cascader',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    InternalSelection: internalSelectionDark,
    Scrollbar: scrollbarDark,
    Checkbox: checkboxDark
  },
  self
}

export default cascaderDark
