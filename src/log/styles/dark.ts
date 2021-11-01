import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { codeDark } from '../../code/styles'
import type { LogTheme } from './light'

const logDark: LogTheme = {
  name: 'Log',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Code: codeDark
  },
  self (vars) {
    const { textColor2, inputColor, fontSize, primaryColor } = vars
    return {
      loaderFontSize: fontSize,
      loaderTextColor: textColor2,
      loaderColor: inputColor,
      loaderBorder: '1px solid #0000',
      loadingColor: primaryColor
    }
  }
}

export default logDark
