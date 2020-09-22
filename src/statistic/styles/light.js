import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      textColorPrimary
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      labelFontWeight: fontWeightStrong,
      valueFontWeight: fontWeightStrong,
      labelTextColor: textColorSecondary,
      valuePrefixTextColor: textColorPrimary,
      valueSuffixTextColor: textColorPrimary,
      valueTextColor: textColorPrimary
    }
  }
})
