import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      textColorPrimaryOverlay
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      labelFontWeight: strongFontWeight,
      valueFontWeight: strongFontWeight,
      labelTextColor: textColorSecondaryOverlay,
      valuePrefixTextColor: textColorPrimaryOverlay,
      valueSuffixTextColor: textColorPrimaryOverlay,
      valueTextColor: textColorPrimaryOverlay
    }
  }
})
