import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Log',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      modalBackgroundColor,
      borderColor
    } = derived
    return {
      textColor: secondaryTextColor,
      loaderTextColor: secondaryTextColor,
      loaderBackgroundColor: modalBackgroundColor,
      loaderBorderColor: borderColor
    }
  }
})
