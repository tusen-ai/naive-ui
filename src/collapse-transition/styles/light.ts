import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { cubicBezierEaseInOut } = vars
  return {
    bezier: cubicBezierEaseInOut
  }
}

export interface CollapseTransitionThemeVars extends ReturnType<typeof self> {}

const collapseTransitionLight: CollapseTransitionTheme = {
  name: 'CollapseTransition',
  common: commonLight,
  self
}

export interface CollapseTransitionTheme extends Theme<
  'CollapseTransition',
  CollapseTransitionThemeVars
> {}

export interface CollapseTransitionThemeOverrides extends ExtractThemeOverrides<CollapseTransitionTheme> {}

export default collapseTransitionLight
