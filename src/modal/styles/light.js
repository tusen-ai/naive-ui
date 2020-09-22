import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      modalColor,
      textColorSecondary
    } = derived
    return {
      color: modalColor,
      textColor: textColorSecondary
    }
  }
})
