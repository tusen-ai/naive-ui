import { type Theme } from '../../_mixins'
import { type ThemeCommonVars } from '../../config-provider'
import { commonLight } from '../../styles'

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

export type FloatButtonGroupThemeVars = ReturnType<typeof self>

const themeLight: Theme<'FloatButtonGroup', FloatButtonGroupThemeVars> = {
  name: 'FloatButtonGroup',
  common: commonLight,
  self
}

export default themeLight
export type FloatButtonGroupTheme = typeof themeLight
