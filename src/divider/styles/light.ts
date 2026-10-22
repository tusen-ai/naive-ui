import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { textColor1, dividerColor, fontWeightStrong } = vars
  return {
    textColor: textColor1,
    color: dividerColor,
    fontWeight: fontWeightStrong
  }
}

export interface DividerThemeVars extends ReturnType<typeof self> {}

const dividerLight: DividerTheme = {
  name: 'Divider',
  common: commonLight,
  self
}

export interface DividerTheme extends Theme<'Divider', DividerThemeVars> {}

export interface DividerThemeOverrides extends ExtractThemeOverrides<DividerTheme> {}

export default dividerLight
