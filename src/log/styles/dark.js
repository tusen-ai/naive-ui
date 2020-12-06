import create from '../../_styles/utils/create-component-base'
import { baseLoadingDark } from '../../_base/loading/styles'
import { scrollbarDark } from '../../scrollbar/styles'

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
