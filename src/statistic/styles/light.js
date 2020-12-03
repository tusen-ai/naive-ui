import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'light',
  getLocalVars (vars) {
    const {
      textColor2,
      textColor1,
      fontWeightStrong
    } = vars
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
