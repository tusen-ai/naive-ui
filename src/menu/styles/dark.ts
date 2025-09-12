import type { MenuTheme } from './light'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import { dropdownDark } from '../../dropdown/styles'
import { tooltipDark } from '../../tooltip/styles'
import { self } from './light'

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark,
    Dropdown: dropdownDark
  },
  self(vars) {
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
