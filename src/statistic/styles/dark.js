import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'dark',
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
