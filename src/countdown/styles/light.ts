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

export type CountdownThemeVars = ReturnType<typeof self>

const countdownLight: Theme<'Countdown', CountdownThemeVars> = {
  name: 'Countdown',
  common: commonLight,
  self
}

export default countdownLight
export type CountdownTheme = typeof countdownLight
