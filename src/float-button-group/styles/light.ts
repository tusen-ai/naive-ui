import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../config-provider'
import { commonLight } from '../../styles'

function self(vars: ThemeCommonVars) {
  const { popoverColor, dividerColor, borderRadius } = vars
  return {
    color: popoverColor,
    buttonBorderColor: dividerColor,
    borderRadiusSquare: borderRadius,
    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)'
  }
}

export interface FloatButtonGroupThemeVars extends ReturnType<typeof self> {}

const themeLight: FloatButtonGroupTheme = {
  name: 'FloatButtonGroup',
  common: commonLight,
  self
}

export interface FloatButtonGroupTheme extends Theme<
  'FloatButtonGroup',
  FloatButtonGroupThemeVars
> {}

export interface FloatButtonGroupThemeOverrides extends ExtractThemeOverrides<FloatButtonGroupTheme> {}

export default themeLight
