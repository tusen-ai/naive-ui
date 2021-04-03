import { commonDark } from '../../_styles/common'
import type { StatisticTheme } from './light'

const statisticDark: StatisticTheme = {
  name: 'Statistic',
  common: commonDark,
  self (vars) {
    const { textColor2, textColor3, fontSize } = vars
    return {
      labelFontSize: fontSize,
      labelFontWeight: '400',
      valueFontWeight: '400',
      labelTextColor: textColor3,
      valuePrefixTextColor: textColor2,
      valueSuffixTextColor: textColor2,
      valueTextColor: textColor2
    }
  }
}

export default statisticDark
