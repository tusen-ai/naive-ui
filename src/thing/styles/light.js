import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextColor,
      secondaryTextColor
    } = derived
    const {
      strongFontWeight
    } = base
    return {
      headerTextColor: primaryTextColor,
      textColor: secondaryTextColor,
      headerFontWeight: strongFontWeight
    }
  }
})
