import { baseLoadingLight } from '../../_base/loading/styles'
import { scrollbarLight } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/new-common'
import { codeLight } from '../../code/styles'

export default {
  name: 'Log',
  common: commonLight,
  peers: {
    BaseLoading: baseLoadingLight,
    Scrollbar: scrollbarLight,
    Code: codeLight
  },
  self (vars) {
    const { textColor2, modalColor, borderColor, fontSize, primaryColor } = vars
    return {
      loaderFontSize: fontSize,
      loaderTextColor: textColor2,
      loaderColor: modalColor,
      loaderBorder: `1px solid ${borderColor}`,
      loadingColor: primaryColor
    }
  }
}
