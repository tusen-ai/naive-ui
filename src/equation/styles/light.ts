import { commonLight } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = () => ({})

export type EquationThemeVars = ReturnType<typeof self>

const equationLight: Theme<'Equation', EquationThemeVars> = {
  name: 'Equation',
  common: commonLight,
  self
}

export default equationLight
export type EquationTheme = typeof equationLight
