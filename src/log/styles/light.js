import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { baseLoadingLight } from '../../_base/loading/styles'
import { scrollbarLight } from '../../scrollbar/styles'

export default create({
  name: 'Log',
  theme: 'light',
  peer: [baseLight, baseLoadingLight, scrollbarLight],
  getLocalVars (vars) {
    const { textColor2, modalColor, borderColor } = vars
    return {
      textColor: textColor2,
      loaderTextColor: textColor2,
      loaderColor: modalColor,
      loaderBorderColor: borderColor
    }
  }
})
