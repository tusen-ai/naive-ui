import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      primaryTextOverlayColor
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      labelFontWeight: strongFontWeight,
      valueFontWeight: strongFontWeight,
      labelTextColor: secondaryTextOverlayColor,
      valuePrefixTextColor: primaryTextOverlayColor,
      valueSuffixTextColor: primaryTextOverlayColor,
      valueTextColor: primaryTextOverlayColor
    }
  }
})
