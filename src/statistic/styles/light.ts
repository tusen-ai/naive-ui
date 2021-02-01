import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { textColor2, textColor1, fontWeightStrong, fontSize } = vars
  return {
    labelFontSize: fontSize,
    labelFontWeight: fontWeightStrong,
    valueFontWeight: fontWeightStrong,
    labelTextColor: textColor2,
    valuePrefixTextColor: textColor1,
    valueSuffixTextColor: textColor1,
    valueTextColor: textColor1
  }
}

export type StatisticThemeVars = ReturnType<typeof self>

const statisticLight: Theme<StatisticThemeVars> = {
  name: 'Statistic',
  common: commonLight,
  self
}

export default statisticLight
export type StatisticTheme = typeof statisticLight
