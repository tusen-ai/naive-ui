import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Statistic',
  common: commonLight,
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
