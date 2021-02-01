import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { textColor1, dividerColorOverlay, fontWeightStrong } = vars
  return {
    textColor: textColor1,
    color: dividerColorOverlay,
    fontWeight: fontWeightStrong
  }
}

export type DividerThemeVars = ReturnType<typeof self>

const dividerLight: Theme<DividerThemeVars> = {
  name: 'Divider',
  common: commonLight,
  self
}

export default dividerLight
export type DividerTheme = typeof dividerLight
