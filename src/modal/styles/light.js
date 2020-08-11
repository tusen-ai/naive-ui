import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      modalBackgroundColor,
      secondaryTextColor
    } = derived
    return {
      backgroundColor: modalBackgroundColor,
      textColor: secondaryTextColor
    }
  }
})
