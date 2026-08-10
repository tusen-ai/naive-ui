import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { errorColor, infoColor, successColor, warningColor, fontFamily } = vars
  return {
    color: errorColor,
    colorInfo: infoColor,
    colorSuccess: successColor,
    colorError: errorColor,
    colorWarning: warningColor,
    fontSize: '12px',
    fontFamily
  }
}

export interface BadgeThemeVars extends ReturnType<typeof self> {}

const badgeLight: BadgeTheme = {
  name: 'Badge',
  common: commonLight,
  self
}

export interface BadgeTheme extends Theme<'Badge', BadgeThemeVars> {}

export interface BadgeThemeOverrides extends ExtractThemeOverrides<BadgeTheme> {}

export default badgeLight
