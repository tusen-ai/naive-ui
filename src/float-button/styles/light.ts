import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { primaryColorHover } = vars
  return {
    resizableTriggerColorHover: primaryColorHover
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
