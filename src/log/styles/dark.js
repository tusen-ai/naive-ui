import create from '../../styles/_utils/create-component-base'
import baseLoadingStyle from '../../_base/loading/styles/dark'
import scrollbarStyle from '../../scrollbar/styles/dark'

export default create({
  name: 'Log',
  theme: 'dark',
  peer: [
    baseLoadingStyle,
    scrollbarStyle
  ],
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
