import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { textColor1, dividerColor, fontWeightStrong } = vars
  return {
    textColor: textColor1,
    color: dividerColor,
    fontWeight: fontWeightStrong
  }
}

export type DividerThemeVars = ReturnType<typeof self>

const dividerLight: Theme<'Divider', DividerThemeVars> = {
  name: 'Divider',
  common: commonLight,
  self
}

export default dividerLight
export type DividerTheme = typeof dividerLight
