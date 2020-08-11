import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Log',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      inputOverlayBackgroundColor
    } = derived
    return {
      textColor: secondaryTextOverlayColor,
      loaderTextColor: secondaryTextOverlayColor,
      loaderBackgroundColor: inputOverlayBackgroundColor,
      loaderBorderColor: 'transparent'
    }
  }
})
