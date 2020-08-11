import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'List',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      cardBackgroundColor,
      modalBackgroundColor,
      dividerOverlayColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      textColor: secondaryTextOverlayColor,
      backgroundColor: {
        default: cardBackgroundColor,
        modal: modalBackgroundColor
      },
      borderColor: dividerOverlayColor,
      borderRadius
    }
  }
})
