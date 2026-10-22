import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { railColor } = vars
  return {
    itemColor: railColor,
    itemColorActive: '#FFCC33',
    sizeSmall: '16px',
    sizeMedium: '20px',
    sizeLarge: '24px'
  }
}

export interface RateThemeVars extends ReturnType<typeof self> {}

const themeLight: RateTheme = {
  name: 'Rate',
  common: commonLight,
  self
}

export interface RateTheme extends Theme<'Rate', RateThemeVars> {}

export interface RateThemeOverrides extends ExtractThemeOverrides<RateTheme> {}

export default themeLight
