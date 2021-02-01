import commonVars from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { primaryColor, opacityDisabled, borderRadius } = vars
  const railOverlayColor = 'rgba(0, 0, 0, .14)'
  return {
    ...commonVars,
    opacityDisabled,
    railColor: railOverlayColor,
    railColorActive: primaryColor,
    buttonBoxShadow:
      '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    buttonColor: '#FFF',
    railBorderRadiusSmall: borderRadius,
    railBorderRadiusMedium: borderRadius,
    railBorderRadiusLarge: borderRadius,
    buttonBorderRadiusSmall: borderRadius,
    buttonBorderRadiusMedium: borderRadius,
    buttonBorderRadiusLarge: borderRadius
  }
}

export type SwitchThemeVars = ReturnType<typeof self>

const switchLight: Theme<SwitchThemeVars> = {
  name: 'Switch',
  common: commonLight,
  self
}

export default switchLight
export type SwitchTheme = typeof switchLight
