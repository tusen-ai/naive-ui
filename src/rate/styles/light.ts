import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { railColor } = vars
  return {
    itemColor: railColor,
    itemColorActive: '#FFCC33',
    sizeSmall: '16px',
    sizeMedium: '20px',
    sizeLarge: '24px'
  }
}

export type RateThemeVars = ReturnType<typeof self>

const themeLight: Theme<'Rate', RateThemeVars> = {
  name: 'Rate',
  common: commonLight,
  self
}

export default themeLight
export type RateTheme = typeof themeLight
