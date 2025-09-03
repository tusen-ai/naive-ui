import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  // eslint-disable-next-line no-empty-pattern
  const {
    // next version maybe add more variables
  } = vars
  return {}
}

export type TypewriterThemeVars = ReturnType<typeof self>

const typewriterLight: Theme<'Typewriter', TypewriterThemeVars> = {
  name: 'Typewriter',
  common: commonLight,
  self
}

export default typewriterLight
export type TypewriterTheme = typeof typewriterLight
