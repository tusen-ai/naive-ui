import { changeColor } from 'seemly'
import { tooltipLight } from '../../tooltip/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
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
    borderColorHorizontal: '#0000',
    arrowColor: primaryColor,
    fontSize
  }
}

export type MenuThemeVars = ReturnType<typeof self>

const menuLight = createTheme({
  name: 'Menu',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self
})

export default menuLight
export type MenuTheme = typeof menuLight
