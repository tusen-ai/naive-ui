import create from '../../_styles/utils/create-component-base'
import {
  baseLoadingLight,
  scrollbarLight
} from '../../styles'

export default create({
  name: 'Log',
  theme: 'light',
  peer: [
    baseLoadingLight,
    scrollbarLight
  ],
  getDerivedVars (vars) {
    const {
      textColor2,
      modalColor,
      borderColor
    } = vars
    return {
      textColor: textColor2,
      loaderTextColor: textColor2,
      loaderColor: modalColor,
      loaderBorderColor: borderColor
    }
  }
})
