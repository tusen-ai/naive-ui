import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Collapse',
  getDerivedVariables ({ base, derived }) {
    const {
      primayTextColor,
      secondaryTextColor,
      dividerOverlayColor
    } = derived
    return {
      borderColor: dividerOverlayColor,
      headerTextColor: primayTextColor,
      contentTextColor: secondaryTextColor
    }
  }
})
