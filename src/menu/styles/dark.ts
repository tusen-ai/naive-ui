import { changeColor } from 'seemly'
import { tooltipDark } from '../../tooltip/styles'
import { dropdownDark } from '../../dropdown/styles'
import { commonDark } from '../../_styles/common'
import { self } from './light'
import type { MenuTheme } from './light'

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark,
    Dropdown: dropdownDark
  },
  self (vars) {
    const { primaryColor, primaryColorSuppl } = vars
    const commonSelf = self(vars)
    commonSelf.itemColorActive = changeColor(primaryColor, { alpha: 0.15 })
    commonSelf.itemColorActiveHover = changeColor(primaryColor, { alpha: 0.15 })
    commonSelf.itemColorActiveCollapsed = changeColor(primaryColor, {
      alpha: 0.15
    })
    commonSelf.itemColorActiveInverted = primaryColorSuppl
    commonSelf.itemColorActiveHoverInverted = primaryColorSuppl
    commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl
    return commonSelf
  }
}

export default menuDark
