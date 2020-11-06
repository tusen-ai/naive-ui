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
