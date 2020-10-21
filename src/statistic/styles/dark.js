import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      textColor1Overlay
    } = derived
    const {
      fontWeightStrong
    } = base
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
