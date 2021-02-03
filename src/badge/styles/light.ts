import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { errorColor, infoColor, successColor, warningColor } = vars
  return {
    color: errorColor,
    colorInfo: infoColor,
    colorSuccess: successColor,
    colorError: errorColor,
    colorWarning: warningColor
  }
}

export type BadgeThemeVars = ReturnType<typeof self>

const badgeLight: Theme<'Badge', BadgeThemeVars> = {
  name: 'Badge',
  common: commonLight,
  self
}

export default badgeLight
export type BadgeTheme = typeof badgeLight
