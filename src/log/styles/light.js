import create from '../../styles/_utils/create-component-base'
import baseLoadingStyle from '../../_base/loading/styles/light'
import scrollbarStyle from '../../scrollbar/styles/light'

export default create({
  name: 'Log',
  theme: 'light',
  peer: [
    baseLoadingStyle,
    scrollbarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      modalBackgroundColor,
      borderColor
    } = derived
    return {
      textColor: secondaryTextColor,
      loaderTextColor: secondaryTextColor,
      loaderColor: modalBackgroundColor,
      loaderBorderColor: borderColor
    }
  }
})
