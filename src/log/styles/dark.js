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
      textColorSecondaryOverlay,
      inputColorOverlay
    } = derived
    return {
      textColor: textColorSecondaryOverlay,
      loaderTextColor: textColorSecondaryOverlay,
      loaderColor: inputColorOverlay,
      loaderBorderColor: 'transparent'
    }
  }
})
