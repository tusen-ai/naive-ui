import create from '../../_styles/utils/create-component-base'
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
      textColor2Overlay,
      inputColorOverlay
    } = derived
    return {
      textColor: textColor2Overlay,
      loaderTextColor: textColor2Overlay,
      loaderColor: inputColorOverlay,
      loaderBorderColor: 'transparent'
    }
  }
})
