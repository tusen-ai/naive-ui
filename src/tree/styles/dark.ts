import { checkboxDark } from '../../checkbox/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/common'
import type { TreeTheme } from './light'
import { self } from './light'

const treeDark: TreeTheme = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark
  },
  self
}

export default treeDark
