import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Modal',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      modalColor,
      textColor2
    } = derived
    return {
      color: modalColor,
      textColor: textColor2
    }
  }
})
