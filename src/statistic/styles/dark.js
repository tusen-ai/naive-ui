import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Statistic',
  common: commonDark,
  self (vars) {
    const {
      textColor2Overlay,
      textColor1Overlay,
      fontWeightStrong,
      fontSize
    } = vars
    return {
      labelFontSize: fontSize,
      labelFontWeight: fontWeightStrong,
      valueFontWeight: fontWeightStrong,
      labelTextColor: textColor2Overlay,
      valuePrefixTextColor: textColor1Overlay,
      valueSuffixTextColor: textColor1Overlay,
      valueTextColor: textColor1Overlay
    }
  }
}
