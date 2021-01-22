import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/new-common'
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
    const {
      textColor2Overlay,
      inputColorOverlay,
      fontSize,
      primaryColor
    } = vars
    return {
      loaderFontSize: fontSize,
      loaderTextColor: textColor2Overlay,
      loaderColor: inputColorOverlay,
      loaderBorder: '1px solid transparent',
      loadingColor: primaryColor
    }
  }
}

export default logDark
