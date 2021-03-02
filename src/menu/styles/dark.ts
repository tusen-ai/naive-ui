import { changeColor } from 'seemly'
import { tooltipDark } from '../../tooltip/styles'
import { commonDark } from '../../_styles/common'
import type { MenuTheme } from './light'

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  },
  self (vars) {
    const {
      borderRadius,
      textColor3,
      primaryColor,
      textColor2,
      primaryColorHover,
      textColor1,
      fontSize
    } = vars
    return {
      borderRadius: borderRadius,
      groupTextColor: textColor3,
      itemColorActive: changeColor(primaryColor, { alpha: 0.15 }),
      itemTextColor: textColor2,
      itemTextColorHover: primaryColorHover,
      itemTextColorChildActive: primaryColor,
      itemTextColorActive: primaryColor,
      itemIconColor: textColor1,
      itemIconColorHover: primaryColorHover,
      itemIconColorActive: primaryColor,
      itemIconColorChildActive: primaryColor,
      itemIconColorCollapsed: textColor1,
      borderColorHorizontal: 'transparent',
      arrowColor: primaryColor,
      fontSize
    }
  }
}

export default menuDark
