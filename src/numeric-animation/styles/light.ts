import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { textColor2, textColor3, fontSize, fontWeight } = vars
  return {
    labelFontSize: fontSize,
    labelFontWeight: fontWeight,
    valueFontWeight: fontWeight,
    labelTextColor: textColor3,
    valuePrefixTextColor: textColor2,
    valueSuffixTextColor: textColor2,
    valueTextColor: textColor2
  }
}

export type NumericAnimationThemeVars = ReturnType<typeof self>

const numericAnimationLight: Theme<
'NumericAnimation',
NumericAnimationThemeVars
> = {
  name: 'NumericAnimation',
  common: commonLight,
  self
}

export default numericAnimationLight
export type NumericAnimationTheme = typeof numericAnimationLight
