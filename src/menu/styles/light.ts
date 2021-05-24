import { changeColor } from 'seemly'
import { tooltipLight } from '../../tooltip/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'

export function createPartialInvertedVars (
  color: string,
  activeColor: string,
  groupColor: string
) {
  return {
    itemTextColorInverted: color,
    itemTextColorHoverInverted: activeColor,
    itemTextColorChildActiveInverted: activeColor,
    itemTextColorActiveInverted: activeColor,
    itemIconColorInverted: color,
    itemIconColorHoverInverted: activeColor,
    itemIconColorActiveInverted: activeColor,
    itemIconColorChildActiveInverted: activeColor,
    itemIconColorCollapsedInverted: color,
    arrowColorInverted: color,
    arrowColorHoverInverted: activeColor,
    arrowColorChildActiveInverted: activeColor,
    arrowColorActiveInverted: activeColor,
    groupTextColorInverted: groupColor
  }
}

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
    color: '#0000',
    groupTextColor: textColor3,
    itemColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    itemColorActiveCollapsed: '#0000',
    itemTextColor: textColor2,
    itemTextColorHover: primaryColorHover,
    itemTextColorChildActive: primaryColor,
    itemTextColorActive: primaryColor,
    itemIconColor: textColor1,
    itemIconColorHover: primaryColorHover,
    itemIconColorActive: primaryColor,
    itemIconColorChildActive: primaryColor,
    itemIconColorCollapsed: textColor1,
    arrowColor: primaryColor,
    arrowColorHover: primaryColorHover,
    arrowColorChildActive: primaryColor,
    arrowColorActive: primaryColor,
    colorInverted: 'rgb(0, 20, 40)',
    itemColorActiveInverted: primaryColor,
    itemColorActiveCollapsedInverted: primaryColor,
    borderColorHorizontal: '#0000',
    fontSize,
    ...createPartialInvertedVars('#BBB', '#FFF', '#AAA')
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
