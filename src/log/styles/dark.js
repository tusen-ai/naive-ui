import create from '../../_styles/utils/create-component-base'
import {
  baseLoadingDark,
  scrollbarDark
} from '../../styles'

export default create({
  name: 'Log',
  theme: 'dark',
  peer: [
    baseLoadingDark,
    scrollbarDark
  ],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      inputColorOverlay
    } = vars
    return {
      textColor: textColor2Overlay,
      loaderTextColor: textColor2Overlay,
      loaderColor: inputColorOverlay,
      loaderBorderColor: 'transparent'
    }
  }
})
