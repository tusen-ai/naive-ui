import { commonDark } from '../../_styles/common'
import type { LoadingBarTheme } from './light'

const loadingBarDark: LoadingBarTheme = {
  name: 'LoadingBar',
  common: commonDark,
  self (vars) {
    const { primaryColor } = vars
    return {
      colorError: 'red',
      colorLoading: primaryColor,
      height: '2px'
    }
  }
}

export default loadingBarDark
