import { changeColor } from 'seemly'
import commonVars from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { primaryColor, opacityDisabled, borderRadius, textColor3 } = vars
  const railOverlayColor = 'rgba(0, 0, 0, .14)'
  return {
    ...commonVars,
    iconColor: textColor3,
    textColor: 'white',
    loadingColor: primaryColor,
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
    buttonBorderRadiusLarge: borderRadius,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`
  }
}

export type SwitchThemeVars = ReturnType<typeof self>

const switchLight: Theme<'Switch', SwitchThemeVars> = {
  name: 'Switch',
  common: commonLight,
  self
}

export default switchLight
export type SwitchTheme = typeof switchLight
