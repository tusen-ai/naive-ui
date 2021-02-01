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
      textColor3Overlay,
      primaryColor,
      textColor2Overlay,
      primaryColorHover,
      textColor1Overlay,
      fontSize
    } = vars
    return {
      borderRadius: borderRadius,
      groupTextColor: textColor3Overlay,
      itemColorActive: changeColor(primaryColor, { alpha: 0.15 }),
      itemTextColor: textColor2Overlay,
      itemTextColorHover: primaryColorHover,
      itemTextColorChildActive: primaryColor,
      itemTextColorActive: primaryColor,
      itemIconColor: textColor1Overlay,
      itemIconColorHover: primaryColorHover,
      itemIconColorActive: primaryColor,
      itemIconColorChildActive: primaryColor,
      itemIconColorCollapsed: textColor1Overlay,
      borderColorHorizontal: 'transparent',
      arrowColor: primaryColor,
      fontSize
    }
  }
}

export default menuDark
