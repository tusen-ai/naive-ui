import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      modalBackgroundColor,
      secondaryTextOverlayColor
    } = derived
    return {
      color: modalBackgroundColor,
      textColor: secondaryTextOverlayColor
    }
  }
})
