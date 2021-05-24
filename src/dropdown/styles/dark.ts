import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'
import type { DropdownTheme } from './light'
import { self } from './light'
import { changeColor } from 'seemly'

const dropdownDark: DropdownTheme = {
  name: 'Dropdown',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self (vars) {
    const { primaryColorSuppl, primaryColor, popoverColor } = vars
    const commonSelf = self(vars)
    commonSelf.colorInverted = popoverColor
    commonSelf.optionColorActive = changeColor(primaryColor, { alpha: 0.15 })
    commonSelf.optionColorActiveInverted = primaryColorSuppl
    commonSelf.optionColorHoverInverted = primaryColorSuppl
    return commonSelf
  }
}

export default dropdownDark
