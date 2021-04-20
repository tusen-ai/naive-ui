import { changeColor } from 'seemly'
import { tooltipDark } from '../../tooltip/styles'
import { commonDark } from '../../_styles/common'
import type { MenuTheme } from './light'
import { self } from './light'

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  },
  self (vars) {
    const { primaryColor } = vars
    const commonSelf = self(vars)
    commonSelf.itemColorActive = changeColor(primaryColor, { alpha: 0.15 })
    return commonSelf
  }
}

export default menuDark
