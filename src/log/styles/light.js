import create from '../../_styles/utils/create-component-base'
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
      textColor2,
      modalColor,
      borderColor
    } = derived
    return {
      textColor: textColor2,
      loaderTextColor: textColor2,
      loaderColor: modalColor,
      loaderBorderColor: borderColor
    }
  }
})
