import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Log',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      inputBackgroundOverlayColor
    } = derived
    return {
      textColor: secondaryTextOverlayColor,
      loaderTextColor: secondaryTextOverlayColor,
      loaderColor: inputBackgroundOverlayColor,
      loaderBorderColor: 'transparent'
    }
  }
})
