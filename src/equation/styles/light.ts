import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export const self = () => ({})

export interface EquationThemeVars extends ReturnType<typeof self> {}

const equationLight: EquationTheme = {
  name: 'Equation',
  common: commonLight,
  self
}

export interface EquationTheme extends Theme<'Equation', EquationThemeVars> {}

export interface EquationThemeOverrides extends ExtractThemeOverrides<EquationTheme> {}

export default equationLight
