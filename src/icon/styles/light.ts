import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { textColorBase, opacity1, opacity2, opacity3, opacity4, opacity5 }
    = vars
  return {
    color: textColorBase,
    opacity1Depth: opacity1,
    opacity2Depth: opacity2,
    opacity3Depth: opacity3,
    opacity4Depth: opacity4,
    opacity5Depth: opacity5
  }
}

export interface IconThemeVars extends ReturnType<typeof self> {}

const iconLight: IconTheme = {
  name: 'Icon',
  common: commonLight,
  self
}

export interface IconTheme extends Theme<'Icon', IconThemeVars> {}

export interface IconThemeOverrides extends ExtractThemeOverrides<IconTheme> {}

export default iconLight
