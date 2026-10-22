import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { primaryColorHover, borderColor } = vars
  return {
    resizableTriggerColorHover: primaryColorHover,
    resizableTriggerColor: borderColor
  }
}

export interface SplitThemeVars extends ReturnType<typeof self> {}

const themeLight: SplitTheme = {
  name: 'Split',
  common: commonLight,
  self
}

export interface SplitTheme extends Theme<'Split', SplitThemeVars> {}

export interface SplitThemeOverrides extends ExtractThemeOverrides<SplitTheme> {}

export default themeLight
