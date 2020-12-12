import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Statistic',
  theme: 'light',
  peer: [baseDark],
  getLocalVars (vars) {
    const { textColor2, textColor1, fontWeightStrong } = vars
    return {
      labelFontWeight: fontWeightStrong,
      valueFontWeight: fontWeightStrong,
      labelTextColor: textColor2,
      valuePrefixTextColor: textColor1,
      valueSuffixTextColor: textColor1,
      valueTextColor: textColor1
    }
  }
})
