import { changeColor } from 'seemly'
import { tooltipLight } from '../../tooltip/styles'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

const menuLight = {
  name: 'Menu',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self (vars: ThemeCommonVars) {
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
      itemColorActive: changeColor(primaryColor, { alpha: 0.1 }),
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

export default menuLight

export type MenuThemeVars = ReturnType<typeof menuLight.self>
