import { commonDark } from '../../_styles/common'
import type { StatisticTheme } from './light'

const statisticDark: StatisticTheme = {
  name: 'Statistic',
  common: commonDark,
  self (vars) {
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
}

export default statisticDark
