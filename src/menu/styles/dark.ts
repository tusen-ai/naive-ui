import { changeColor } from 'seemly'
import { tooltipDark } from '../../tooltip/styles'
import { commonDark } from '../../_styles/common'
import { self } from './light'
import type { MenuTheme } from './light'

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  },
  self (vars) {
    const { primaryColor, primaryColorSuppl } = vars
    const commonSelf = self(vars)
    commonSelf.itemColorActive = changeColor(primaryColor, { alpha: 0.15 })
    commonSelf.itemColorActiveInverted = primaryColorSuppl
    commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl
    commonSelf.colorInverted = '#0000'
    return commonSelf
  }
}

export default menuDark
