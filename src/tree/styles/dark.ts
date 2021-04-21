import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/common'
import type { TreeTheme } from './light'
import { self } from './light'

const treeDark: TreeTheme = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark
  },
  self
}

export default treeDark
