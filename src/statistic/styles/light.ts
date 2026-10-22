import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
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

export interface StatisticThemeVars extends ReturnType<typeof self> {}

const statisticLight: StatisticTheme = {
  name: 'Statistic',
  common: commonLight,
  self
}

export interface StatisticTheme extends Theme<
  'Statistic',
  StatisticThemeVars
> {}

export interface StatisticThemeOverrides extends ExtractThemeOverrides<StatisticTheme> {}

export default statisticLight
