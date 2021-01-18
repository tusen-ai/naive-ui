import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

const self = (vars: ThemeCommonVars) => {
  const { railColor } = vars
  return {
    itemColor: railColor,
    itemColorActive: '#FFCC33',
    itemSize: '20px'
  }
}

export type RateThemeVars = ReturnType<typeof self>

const themeLight = {
  name: 'Rate',
  common: commonLight,
  self
}

export default themeLight
export type RateTheme = typeof themeLight
