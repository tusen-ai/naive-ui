import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'
import type { DropdownTheme } from './light'
import { self } from './light'

const dropdownDark: DropdownTheme = {
  name: 'Dropdown',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self
}

export default dropdownDark
