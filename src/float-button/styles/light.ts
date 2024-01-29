import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { popoverColor, textColor2 } = vars
  return {
    color: popoverColor,
    textColor: textColor2,
    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
    boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
    boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
  }
}

export type FloatButtonThemeVars = ReturnType<typeof self>

const themeLight: Theme<'FloatButton', FloatButtonThemeVars> = {
  name: 'FloatButton',
  common: commonLight,
  self
}

export default themeLight
export type FloatButtonTheme = typeof themeLight
