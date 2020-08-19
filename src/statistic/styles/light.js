import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      primaryTextColor
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      labelFontWeight: strongFontWeight,
      valueFontWeight: strongFontWeight,
      labelTextColor: secondaryTextColor,
      valuePrefixTextColor: primaryTextColor,
      valueSuffixTextColor: primaryTextColor,
      valueTextColor: primaryTextColor
    }
  }
})
