import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'List',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      cardBackgroundColor,
      modalBackgroundColor,
      dividerOverlayColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: secondaryTextColor,
      backgroundColor: {
        default: cardBackgroundColor,
        modal: modalBackgroundColor
      },
      borderColor: dividerOverlayColor,
      borderRadius
    }
  }
})
