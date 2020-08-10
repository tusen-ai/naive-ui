import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Collapse',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextColor,
      secondaryTextColor,
      dividerOverlayColor
    } = derived
    return {
      dividerColor: dividerOverlayColor,
      titleTextColor: primaryTextColor,
      textColor: secondaryTextColor,
      arrowColor: secondaryTextColor
    }
  }
})
