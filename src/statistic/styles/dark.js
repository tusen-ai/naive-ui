import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'Statistic',
  theme: 'dark',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      textColor1Overlay,
      fontWeightStrong
    } = vars
    return {
      labelFontWeight: fontWeightStrong,
      valueFontWeight: fontWeightStrong,
      labelTextColor: textColor2Overlay,
      valuePrefixTextColor: textColor1Overlay,
      valueSuffixTextColor: textColor1Overlay,
      valueTextColor: textColor1Overlay
    }
  }
})
