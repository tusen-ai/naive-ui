import type { Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { cubicBezierEaseInOut } = vars
  return {
    bezier: cubicBezierEaseInOut
  }
}

export type CollapseTransitionThemeVars = ReturnType<typeof self>

const collapseTransitionLight: Theme<
  'CollapseTransition',
  CollapseTransitionThemeVars
> = {
  name: 'CollapseTransition',
  common: commonLight,
  self
}

export default collapseTransitionLight
export type CollapseTransitionTheme = typeof collapseTransitionLight
