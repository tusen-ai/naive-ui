import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { textColor2, textColor3, fontSize, fontWeight } = vars
  return {
    labelFontSize: fontSize,
    labelFontWeight: fontWeight,
    valueFontWeight: fontWeight,
    valueFontSize: '24px',
    labelTextColor: textColor3,
    valuePrefixTextColor: textColor2,
    valueSuffixTextColor: textColor2,
    valueTextColor: textColor2
  }
}

export type StatisticThemeVars = ReturnType<typeof self>

const statisticLight: Theme<'Statistic', StatisticThemeVars> = {
  name: 'Statistic',
  common: commonLight,
  self
}

export default statisticLight
export type StatisticTheme = typeof statisticLight
